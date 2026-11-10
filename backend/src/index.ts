// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import { eq, and, ne, lt } from 'drizzle-orm';
import { tenants, fields, bookings } from './schema';
import cron from 'node-cron';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// --- CRONJOB: AUDITORÍA Y LIBERACIÓN (CADA 1 MINUTO) ---
cron.schedule('* * * * *', async () => {
  console.log('🔄 Verificando reservas pendientes vencidas...');
  try {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 15);

    const result = await db.update(bookings)
      .set({ 
        status: 'Anulado',
        updatedAt: new Date() // Registra el momento exacto en que el sistema le quitó la cancha
      })
      .where(
        and(
          eq(bookings.status, 'Pendiente'),
          lt(bookings.createdAt, thirtyMinutesAgo)
        )
      )
      .returning({ id: bookings.id, clientName: bookings.clientName });

    if (result.length > 0) {
      console.log(`⚠️ Auditoría: Se anularon ${result.length} reservas por falta de pago.`);
    }
  } catch (error) {
    console.error('❌ Error en el cronjob:', error);
  }
});

// Obtener canchas dinámicas
app.get('/api/fields', async (req, res) => {
  try {
    let result = await db.select().from(fields);
    
    // Auto-crear canchas de prueba si la tabla está vacía (Solo para el MVP)
    if (result.length === 0) {
      result = await db.insert(fields).values([
        { name: 'Cancha 1 (Techada)', type: 'Futbolito 7', price: 25000 },
        { name: 'Cancha 2 (Sintético)', type: 'Futbolito 5', price: 22000 }
      ]).returning();
    }
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar las canchas' });
  }
});

// Obtener reservas filtradas por fecha
app.get('/api/bookings', async (req, res) => {
  const { date } = req.query;
  try {
    const result = await db.select().from(bookings)
      .where(
        and(
          eq(bookings.date, String(date)),
          ne(bookings.status, 'Anulado') // Ignoramos las anuladas para liberar la grilla
        )
      );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar reservas' });
  }
});

// NUEVO ENDPOINT: Historial completo de Auditoría
app.get('/api/history', async (req, res) => {
  try {
    // Aquí NO filtramos por estado, queremos ver TODO (Pagado, Pendiente y Anulado)
    const result = await db.select().from(bookings);
    
    // Ordenamos las más recientes primero usando JavaScript básico para el MVP
    result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar el historial' });
  }
});

// Crear reserva inicial con desglose de pago
app.post('/api/bookings', async (req, res) => {
  try {
    const { fieldId, clientName, clientPhone, date, timeSlot, paymentMethod, totalPrice, paidAmount } = req.body;
    
    const total = Number(totalPrice) || 25000;
    const paid = Number(paidAmount) || 0;
    
    let status = 'Pendiente';
    if (paid >= total) status = 'Pagado';
    else if (paid > 0) status = 'Abono';

    const inserted = await db.insert(bookings).values({
      fieldId,
      clientName,
      clientPhone,
      date,
      timeSlot,
      status,
      paymentMethod: paymentMethod || 'Efectivo',
      totalPrice: total,
      paidAmount: paid,
    }).returning();

    res.json(inserted[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar reserva' });
  }
});

// Liquidar o registrar un abono adicional
app.patch('/api/bookings/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;
    const { additionalPayment, paymentMethod } = req.body;

    const existing = await db.select().from(bookings).where(eq(bookings.id, id));
    if (!existing.length) return res.status(404).json({ error: 'Reserva no encontrada' });

    const booking = existing[0];
    const newPaidAmount = booking.paidAmount + Number(additionalPayment);
    const newStatus = newPaidAmount >= booking.totalPrice ? 'Pagado' : 'Abono';

    const updated = await db.update(bookings)
      .set({
        paidAmount: newPaidAmount,
        status: newStatus,
        paymentMethod: paymentMethod || booking.paymentMethod,
      })
      .where(eq(bookings.id, id))
      .returning();

    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pago' });
  }
});

// Anular reserva
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(bookings).where(eq(bookings.id, id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar reserva' });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT} 🚀`));