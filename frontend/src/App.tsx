import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarDays, Users, LogOut, 
  Search, TrendingUp, Clock, Wallet, MapPin, Plus, AlertCircle, Send, CheckCircle2, 
  Paperclip, Loader2, History, ChevronLeft, ChevronRight, Calendar as CalendarIcon
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// --- 1. VISTA: LOGIN ---
function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-emerald-500/20" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center"><MapPin className="text-white w-5 h-5" /></div>
            <span className="text-xl font-bold tracking-tight">CanchaSync SaaS</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mt-24">Gestiona tus canchas <br />sin topes de horario.</h1>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left"><h2 className="text-3xl font-bold text-slate-900">Iniciar Sesión</h2></div>
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label><input type="email" className="w-full rounded-lg border-slate-200 border p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="admin@losrobles.cl" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label><input type="password" className="w-full rounded-lg border-slate-200 border p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="123456" /></div>
            <button type="submit" className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Ingresar al Panel</button>
          </form>
          <div className="text-center mt-4"><Link to="/reservar" className="text-sm font-medium text-indigo-600 hover:underline">Ver portal público para jugadores</Link></div>
        </div>
      </div>
    </div>
  );
}

// --- 2. LAYOUT PRINCIPAL (DASHBOARD ADMIN) ---
function DashboardLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center"><MapPin className="text-white w-4 h-4" /></div>
            <span className="font-bold text-slate-800 tracking-tight">Los Robles</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <LayoutDashboard className="w-5 h-5" /> Resumen Analítico
          </Link>
          <Link to="/dashboard/calendario" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard/calendario') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <CalendarDays className="w-5 h-5" /> Grilla & Calendario
          </Link>
          <Link to="/dashboard/auditoria" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard/auditoria') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <History className="w-5 h-5" /> Auditoría & Historial
          </Link>
          <Link to="/dashboard/clientes" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard/clientes') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Users className="w-5 h-5" /> Clientes
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </Link>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg w-96">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input type="text" placeholder="Buscar reservas o clientes..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// --- 3. VISTA: INICIO / RESUMEN ANALÍTICO Y DEPORTIVO ---
function DashboardHome() {
  const stats = [
    { title: "Ingresos del Día", value: "$145.000", change: "+14% vs ayer", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Reservas Hoy", value: "12", change: "3 pendientes", icon: CalendarDays, color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Ocupación Recinto", value: "78%", change: "+5% vs sem. pasada", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" }
  ];

  const weeklyEarnings = [
    { day: "Lun", amount: 120000, label: "$120k", height: "45%" },
    { day: "Mar", amount: 145000, label: "$145k", height: "55%" },
    { day: "Mié", amount: 180000, label: "$180k", height: "68%" },
    { day: "Jue", amount: 210000, label: "$210k", height: "80%" },
    { day: "Vie", amount: 260000, label: "$260k", height: "98%" },
    { day: "Sáb", amount: 240000, label: "$240k", height: "90%" },
    { day: "Dom", amount: 160000, label: "$160k", height: "60%" },
  ];

  const topScorers = [
    { rank: 1, name: "Matías Fernández", team: "Los Galácticos FC", goals: 18, matches: 8, badgeColor: "bg-amber-100 text-amber-800" },
    { rank: 2, name: "Cristóbal Silva", team: "Deportivo Rayo", goals: 14, matches: 7, badgeColor: "bg-slate-200 text-slate-800" },
    { rank: 3, name: "Ignacio Tapia", team: "Aston Birra", goals: 12, matches: 8, badgeColor: "bg-orange-100 text-orange-800" },
    { rank: 4, name: "Lucas Contreras", team: "Pichanga Buena", goals: 10, matches: 6, badgeColor: "bg-slate-100 text-slate-600" },
  ];

  const standings = [
    { rank: 1, team: "Los Galácticos FC", pj: 8, pg: 7, pe: 1, pp: 0, pts: 22 },
    { rank: 2, team: "Deportivo Rayo", pj: 8, pg: 6, pe: 0, pp: 2, pts: 18 },
    { rank: 3, team: "Aston Birra", pj: 8, pg: 5, pe: 1, pp: 2, pts: 16 },
    { rank: 4, team: "Pichanga Buena", pj: 8, pg: 3, pe: 2, pp: 3, pts: 11 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resumen General</h1>
          <p className="text-slate-500 text-sm mt-0.5">Métricas financieras y estado de torneos activos del recinto.</p>
        </div>
        <Link to="/dashboard/calendario" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Nueva Reserva
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stat.value}</h3>
              <p className="text-xs font-medium text-emerald-600">{stat.change}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Ingresos Semanales</h2>
              <p className="text-xs text-slate-400">Total acumulado esta semana: <strong className="text-slate-800">$1.315.000</strong></p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              +18.4% vs anterior
            </span>
          </div>
          <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 px-4">
            {weeklyEarnings.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{item.label}</span>
                <div style={{ height: item.height }} className={`w-full rounded-t-xl transition-all ${item.day === 'Vie' ? 'bg-indigo-600' : 'bg-indigo-200'}`} />
                <span className="text-xs font-semibold text-slate-600 mt-1">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Caja & Cobros</h2>
            <p className="text-xs text-slate-400">Distribución de pagos recibidos</p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5"><span>Transferencia</span><span>58%</span></div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="bg-indigo-600 h-full rounded-full" style={{ width: '58%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5"><span>Tarjeta (POS)</span><span>30%</span></div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5"><span>Efectivo</span><span>12%</span></div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="bg-amber-400 h-full rounded-full" style={{ width: '12%' }} /></div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mt-4 flex items-center justify-between text-xs text-slate-600">
            <span>Saldos por cobrar (Abonos):</span>
            <span className="font-bold text-red-600">$84.000</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div><h2 className="text-base font-bold text-slate-900">Máximos Goleadores</h2><p className="text-xs text-slate-400">Torneo Apertura 2026</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <tr><th className="py-3 px-4 w-12 text-center">#</th><th className="py-3 px-4">Jugador</th><th className="py-3 px-4 text-center">PJ</th><th className="py-3 px-4 text-right">Goles</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {topScorers.map(p => (
                  <tr key={p.rank} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-center"><span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${p.badgeColor}`}>{p.rank}</span></td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{p.name} <span className="text-xs font-normal text-slate-500 block">{p.team}</span></td>
                    <td className="py-3 px-4 text-center text-xs font-medium text-slate-500">{p.matches}</td>
                    <td className="py-3 px-4 text-right font-black text-indigo-600">{p.goals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div><h2 className="text-base font-bold text-slate-900">Tabla de Equipos</h2><p className="text-xs text-slate-400">Grupo A • Fecha 8</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <tr><th className="py-3 px-4 w-10 text-center">Pos</th><th className="py-3 px-4">Club</th><th className="py-3 px-2 text-center">PJ</th><th className="py-3 px-4 text-right">Pts</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {standings.map(t => (
                  <tr key={t.rank} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-center font-bold text-slate-400">{t.rank}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{t.team}</td>
                    <td className="py-3 px-2 text-center text-slate-500">{t.pj}</td>
                    <td className="py-3 px-4 text-right font-black text-sm text-slate-900">{t.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. VISTA: AUDITORÍA & HISTORIAL ---
function AuditView() {
  const { data: dbFields = [] } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/fields');
      return res.json();
    },
  });
  const fieldsMap = dbFields.reduce((acc: any, f: any) => { acc[f.id] = f.name; return acc; }, {});

  const { data: historyData = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/history');
      if (!res.ok) throw new Error('Error al cargar historial');
      return res.json();
    },
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pagado': return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/> Confirmado</span>;
      case 'Pendiente': return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/> Esperando Pago</span>;
      case 'Anulado': return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold w-fit">Anulado (Libre)</span>;
      default: return <span>{status}</span>;
    }
  };

  if (isLoading) return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Auditoría de Reservas</h1>
        <p className="text-slate-500 text-sm mt-1">Registro inmutable de todas las transacciones y acciones automáticas del sistema.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
            <tr>
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Cancha y Horario</th>
              <th className="p-4 font-semibold">Estado</th>
              <th className="p-4 font-semibold">Hora de Creación</th>
              <th className="p-4 font-semibold">Última Modificación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historyData.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No hay registros en el historial.</td></tr>
            ) : (
              historyData.map((record: any) => (
                <tr key={record.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{record.clientName}</p>
                    <p className="text-xs text-slate-500">{record.clientPhone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{fieldsMap[record.fieldId] || 'Cancha Eliminada'}</p>
                    <p className="text-xs text-slate-500">{record.date} • {record.timeSlot}</p>
                  </td>
                  <td className="p-4">{getStatusBadge(record.status)}</td>
                  <td className="p-4 text-slate-600 text-xs">{new Date(record.createdAt).toLocaleString('es-CL')}</td>
                  <td className="p-4 text-slate-600 text-xs font-medium">
                    {new Date(record.updatedAt).toLocaleString('es-CL')}
                    {record.status === 'Anulado' && <span className="block text-red-500 text-[10px] mt-0.5">Por Admin / Cronjob</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- 5. VISTA: CALENDARIO SEMANAL ESTILO GOOGLE CALENDAR (GRILLA DEL ADMIN) ---
function CalendarView() {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedCourt, setSelectedCourt] = useState<string>('all');
  const [detailModal, setDetailModal] = useState<any | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const timeSlots = ['19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'];

  // 1. Canchas desde la BD
  const { data: dbFields = [], isLoading: loadingFields } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/fields');
      return res.json();
    },
  });
  const fieldsMap = dbFields.reduce((acc: any, f: any) => { acc[f.id] = f.name; return acc; }, {});

  // 2. Cálculo dinámico de la semana (Lunes a Domingo)
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const diffToMonday = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today);
    monday.setDate(diffToMonday + (currentWeekOffset * 7));

    const todayStr = new Date().toISOString().split('T')[0];

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      return {
        dateStr,
        dayName: d.toLocaleDateString('es-CL', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString('es-CL', { month: 'short' }),
        isToday: dateStr === todayStr,
      };
    });
  }, [currentWeekOffset]);

  // Rango de fechas visible para el encabezado
  const weekRangeLabel = useMemo(() => {
    if (weekDays.length === 0) return '';
    const first = weekDays[0];
    const last = weekDays[6];
    return `${first.dayNum} de ${first.monthName} – ${last.dayNum} de ${last.monthName}, 2026`;
  }, [weekDays]);

  // 3. Consultamos todas las reservas activas (usando el endpoint /api/history que trae todo)
  const { data: allBookings = [], refetch } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/history');
      if (!res.ok) throw new Error('Error al cargar');
      return res.json();
    },
  });

  // Filtrar reservas que caigan dentro de la semana y que no estén anuladas
  const activeBookings = useMemo(() => {
    return allBookings.filter((b: any) => b.status !== 'Anulado');
  }, [allBookings]);

  const handleConfirmPayment = async () => {
    if (!detailModal) return;
    const pendingAmount = detailModal.totalPrice - detailModal.paidAmount;
    try {
      await fetch(`http://localhost:3001/api/bookings/${detailModal.id}/pay`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ additionalPayment: pendingAmount, paymentMethod: 'Transferencia' }),
      });
      const phoneClean = detailModal.clientPhone?.replace(/\D/g, '') || '';
      const confirmMessage = encodeURIComponent(`✅ ¡Hola ${detailModal.clientName}!\n\nTu reserva ha sido CONFIRMADA.\n\n⚽ *Fecha:* ${detailModal.date}\n⏰ *Horario:* ${detailModal.timeSlot}\n\n¡Te esperamos en Canchas Los Robles!`);
      window.open(`https://wa.me/${phoneClean}?text=${confirmMessage}`, '_blank');
      setDetailModal(null); setReceiptFile(null); refetch();
    } catch { alert('Error al procesar el cobro'); }
  };

  const handleDeleteBooking = async () => {
    if (!detailModal || !confirm('¿Liberar esta cancha?')) return;
    try {
      await fetch(`http://localhost:3001/api/bookings/${detailModal.id}`, { method: 'DELETE' });
      setDetailModal(null); refetch();
    } catch { alert('Error al anular'); }
  };

  if (loadingFields) return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      {/* 1. BARRA SUPERIOR ESTILO GOOGLE CALENDAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight capitalize">{weekRangeLabel}</h1>
              {currentWeekOffset === 0 && (
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md text-[11px] font-bold">Semana Actual</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Vista semanal interactiva de ocupación y caja.</p>
          </div>
        </div>

        {/* Botones de navegación de semana */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setCurrentWeekOffset(prev => prev - 1)} 
              className="p-2 hover:bg-white text-slate-700 hover:text-slate-900 rounded-lg transition"
              title="Semana anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentWeekOffset(0)} 
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition"
            >
              Hoy
            </button>
            <button 
              onClick={() => setCurrentWeekOffset(prev => prev + 1)} 
              className="p-2 hover:bg-white text-slate-700 hover:text-slate-900 rounded-lg transition"
              title="Semana siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filtro de Cancha */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedCourt('all')}
              className={`px-3 py-1.5 rounded-lg transition ${selectedCourt === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Todas
            </button>
            {dbFields.map((f: any) => (
              <button
                key={f.id}
                onClick={() => setSelectedCourt(f.id)}
                className={`px-3 py-1.5 rounded-lg transition ${selectedCourt === f.id ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. GRILLA SEMANAL (GOOGLE CALENDAR LAYOUT) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs overflow-x-auto">
        <div className="min-w-[950px]">
          {/* Fila de Encabezado de Días */}
          <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/70">
            {/* Columna Horario */}
            <div className="p-4 border-r border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              Horario
            </div>
            {/* 7 Días de la semana */}
            {weekDays.map(day => (
              <div 
                key={day.dateStr} 
                className={`p-3 text-center border-r border-slate-200 last:border-r-0 transition ${
                  day.isToday ? 'bg-indigo-50/50' : ''
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {day.dayName}
                </span>
                <div className="flex items-center justify-center">
                  <span className={`inline-flex items-center justify-center text-sm font-extrabold w-8 h-8 rounded-full ${
                    day.isToday ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-800'
                  }`}>
                    {day.dayNum}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cuerpo: Franjas Horarias x 7 Días */}
          <div className="divide-y divide-slate-100">
            {timeSlots.map(slot => (
              <div key={slot} className="grid grid-cols-8 min-h-[110px]">
                {/* Columna lateral de Horas */}
                <div className="p-3 border-r border-slate-200 bg-slate-50/30 text-xs font-semibold text-slate-500 flex flex-col justify-start">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.split(' - ')[0]}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 pl-4">{slot.split(' - ')[1]}</span>
                </div>

                {/* Celdas para cada uno de los 7 días */}
                {weekDays.map(day => {
                  // Buscar todas las reservas que caen en este día y franja horaria
                  const bookingsInCell = activeBookings.filter((b: any) => {
                    const matchesDate = b.date === day.dateStr;
                    const matchesSlot = b.timeSlot === slot;
                    const matchesCourt = selectedCourt === 'all' || b.fieldId === selectedCourt;
                    return matchesDate && matchesSlot && matchesCourt;
                  });

                  return (
                    <div 
                      key={`${day.dateStr}-${slot}`} 
                      className={`p-1.5 border-r border-slate-200 last:border-r-0 flex flex-col gap-1.5 relative group hover:bg-slate-50/60 transition ${
                        day.isToday ? 'bg-indigo-50/15' : ''
                      }`}
                    >
                      {bookingsInCell.length > 0 ? (
                        bookingsInCell.map((booking: any) => {
                          const isPaid = booking.status === 'Pagado';
                          return (
                            <div
                              key={booking.id}
                              onClick={() => setDetailModal(booking)}
                              className={`p-2.5 rounded-xl border cursor-pointer transition transform hover:scale-[1.02] shadow-xs text-left ${
                                isPaid
                                  ? 'bg-emerald-50/90 border-l-4 border-l-emerald-500 border-emerald-200 text-emerald-950 hover:bg-emerald-100/70'
                                  : 'bg-amber-50/90 border-l-4 border-l-amber-500 border-amber-200 text-amber-950 hover:bg-amber-100/70'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-extrabold text-xs truncate max-w-[85px]">{booking.clientName}</span>
                                {isPaid ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                ) : (
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                )}
                              </div>
                              <span className="text-[10px] font-medium text-slate-500 block truncate">
                                {fieldsMap[booking.fieldId] || 'Cancha'}
                              </span>
                              <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-200/50">
                                <span className="text-[10px] font-bold text-slate-700">${booking.totalPrice?.toLocaleString('es-CL')}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isPaid ? 'bg-emerald-200/70 text-emerald-800' : 'bg-amber-200/70 text-amber-800'}`}>
                                  {isPaid ? 'Pagado' : 'Validar'}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="h-full w-full rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition border border-dashed border-slate-200 bg-white/60">
                          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                            <Plus className="w-3 h-3 text-indigo-500" /> Libre
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MODAL DE GESTIÓN Y COBRO */}
      {detailModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{detailModal.clientName}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{fieldsMap[detailModal.fieldId] || 'Cancha'} • {detailModal.timeSlot}</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Fecha: {detailModal.date} | WhatsApp: {detailModal.clientPhone}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${detailModal.status === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {detailModal.status === 'Pagado' ? 'Confirmado' : 'Pendiente Transf.'}
              </span>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl text-sm space-y-2 mb-4 border border-slate-100">
              <div className="flex justify-between text-slate-600"><span>Monto Total:</span> <strong className="text-slate-900">${detailModal.totalPrice.toLocaleString('es-CL')}</strong></div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-base mt-2">
                <span className="text-slate-800">Por cobrar:</span> 
                <span className={detailModal.status === 'Pagado' ? 'text-emerald-600' : 'text-red-600'}>${(detailModal.totalPrice - detailModal.paidAmount).toLocaleString('es-CL')}</span>
              </div>
            </div>

            {detailModal.status === 'Pendiente' && (
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2">Comprobante de Transferencia</label>
                <label className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-600 cursor-pointer transition w-full justify-center">
                  <Paperclip className="w-4 h-4 text-slate-400" /> 
                  {receiptFile ? <span className="text-indigo-600 font-bold">{receiptFile.name}</span> : 'Adjuntar comprobante de WhatsApp'}
                  <input type="file" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} accept="image/*,.pdf" />
                </label>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {detailModal.status === 'Pendiente' && (
                <button onClick={handleConfirmPayment} className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition flex justify-center items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Aprobar & Notificar Cliente
                </button>
              )}
              
              <div className="flex justify-between mt-3 pt-4 border-t border-slate-100">
                <button onClick={handleDeleteBooking} className="text-xs font-semibold text-red-500 hover:text-red-700 transition">Liberar Cancha</button>
                <button onClick={() => { setDetailModal(null); setReceiptFile(null); }} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 6. VISTA: CLIENTES ---
function ClientsView() { 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Directorio de Clientes</h1>
        <p className="text-slate-500 text-sm mt-1">Gestión de deportistas frecuentes y estados de fidelización.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
        Próximo módulo CRM: métricas por jugador, historial acumulado de pagos y promociones por WhatsApp.
      </div>
    </div>
  ); 
}

// --- 7. VISTA B2C: PORTAL PÚBLICO (SEMANAL DINÁMICO) ---
function PublicPortal() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i);
      return { dateStr: d.toISOString().split('T')[0], dayName: d.toLocaleDateString('es-CL', { weekday: 'short' }), dayNum: d.getDate() };
    });
  }, []);

  const { data: dbFields = [], isLoading: loadingFields } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/fields');
      if (!res.ok) throw new Error('Error al cargar canchas');
      return res.json();
    },
  });

  const timeSlotsConfig = ['19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'];

  const allAvailableSlots = useMemo(() => {
    let slots: any[] = [];
    dbFields.forEach((field: any) => {
      timeSlotsConfig.forEach(time => {
        slots.push({
          id: `${field.id}-${time}`,
          fieldId: field.id,
          time: time,
          field: field.name,
          price: field.price
        });
      });
    });
    return slots;
  }, [dbFields]);

  const { data: dbBookings = [], refetch } = useQuery({
    queryKey: ['public-bookings', selectedDate],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/bookings?date=${selectedDate}`);
      if (!res.ok) throw new Error('Error al cargar');
      return res.json();
    },
  });

  const visibleSlots = allAvailableSlots.filter(slot => !dbBookings.some((b: any) => b.fieldId === slot.fieldId && b.timeSlot === slot.time));

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setIsSubmitting(true);
    try {
      await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldId: selectedSlot.fieldId,
          clientName: formData.name,
          clientPhone: formData.phone,
          date: selectedDate,
          timeSlot: selectedSlot.time,
          totalPrice: selectedSlot.price,
          paidAmount: 0,
          paymentMethod: 'Transferencia',
          status: 'Pendiente'
        }),
      });
      refetch(); setStep(3);
    } catch { alert('Error al agendar.'); } 
    finally { setIsSubmitting(false); }
  };

  if (loadingFields) {
    return <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center"><Loader2 className="w-10 h-10 text-indigo-600 animate-spin" /><p className="mt-4 text-slate-500 font-medium">Cargando canchas...</p></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full text-center mb-8">
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4"><MapPin className="text-white w-6 h-6" /></div>
        <h1 className="text-2xl font-black text-slate-900">Canchas Los Robles</h1>
        <p className="text-slate-500 text-sm mt-1">Reserva tu cancha en línea</p>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 lg:p-8">
        {step === 1 && (
          <>
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">Selecciona un día</h2>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
              {weekDays.map((day) => {
                const isSelected = selectedDate === day.dateStr;
                return (
                  <button key={day.dateStr} onClick={() => { setSelectedDate(day.dateStr); setSelectedSlot(null); }} className={`min-w-[64px] flex flex-col items-center p-3 rounded-xl border transition ${isSelected ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'}`}>
                    <span className="text-xs capitalize font-medium">{day.dayName}</span><span className="text-lg font-bold">{day.dayNum}</span>
                  </button>
                );
              })}
            </div>

            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-600" /> Horarios Disponibles</h3>
            
            {visibleSlots.length === 0 ? (
               <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">No hay canchas disponibles para esta fecha.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dbFields.map((field: any) => {
                  const slotsForThisField = visibleSlots.filter(s => s.fieldId === field.id);
                  return (
                    <div key={field.id} className="bg-slate-50/50 border border-slate-100 rounded-xl p-4">
                      <h4 className="font-bold text-slate-800 text-sm mb-4 text-center pb-3 border-b border-slate-200">{field.name}</h4>
                      {slotsForThisField.length === 0 ? (
                        <p className="text-xs text-center text-slate-400 py-4">Sin horarios</p>
                      ) : (
                        <div className="space-y-3">
                          {slotsForThisField.map(slot => (
                            <button key={slot.id} onClick={() => { setSelectedSlot(slot); setStep(2); }} className="w-full flex justify-between items-center p-3.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-600 hover:shadow-sm transition">
                              <span className="font-bold text-slate-900">{slot.time}</span><span className="font-bold text-indigo-600 text-sm">${slot.price.toLocaleString('es-CL')}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        
        {step === 2 && (
          <div className="max-w-md mx-auto">
            <button onClick={() => setStep(1)} className="text-xs text-indigo-600 font-semibold mb-6">← Volver a horarios</button>
            <div className="p-5 bg-slate-50 rounded-xl mb-6 border border-slate-100">
              <p className="font-bold text-slate-900">{selectedSlot.field}</p>
              <p className="text-sm text-slate-700 mt-1">{selectedDate} • {selectedSlot.time}</p>
              <p className="font-bold text-indigo-600 mt-3">${selectedSlot.price.toLocaleString('es-CL')}</p>
            </div>
            <form onSubmit={handleBook} className="space-y-5">
              <div><label className="block text-xs font-bold text-slate-700 mb-2">Nombre Completo</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ej: Marcelo Díaz" className="w-full p-3.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-600" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-2">WhatsApp de contacto</label><input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+56 9 1234 5678" className="w-full p-3.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-600" /></div>
              <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-2 bg-indigo-600 text-white text-sm font-bold rounded-xl disabled:opacity-50 transition">{isSubmitting ? 'Procesando...' : 'Bloquear Cancha e ir a Pagar'}</button>
            </form>
          </div>
        )}
        
        {step === 3 && (
          <div className="text-center py-4 max-w-md mx-auto">
            <AlertCircle className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900">¡Cancha bloqueada!</h2>
            <p className="text-sm text-slate-500 mt-2 mb-8">Tienes <strong>30 minutos</strong> para transferir a la Cuenta RUT 12.345.678-9.</p>
            <a href={`https://wa.me/56973764805?text=${encodeURIComponent(`⚽ Hola! Acabo de reservar en el portal.\n\n*Cancha:* ${selectedSlot.field}\n*Fecha:* ${selectedDate}\n*Horario:* ${selectedSlot.time}\n*A nombre de:* ${formData.name}\n\nAdjunto el comprobante.`)}`} target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 py-3.5 bg-emerald-500 text-white font-bold rounded-xl shadow-md transition hover:bg-emerald-600">
              <Send className="w-5 h-5"/> Enviar Comprobante
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 8. ENRUTADOR PRINCIPAL ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reservar" element={<PublicPortal />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="calendario" element={<CalendarView />} />
          <Route path="auditoria" element={<AuditView />} />
          <Route path="clientes" element={<ClientsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}