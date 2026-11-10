import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarDays, Users, LogOut, 
  Search, TrendingUp, Clock, Wallet, MapPin, Plus, AlertCircle, Send, CheckCircle2, 
  Paperclip, Loader2, History, ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  ArrowRight, ShieldCheck, MessageCircle, Sparkles, Star, Tag
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Centralización de la API para local y Vercel
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// --- 1. VISTA: LOGIN (AMBIENTACIÓN DEPORTIVA & GLASSMORPHISM) ---
function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* 1. Fondo fotográfico de cancha nocturna con degradado oscuro */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=2000')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/85 to-indigo-950/80 backdrop-blur-[2px]" />
      </div>

      {/* 2. Tarjeta Glassmorphic Centrada */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-7 sm:p-9 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Cabecera / Identidad */}
        <div className="text-center mb-7">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50">
            <MapPin className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">CanchaSync SaaS</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Panel de Control para Recintos Deportivos</p>
          
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/70 rounded-full text-[11px] font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Recinto: Canchas Los Robles
          </div>
        </div>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              required
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition shadow-xs" 
              defaultValue="admin@losrobles.cl" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contraseña
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Demo: 123456</span>
            </div>
            <input 
              type="password" 
              required
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition shadow-xs" 
              defaultValue="123456" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Entrar al Administrador
          </button>
        </form>

        {/* Enlace al Portal Público */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <Link 
            to="/reservar" 
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition inline-flex items-center gap-1.5 group"
          >
            <span>Ver portal público de reservas</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- 2. LAYOUT PRINCIPAL (CON BOTTOM BAR MÓVIL) ---
function DashboardLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar de Escritorio */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center"><MapPin className="text-white w-4 h-4" /></div>
            <span className="font-bold text-slate-800 tracking-tight">Los Robles</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard') ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <LayoutDashboard className="w-5 h-5" /> Resumen Analítico
          </Link>
          <Link to="/dashboard/calendario" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard/calendario') ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <CalendarDays className="w-5 h-5" /> Grilla & Calendario
          </Link>
          <Link to="/dashboard/auditoria" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard/auditoria') ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <History className="w-5 h-5" /> Auditoría & Historial
          </Link>
          <Link to="/dashboard/clientes" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive('/dashboard/clientes') ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Users className="w-5 h-5" /> Clientes
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Superior Adaptado */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center"><MapPin className="text-white w-4 h-4" /></div>
            <span className="font-bold text-slate-800 tracking-tight text-sm">Los Robles</span>
          </div>

          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg w-full max-w-xs sm:max-w-md ml-auto md:ml-0">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700" />
          </div>

          <div className="hidden sm:flex items-center gap-3 ml-4">
            <Link to="/reservar" target="_blank" className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
              Portal Público ↗
            </Link>
          </div>
        </header>

        {/* Área scrolleable con padding inferior compensando la Bottom Bar en móvil */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>

        {/* Barra de Navegación Inferior Móvil (App Style) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-around z-40 px-2">
          <Link to="/dashboard" className={`flex flex-col items-center justify-center w-16 py-1 ${isActive('/dashboard') ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-1">Resumen</span>
          </Link>
          <Link to="/dashboard/calendario" className={`flex flex-col items-center justify-center w-16 py-1 ${isActive('/dashboard/calendario') ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <CalendarDays className="w-5 h-5" />
            <span className="text-[10px] mt-1">Grilla</span>
          </Link>
          <Link to="/dashboard/auditoria" className={`flex flex-col items-center justify-center w-16 py-1 ${isActive('/dashboard/auditoria') ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <History className="w-5 h-5" />
            <span className="text-[10px] mt-1">Auditoría</span>
          </Link>
          <Link to="/dashboard/clientes" className={`flex flex-col items-center justify-center w-16 py-1 ${isActive('/dashboard/clientes') ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <Users className="w-5 h-5" />
            <span className="text-[10px] mt-1">Clientes</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}

// --- 3. VISTA: INICIO / RESUMEN RESPONSIVO ---
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
    { rank: 1, name: "Matías Fernández", team: "Los Galácticos", goals: 18, matches: 8, badgeColor: "bg-amber-100 text-amber-800" },
    { rank: 2, name: "Cristóbal Silva", team: "Dep. Rayo", goals: 14, matches: 7, badgeColor: "bg-slate-200 text-slate-800" },
    { rank: 3, name: "Ignacio Tapia", team: "Aston Birra", goals: 12, matches: 8, badgeColor: "bg-orange-100 text-orange-800" },
  ];

  const standings = [
    { rank: 1, team: "Los Galácticos", pj: 8, pts: 22 },
    { rank: 2, team: "Deportivo Rayo", pj: 8, pts: 18 },
    { rank: 3, team: "Aston Birra", pj: 8, pts: 16 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Resumen General</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Métricas de ocupación y caja en tiempo real.</p>
        </div>
        <Link to="/dashboard/calendario" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Nueva Reserva
        </Link>
      </div>

      {/* Métricas Adaptables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stat.value}</h3>
              <p className="text-xs font-medium text-emerald-600">{stat.change}</p>
            </div>
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico y Caja */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Ingresos Semanales</h2>
              <p className="text-xs text-slate-400">Total: <strong className="text-slate-800">$1.315.000</strong></p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              +18.4%
            </span>
          </div>
          <div className="h-48 sm:h-56 flex items-end justify-between gap-2 sm:gap-3 pt-6 border-b border-slate-100 px-2 sm:px-4">
            {weeklyEarnings.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">{item.label}</span>
                <div style={{ height: item.height }} className={`w-full rounded-t-lg sm:rounded-t-xl transition-all ${item.day === 'Vie' ? 'bg-indigo-600' : 'bg-indigo-200'}`} />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Caja & Cobros</h2>
            <p className="text-xs text-slate-400">Distribución de pagos recibidos</p>
            <div className="mt-5 space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1"><span>Transferencia</span><span>58%</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-indigo-600 h-full rounded-full" style={{ width: '58%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1"><span>Tarjeta (POS)</span><span>30%</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1"><span>Efectivo</span><span>12%</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-amber-400 h-full rounded-full" style={{ width: '12%' }} /></div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mt-4 flex items-center justify-between text-xs text-slate-600">
            <span>Saldos por cobrar:</span>
            <span className="font-bold text-red-600">$84.000</span>
          </div>
        </div>
      </div>

      {/* Tablas Deportivas Adaptadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Máximos Goleadores</h2>
          </div>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {topScorers.map(p => (
                <tr key={p.rank} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-4 w-10 text-center"><span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${p.badgeColor}`}>{p.rank}</span></td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 text-xs sm:text-sm">{p.name} <span className="text-[11px] font-normal text-slate-500 block sm:inline">({p.team})</span></td>
                  <td className="py-2.5 px-4 text-right font-black text-indigo-600 text-xs sm:text-sm">{p.goals} goles</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Tabla de Equipos</h2>
          </div>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
              {standings.map(t => (
                <tr key={t.rank} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-4 text-center font-bold text-slate-400 w-8">{t.rank}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{t.team}</td>
                  <td className="py-2.5 px-4 text-right font-black text-slate-900">{t.pts} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 4. VISTA: AUDITORÍA & HISTORIAL RESPONSIVA ---
// --- COMPONENTE TEMPORIZADOR EN VIVO (CUENTA REGRESIVA 30 MIN) ---
function CountdownBadge({ createdAt }: { createdAt: string }) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const createdTime = new Date(createdAt).getTime();
      const expiresAt = createdTime + 30 * 60 * 1000; // Ventana de 30 minutos
      const diff = expiresAt - Date.now();

      if (diff <= 0) {
        setTimeLeft('0m 00s');
        setIsExpired(true);
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`);
      setIsExpired(false);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [createdAt]);

  if (isExpired) {
    return (
      <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit animate-pulse">
        ⚠️ Expirando (Liberando...)
      </span>
    );
  }

  return (
    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit font-mono">
      <Clock className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
      Libera en: {timeLeft}
    </span>
  );
}

// --- 4. VISTA: AUDITORÍA & HISTORIAL CON CONTEO REGRESIVO ---
function AuditView() {
  const { data: dbFields = [] } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => (await fetch(`${API_BASE_URL}/api/fields`)).json(),
  });
  const fieldsMap = dbFields.reduce((acc: any, f: any) => { acc[f.id] = f.name; return acc; }, {});

  // refetchInterval: 10000 hace que el historial consulte al backend cada 10s en segundo plano
  const { data: historyData = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/history`);
      if (!res.ok) throw new Error('Error al cargar historial');
      return res.json();
    },
    refetchInterval: 10000,
  });

  const getStatusBadge = (status: string, createdAt: string) => {
    switch(status) {
      case 'Pagado': 
        return (
          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3"/> Confirmado
          </span>
        );
      case 'Pendiente': 
        return (
          <div className="flex flex-col gap-1">
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[11px] font-bold flex items-center gap-1 w-fit">
              <Clock className="w-3 h-3"/> Pendiente
            </span>
            <CountdownBadge createdAt={createdAt} />
          </div>
        );
      case 'Anulado': 
        return (
          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold w-fit">
            Anulado (Libre)
          </span>
        );
      default: 
        return <span>{status}</span>;
    }
  };

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Auditoría de Reservas</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Historial inmutable de cancelaciones, pagos y tiempos de expiración.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-400 font-medium">Sincronización en vivo</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase">
              <tr>
                <th className="p-3 sm:p-4 font-semibold">Cliente</th>
                <th className="p-3 sm:p-4 font-semibold">Cancha y Horario</th>
                <th className="p-3 sm:p-4 font-semibold">Estado y Tiempo Restante</th>
                <th className="p-3 sm:p-4 font-semibold">Creación</th>
                <th className="p-3 sm:p-4 font-semibold">Último Cambio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyData.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400">No hay registros en el historial.</td></tr>
              ) : (
                historyData.map((record: any) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 sm:p-4">
                      <p className="font-bold text-slate-900">{record.clientName}</p>
                      <p className="text-xs text-slate-400">{record.clientPhone}</p>
                    </td>
                    <td className="p-3 sm:p-4">
                      <p className="font-semibold text-slate-900">{fieldsMap[record.fieldId] || 'Cancha'}</p>
                      <p className="text-xs text-slate-400">{record.date} • {record.timeSlot}</p>
                    </td>
                    <td className="p-3 sm:p-4">{getStatusBadge(record.status, record.createdAt)}</td>
                    <td className="p-3 sm:p-4 text-slate-600 text-xs">
                      {new Date(record.createdAt).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })} ({record.date})
                    </td>
                    <td className="p-3 sm:p-4 text-slate-600 text-xs font-medium">
                      {new Date(record.updatedAt).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                      {record.status === 'Anulado' && <span className="block text-red-500 text-[10px]">Por Cronjob / Admin</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 5. VISTA: CALENDARIO SEMANAL / DIARIO ADAPTABLE (ESTILO GOOGLE CALENDAR) ---
function CalendarView() {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedCourt, setSelectedCourt] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Lunes, 6 = Domingo
  const [detailModal, setDetailModal] = useState<any | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const timeSlots = ['19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'];

  const { data: dbFields = [], isLoading: loadingFields } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => (await fetch(`${API_BASE_URL}/api/fields`)).json(),
  });
  const fieldsMap = dbFields.reduce((acc: any, f: any) => { acc[f.id] = f.name; return acc; }, {});

  // Días de la semana
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

  const activeDay = weekDays[selectedDayIndex] || weekDays[0];

  const { data: allBookings = [], refetch } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/history`);
      if (!res.ok) throw new Error('Error al cargar');
      return res.json();
    },
  });

  const activeBookings = useMemo(() => {
    return allBookings.filter((b: any) => b.status !== 'Anulado');
  }, [allBookings]);

  const handleConfirmPayment = async () => {
    if (!detailModal) return;
    const pendingAmount = detailModal.totalPrice - detailModal.paidAmount;
    try {
      await fetch(`${API_BASE_URL}/api/bookings/${detailModal.id}/pay`, {
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
      await fetch(`${API_BASE_URL}/api/bookings/${detailModal.id}`, { method: 'DELETE' });
      setDetailModal(null); refetch();
    } catch { alert('Error al anular'); }
  };

  if (loadingFields) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Barra de Controles y Selector de Vista */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight capitalize">
                {weekDays[0]?.dayNum} {weekDays[0]?.monthName} – {weekDays[6]?.dayNum} {weekDays[6]?.monthName}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400">Control semanal de canchas</p>
            </div>
          </div>

          {/* Selector de Modo Día / Semana (Muy útil para teléfonos) */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button 
              onClick={() => setViewMode('day')} 
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'day' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'}`}
            >
              Día
            </button>
            <button 
              onClick={() => setViewMode('week')} 
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'week' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'}`}
            >
              Semana
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Navegación de Semanas */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setCurrentWeekOffset(prev => prev - 1)} className="p-1.5 hover:bg-white text-slate-700 rounded-lg transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentWeekOffset(0)} className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition">
              Hoy
            </button>
            <button onClick={() => setCurrentWeekOffset(prev => prev + 1)} className="p-1.5 hover:bg-white text-slate-700 rounded-lg transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filtro de Cancha */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCourt('all')}
              className={`px-2.5 py-1 rounded-lg transition ${selectedCourt === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'}`}
            >
              Todas
            </button>
            {dbFields.map((f: any) => (
              <button
                key={f.id}
                onClick={() => setSelectedCourt(f.id)}
                className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${selectedCourt === f.id ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selector de Día (Visible cuando el modo es "Día" en móviles o tablets) */}
      {viewMode === 'day' && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {weekDays.map((d, index) => {
            const isSelected = selectedDayIndex === index;
            return (
              <button
                key={d.dateStr}
                onClick={() => setSelectedDayIndex(index)}
                className={`flex-1 min-w-[50px] p-2.5 rounded-xl border text-center transition ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <span className="text-[10px] uppercase font-bold block">{d.dayName}</span>
                <span className="text-base font-extrabold">{d.dayNum}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* VISTA 1: MODO SEMANAL COMPLETO (Horizontal Scroll para Tablet/Desktop) */}
      {viewMode === 'week' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs overflow-x-auto">
          <div className="min-w-[850px]">
            <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/70">
              <div className="p-3 border-r border-slate-200 text-center text-xs font-bold text-slate-400 uppercase">
                Hora
              </div>
              {weekDays.map(day => (
                <div key={day.dateStr} className={`p-3 text-center border-r border-slate-200 last:border-r-0 ${day.isToday ? 'bg-indigo-50/60' : ''}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{day.dayName}</span>
                  <span className={`inline-flex items-center justify-center text-xs font-extrabold w-7 h-7 rounded-full mt-0.5 ${day.isToday ? 'bg-indigo-600 text-white' : 'text-slate-800'}`}>
                    {day.dayNum}
                  </span>
                </div>
              ))}
            </div>

            <div className="divide-y divide-slate-100">
              {timeSlots.map(slot => (
                <div key={slot} className="grid grid-cols-8 min-h-[95px]">
                  <div className="p-2 border-r border-slate-200 bg-slate-50/30 text-[11px] font-semibold text-slate-500 flex flex-col justify-start">
                    <span>{slot.split(' - ')[0]}</span>
                    <span className="text-[9px] text-slate-400">{slot.split(' - ')[1]}</span>
                  </div>

                  {weekDays.map(day => {
                    const bookingsInCell = activeBookings.filter((b: any) => {
                      const matchesDate = b.date === day.dateStr;
                      const matchesSlot = b.timeSlot === slot;
                      const matchesCourt = selectedCourt === 'all' || b.fieldId === selectedCourt;
                      return matchesDate && matchesSlot && matchesCourt;
                    });

                    return (
                      <div key={`${day.dateStr}-${slot}`} className="p-1 border-r border-slate-200 last:border-r-0 flex flex-col gap-1">
                        {bookingsInCell.map((booking: any) => {
                          const isPaid = booking.status === 'Pagado';
                          return (
                            <div
                              key={booking.id}
                              onClick={() => setDetailModal(booking)}
                              className={`p-1.5 sm:p-2 rounded-lg border cursor-pointer transition hover:scale-[1.02] shadow-xs text-left ${
                                isPaid
                                  ? 'bg-emerald-50 border-l-4 border-l-emerald-500 border-emerald-200 text-emerald-950'
                                  : 'bg-amber-50 border-l-4 border-l-amber-500 border-amber-200 text-amber-950'
                              }`}
                            >
                              <p className="font-bold text-[11px] truncate">{booking.clientName}</p>
                              <p className="text-[9px] text-slate-500 truncate">{fieldsMap[booking.fieldId]}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VISTA 2: MODO DÍA (Optimizado para teléfonos móviles) */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="font-bold text-slate-900 text-sm">
              Horarios para {activeDay.dayName} {activeDay.dayNum} de {activeDay.monthName}
            </span>
            {activeDay.isToday && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">Hoy</span>}
          </div>

          {timeSlots.map(slot => {
            const bookingsInSlot = activeBookings.filter((b: any) => {
              const matchesDate = b.date === activeDay.dateStr;
              const matchesSlot = b.timeSlot === slot;
              const matchesCourt = selectedCourt === 'all' || b.fieldId === selectedCourt;
              return matchesDate && matchesSlot && matchesCourt;
            });

            return (
              <div key={slot} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold w-28 shrink-0">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  {slot}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                  {bookingsInSlot.length > 0 ? (
                    bookingsInSlot.map((b: any) => (
                      <div
                        key={b.id}
                        onClick={() => setDetailModal(b)}
                        className={`flex-1 p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                          b.status === 'Pagado' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm">{b.clientName}</p>
                          <p className="text-xs text-slate-500">{fieldsMap[b.fieldId]} • ${b.totalPrice?.toLocaleString('es-CL')}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.status === 'Pagado' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'}`}>
                          {b.status === 'Pagado' ? 'Pagado' : 'Validar'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-2.5 px-3 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                      Horario Disponible
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Detalle */}
      {detailModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-5 sm:p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{detailModal.clientName}</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{fieldsMap[detailModal.fieldId]} • {detailModal.timeSlot}</p>
                <p className="text-xs text-slate-400 mt-1">WhatsApp: {detailModal.clientPhone}</p>
              </div>
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${detailModal.status === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {detailModal.status === 'Pagado' ? 'Confirmado' : 'Pendiente'}
              </span>
            </div>
            
            <div className="bg-slate-50 p-3.5 rounded-xl text-xs sm:text-sm space-y-1.5 mb-4 border border-slate-100">
              <div className="flex justify-between text-slate-600"><span>Monto Total:</span> <strong className="text-slate-900">${detailModal.totalPrice?.toLocaleString('es-CL')}</strong></div>
              <div className="flex justify-between pt-1.5 border-t border-slate-200 font-bold">
                <span>Por cobrar:</span> 
                <span className={detailModal.status === 'Pagado' ? 'text-emerald-600' : 'text-red-600'}>${(detailModal.totalPrice - detailModal.paidAmount).toLocaleString('es-CL')}</span>
              </div>
            </div>

            {detailModal.status === 'Pendiente' && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Comprobante de Transferencia</label>
                <label className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl text-xs font-medium text-slate-600 cursor-pointer transition w-full justify-center">
                  <Paperclip className="w-4 h-4 text-slate-400" /> 
                  <span className="truncate max-w-[200px]">{receiptFile ? receiptFile.name : 'Adjuntar comprobante'}</span>
                  <input type="file" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} accept="image/*,.pdf" />
                </label>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {detailModal.status === 'Pendiente' && (
                <button onClick={handleConfirmPayment} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition flex justify-center items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Aprobar & Notificar Cliente
                </button>
              )}
              
              <div className="flex justify-between mt-2 pt-3 border-t border-slate-100">
                <button onClick={handleDeleteBooking} className="text-xs font-semibold text-red-500 hover:text-red-700">Liberar Cancha</button>
                <button onClick={() => { setDetailModal(null); setReceiptFile(null); }} className="text-xs font-medium text-slate-500">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 6. VISTA: DIRECTORIO & CRM DE CLIENTES (MOCKUP INTERACTIVO PARA PRESENTACIÓN) ---
function ClientsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<'Todos' | 'VIP' | 'Frecuente' | 'Inactivo'>('Todos');
  const [promoModalClient, setPromoModalClient] = useState<any | null>(null);

  // Métricas globales del CRM
  const crmMetrics = [
    { title: "Jugadores Registrados", value: "148", change: "+14 este mes", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Clientes VIP / Frecuentes", value: "38", change: "25.6% del total", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Gasto Promedio (LTV)", value: "$76.400", change: "+8% vs sem. pasada", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Retorno Campañas WhatsApp", value: "88%", change: "19 reservas reactivadas", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-50" }
  ];

  // Base de datos de demostración
  const clientData = [
    { id: '1', name: 'Paula Muñoz', phone: '+56 9 7385 7123', totalBookings: 16, totalSpent: 384000, lastVisit: 'Hoy', preferredCourt: 'Cancha 1 (Techada)', category: 'VIP', attendanceRate: '100%' },
    { id: '2', name: 'Pamela Venegas Moya', phone: '+56 9 7107 0176', totalBookings: 11, totalSpent: 264000, lastVisit: 'Ayer', preferredCourt: 'Cancha 1 (Techada)', category: 'VIP', attendanceRate: '92%' },
    { id: '3', name: 'Diego Muñoz Venegas', phone: '+56 9 7376 4805', totalBookings: 8, totalSpent: 192000, lastVisit: 'Hace 3 días', preferredCourt: 'Cancha 2 (Sintético)', category: 'Frecuente', attendanceRate: '88%' },
    { id: '4', name: 'Cristóbal Silva', phone: '+56 9 8452 1190', totalBookings: 6, totalSpent: 132000, lastVisit: 'Hace 5 días', preferredCourt: 'Cancha 2 (Sintético)', category: 'Frecuente', attendanceRate: '83%' },
    { id: '5', name: 'Matías Fernández', phone: '+56 9 9123 4455', totalBookings: 2, totalSpent: 48000, lastVisit: 'Hace 22 días', preferredCourt: 'Cancha 1 (Techada)', category: 'Inactivo', attendanceRate: '66%' },
    { id: '6', name: 'Lucas Contreras', phone: '+56 9 6554 3321', totalBookings: 1, totalSpent: 22000, lastVisit: 'Hace 30 días', preferredCourt: 'Cancha 2 (Sintético)', category: 'Inactivo', attendanceRate: '50%' },
  ];

  const filteredClients = clientData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone.includes(searchTerm);
    const matchesSegment = selectedSegment === 'Todos' || client.category === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'VIP':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1 w-fit"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> VIP Oro</span>;
      case 'Frecuente':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 w-fit">Frecuente</span>;
      case 'Inactivo':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 w-fit">Reactivar</span>;
      default:
        return <span>{category}</span>;
    }
  };

  const handleSendCustomPromo = (client: any, templateType: 'descuento' | 'agradecimiento' | 'reactivacion') => {
    let msg = '';
    const phoneClean = client.phone.replace(/\D/g, '');

    if (templateType === 'descuento') {
      msg = `⚽ ¡Hola ${client.name}! En Canchas Los Robles premiamos tu fidelidad como cliente VIP.\n\n🔥 Este jueves tienes un *15% OFF* en tu horario habitual en ${client.preferredCourt}.\n\n¿Te reservamos el turno antes de que se libere?`;
    } else if (templateType === 'reactivacion') {
      msg = `⚽ ¡Hola ${client.name}! Hace días no te vemos por las canchas.\n\n¡Arma el partido con tus amigos! Te regalamos un *20% OFF* o *1 balón de regalo* para tu próxima reserva este fin de semana.`;
    } else {
      msg = `👋 Hola ${client.name}, gracias por jugar con nosotros en Canchas Los Robles. ¿Todo en orden con tu última reserva? Si necesitas fijar un horario semanal fijo avísanos por acá.`;
    }

    window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(msg)}`, '_blank');
    setPromoModalClient(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Cabecera con selector de acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Directorio & CRM de Clientes</h1>
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-extrabold text-[10px] tracking-wide uppercase">
              Módulo CRM
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Historial de consumo acumulado, fidelización y campañas de WhatsApp.</p>
        </div>
      </div>

      {/* 2. Tarjetas de Métricas de Retención */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {crmMetrics.map((metric, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{metric.title}</p>
              <h3 className="text-2xl font-extrabold text-slate-900">{metric.value}</h3>
              <p className="text-xs font-semibold text-emerald-600">{metric.change}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${metric.bg}`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Panel Promocional: Campañas de WhatsApp Rápidas */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden border border-indigo-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Marketing Automatizado</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Lanza promociones segmentadas por WhatsApp</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Reactiva jugadores inactivos, llena horarios libres de baja ocupación y recompensa a los clientes que más gastan en el recinto.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={() => setSelectedSegment('Inactivo')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold backdrop-blur-md transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Reactivar Inactivos (2)
            </button>
            <button 
              onClick={() => setSelectedSegment('VIP')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              Beneficios VIP Oro
            </button>
          </div>
        </div>
      </div>

      {/* 4. Tabla y Filtros del Directorio */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Barra de Filtros */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center bg-slate-100 px-3 py-2 rounded-xl w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o teléfono..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-xs sm:text-sm w-full text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['Todos', 'VIP', 'Frecuente', 'Inactivo'] as const).map(segment => (
              <button
                key={segment}
                onClick={() => setSelectedSegment(segment)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedSegment === segment 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla Responsiva */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 sm:p-4">Jugador</th>
                <th className="p-3.5 sm:p-4">Categoría</th>
                <th className="p-3.5 sm:p-4 text-center">Partidos</th>
                <th className="p-3.5 sm:p-4">Total Invertido</th>
                <th className="p-3.5 sm:p-4">Última Visita</th>
                <th className="p-3.5 sm:p-4 text-right">Contacto & Promos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 text-xs sm:text-sm">
                    No se encontraron clientes con el filtro aplicado.
                  </td>
                </tr>
              ) : (
                filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 sm:p-4">
                      <p className="font-bold text-slate-900">{client.name}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{client.phone}</p>
                    </td>
                    <td className="p-3.5 sm:p-4">
                      {getCategoryBadge(client.category)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center font-bold text-slate-800">
                      {client.totalBookings}
                    </td>
                    <td className="p-3.5 sm:p-4">
                      <p className="font-extrabold text-slate-900">${client.totalSpent.toLocaleString('es-CL')}</p>
                      <span className="text-[10px] text-slate-400">Prom. ${(client.totalSpent / client.totalBookings).toLocaleString('es-CL')}/turno</span>
                    </td>
                    <td className="p-3.5 sm:p-4">
                      <span className="font-medium text-slate-700">{client.lastVisit}</span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[140px]">{client.preferredCourt}</span>
                    </td>
                    <td className="p-3.5 sm:p-4 text-right">
                      <button
                        onClick={() => setPromoModalClient(client)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>Promo WhatsApp</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Modal de Envío de Promoción Personalizada */}
      {promoModalClient && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-5 sm:p-6 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enviar Promoción por WhatsApp</h3>
                <p className="text-xs text-slate-500 mt-0.5">Destinatario: <strong className="text-slate-800">{promoModalClient.name}</strong></p>
                <p className="text-[11px] text-slate-400 font-mono">{promoModalClient.phone}</p>
              </div>
              {getCategoryBadge(promoModalClient.category)}
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-xs font-bold text-slate-700">Selecciona la plantilla de mensaje:</p>

              <button
                onClick={() => handleSendCustomPromo(promoModalClient, 'descuento')}
                className="w-full p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-left transition group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" /> Descuento VIP de Fidelización
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600">15% OFF</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Ofrece 15% de descuento exclusivo en su cancha favorita ({promoModalClient.preferredCourt}).
                </p>
              </button>

              <button
                onClick={() => handleSendCustomPromo(promoModalClient, 'reactivacion')}
                className="w-full p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-left transition group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Reactivación de Partidos
                  </span>
                  <span className="text-[10px] font-bold text-amber-700">Balón / Dcto</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Invita a volver a jugar con incentivo de balón gratis o 20% de descuento.
                </p>
              </button>

              <button
                onClick={() => handleSendCustomPromo(promoModalClient, 'agradecimiento')}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition"
              >
                <span className="text-xs font-bold text-slate-800 block mb-0.5">Encuesta rápida / Horario Fijo</span>
                <p className="text-[11px] text-slate-500">
                  Pregunta cómo estuvo la experiencia y ofrece bloquear un turno fijo semanal.
                </p>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPromoModalClient(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 7. VISTA B2C: PORTAL PÚBLICO (CON COMPROBANTE OBLIGATORIO) ---
function PublicPortal() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [receiptFile, setReceiptFile] = useState<File | null>(null); // Estado para el comprobante
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 7 días sin desfase UTC
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      return {
        dateStr,
        dayName: d.toLocaleDateString('es-CL', { weekday: 'short' }),
        dayNum: d.getDate(),
      };
    });
  }, []);

  const { data: dbFields = [], isLoading: loadingFields } = useQuery({
    queryKey: ['fields'],
    queryFn: async () => (await fetch(`${API_BASE_URL}/api/fields`)).json(),
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
    queryFn: async () => (await fetch(`${API_BASE_URL}/api/bookings?date=${selectedDate}`)).json(),
  });

  const visibleSlots = allAvailableSlots.filter(slot => !dbBookings.some((b: any) => b.fieldId === slot.fieldId && b.timeSlot === slot.time));

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
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

      // Si otro usuario se adelantó mientras llenaba el formulario
      if (res.status === 409) {
        const errorData = await res.json();
        alert(errorData.error || 'Lo sentimos, este turno acaba de ser tomado por otra persona.');
        refetch(); // Refrescar turnos ocupados
        setStep(1); // Volver a la grilla
        setSelectedSlot(null);
        return;
      }

      if (!res.ok) throw new Error('Error al procesar reserva');

      refetch();
      setStep(3);
    } catch {
      alert('Error de conexión al agendar. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!receiptFile || !selectedSlot) return;
    const msg = encodeURIComponent(
      `⚽ ¡Hola! Acabo de reservar en su portal web.\n\n` +
      `📌 *Detalles de la Reserva:*\n` +
      `• *Cancha:* ${selectedSlot.field}\n` +
      `• *Fecha:* ${selectedDate}\n` +
      `• *Horario:* ${selectedSlot.time}\n` +
      `• *Titular:* ${formData.name}\n` +
      `• *Total:* $${selectedSlot.price.toLocaleString('es-CL')}\n\n` +
      `📎 *Comprobante adjunto:* ${receiptFile.name}\n` +
      `(Te adjunto la imagen del comprobante a continuación)`
    );
    window.open(`https://wa.me/569XXXXXXXX?text=${msg}`, '_blank');
  };

  if (loadingFields) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
        <p className="mt-4 text-slate-300 font-medium text-sm">Cargando recinto...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-8 sm:py-14 px-4 overflow-x-hidden">
      {/* Fondo con imagen deportiva y overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 scale-105 transform transition duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950/95 backdrop-blur-[1px]" />
      </div>

      {/* Cabecera */}
      <div className="max-w-xl w-full text-center mb-6 sm:mb-8 relative z-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="w-14 h-14 bg-indigo-600/90 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-xl ring-4 ring-white/10">
          <MapPin className="text-white w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
          Canchas Los Robles
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-slate-300 text-xs sm:text-sm font-medium">Reserva directa en línea</p>
        </div>
      </div>

      {/* Tarjeta Principal */}
      <div className="max-w-xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden p-5 sm:p-8 relative z-10">
        {step === 1 && (
          <>
            <h2 className="font-bold text-slate-800 text-sm sm:text-base mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-600" /> Selecciona un día
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
              {weekDays.map((day) => {
                const isSelected = selectedDate === day.dateStr;
                return (
                  <button 
                    key={day.dateStr} 
                    onClick={() => { setSelectedDate(day.dateStr); setSelectedSlot(null); }} 
                    className={`min-w-[58px] sm:min-w-[64px] flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition duration-150 ${
                      isSelected 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20' 
                        : 'bg-white/80 text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-white'
                    }`}
                  >
                    <span className="text-[11px] capitalize font-semibold">{day.dayName}</span>
                    <span className="text-base sm:text-lg font-extrabold">{day.dayNum}</span>
                  </button>
                );
              })}
            </div>

            <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" /> Horarios Disponibles
            </h3>
            
            {visibleSlots.length === 0 ? (
               <div className="p-8 text-center text-slate-500 bg-slate-50/70 rounded-2xl border border-dashed border-slate-300 text-sm">
                 No hay canchas disponibles para esta fecha.
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dbFields.map((field: any) => {
                  const slotsForThisField = visibleSlots.filter(s => s.fieldId === field.id);
                  return (
                    <div key={field.id} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4">
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-3 text-center pb-2 border-b border-slate-200">
                        {field.name}
                      </h4>
                      {slotsForThisField.length === 0 ? (
                        <p className="text-xs text-center text-slate-400 py-4">Sin turnos libres</p>
                      ) : (
                        <div className="space-y-2">
                          {slotsForThisField.map(slot => (
                            <button 
                              key={slot.id} 
                              onClick={() => { setSelectedSlot(slot); setStep(2); }} 
                              className="w-full flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-600 hover:shadow-xs transition group"
                            >
                              <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition">
                                {slot.time}
                              </span>
                              <span className="font-extrabold text-indigo-600 text-xs sm:text-sm">
                                ${slot.price.toLocaleString('es-CL')}
                              </span>
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
            <button onClick={() => setStep(1)} className="text-xs text-indigo-600 font-semibold mb-4 inline-block hover:underline">
              ← Volver a horarios
            </button>
            <div className="p-4 bg-slate-50 rounded-2xl mb-5 border border-slate-200/80">
              <p className="font-bold text-slate-900 text-sm">{selectedSlot.field}</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{selectedDate} • {selectedSlot.time}</p>
              <p className="font-extrabold text-indigo-600 mt-2 text-base">${selectedSlot.price.toLocaleString('es-CL')}</p>
            </div>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="Ej: Marcelo Díaz" 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-600 bg-white" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">WhatsApp de contacto</label>
                <input 
                  type="text" 
                  required 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  placeholder="+56 9 1234 5678" 
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-600 bg-white" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl disabled:opacity-50 transition shadow-md shadow-indigo-600/20"
              >
                {isSubmitting ? 'Procesando...' : 'Bloquear Cancha y Pagar'}
              </button>
            </form>
          </div>
        )}
        
        {step === 3 && (
          <div className="max-w-md mx-auto text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">¡Cancha Reservada Temporalmente!</h2>
              <p className="text-xs text-slate-500 mt-1">
                Tu turno está bloqueado por <strong>30 minutos</strong>. Realiza la transferencia y adjunta tu comprobante para confirmar.
              </p>
            </div>

            {/* Datos de Transferencia */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 mb-5 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-500">Monto exacto a transferir:</span>
                <span className="font-black text-indigo-600 text-sm">${selectedSlot?.price.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Banco:</span>
                <span className="font-bold">BancoEstado</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Tipo de Cuenta:</span>
                <span className="font-bold">CuentaRUT</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Número de Cuenta / RUT:</span>
                <span className="font-bold">12.345.678-9</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-medium text-slate-500">Correo:</span>
                <span className="font-bold">pagos@losrobles.cl</span>
              </div>
            </div>

            {/* Área de Carga Obligatoria de Archivo */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>Comprobante de Transferencia <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-slate-400 font-normal">JPG, PNG o PDF</span>
              </label>

              <label 
                className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl cursor-pointer transition text-center ${
                  receiptFile 
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900' 
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50/60 text-slate-600'
                }`}
              >
                {receiptFile ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-left">
                      <p className="font-bold text-xs truncate max-w-[220px]">{receiptFile.name}</p>
                      <p className="text-[10px] text-emerald-700">Archivo cargado exitosamente. Clic para cambiar.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 py-1">
                    <Paperclip className="w-5 h-5 text-indigo-500" />
                    <p className="text-xs font-bold text-slate-700">Subir comprobante o captura</p>
                    <p className="text-[11px] text-slate-400">Toca aquí para seleccionar desde tu galería o archivos</p>
                  </div>
                )}
                <input 
                  type="file" 
                  required
                  accept="image/*,.pdf" 
                  className="hidden" 
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} 
                />
              </label>
            </div>

            {/* Botón de WhatsApp protegido */}
            <button
              onClick={handleOpenWhatsApp}
              disabled={!receiptFile}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md ${
                receiptFile 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 cursor-pointer active:scale-[0.99]' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              <Send className="w-4 h-4" />
              {receiptFile ? 'Enviar y Validar Comprobante' : 'Adjunta el comprobante para continuar'}
            </button>

            {!receiptFile && (
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Es necesario seleccionar el comprobante para habilitar el botón.
              </p>
            )}
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