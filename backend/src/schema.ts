// backend/src/schema.ts
import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { fields } from './schema'; // Asumiendo que fields está en este archivo

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  subdomain: varchar('subdomain', { length: 50 }).notNull().unique(),
});

export const fields = pgTable('fields', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenants.id),
  name: varchar('name', { length: 50 }).notNull(),
  type: varchar('type', { length: 50 }).default('Futbolito'),
  price: integer('price').notNull().default(25000), // <-- NUEVO CAMPO
});

export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  fieldId: uuid('field_id').references(() => fields.id),
  clientName: varchar('client_name', { length: 100 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }),
  date: varchar('date', { length: 10 }).notNull(),
  timeSlot: varchar('time_slot', { length: 20 }).notNull(),
  totalPrice: integer('total_price').notNull(),
  paidAmount: integer('paid_amount').default(0),
  paymentMethod: varchar('payment_method', { length: 50 }),
  status: varchar('status', { length: 20 }).default('Pendiente'), // 'Pendiente', 'Pagado', 'Anulado'
  
  // CAMPOS DE AUDITORÍA
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});