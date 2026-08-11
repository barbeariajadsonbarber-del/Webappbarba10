import React, { useState } from 'react';
import { User, Phone, Mail, CalendarCheck, LogOut, Edit2, Check, ShieldCheck, Award, Sparkles, Scissors } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PerfilPage: React.FC = () => {
  const { currentUser, logout, updateProfile, appointments, setActivePage } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, email });
    setIsEditing(false);
  };

  const myAppointments = appointments.filter((app) => app.customerName === currentUser?.name || app.customerPhone === currentUser?.phone);
  const totalAgendados = myAppointments.filter((app) => app.status === 'Agendado' || app.status === 'Confirmado').length;
  const totalConcluidos = myAppointments.filter((app) => app.status === 'Concluído').length;

  return (
    <div className="min-h-[calc(100dvh-132px)] py-4 pb-20 px-4 max-w-md mx-auto flex flex-col justify-between space-y-4 animate-fadeIn">
      
      {/* Title */}
      <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white font-mono flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            Meu Perfil
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Gerencie suas informações pessoais e sua conta BARBA10
          </p>
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Sair da Conta"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>

      {/* User Card */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden space-y-4">
        {/* Decorative Gold Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0 border border-amber-300/40">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-mono truncate">{currentUser?.name}</h2>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-extrabold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 fill-amber-400" />
                VIP
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{currentUser?.email}</p>
            <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">{currentUser?.phone}</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-neutral-800">
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-black text-white font-mono leading-tight block">{totalAgendados}</span>
              <span className="text-[10px] text-gray-400 uppercase font-sans font-bold">Ativos</span>
            </div>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-black text-white font-mono leading-tight block">{totalConcluidos}</span>
              <span className="text-[10px] text-gray-400 uppercase font-sans font-bold">Concluídos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form or Info Card */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Dados Pessoais
          </h3>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 font-mono cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 uppercase font-sans flex items-center gap-1.5">
                <User className="w-3 h-3 text-amber-400" />
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 uppercase font-sans flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-400" />
                Telefone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 uppercase font-sans flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-amber-400" />
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 text-gray-300 text-xs font-bold uppercase"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 text-xs text-gray-300 font-sans">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-gray-400 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Nome:
              </span>
              <span className="font-bold text-white">{currentUser?.name}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-gray-400 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Telefone:
              </span>
              <span className="font-bold text-white">{currentUser?.phone}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-gray-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                E-mail:
              </span>
              <span className="font-bold text-white">{currentUser?.email}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Shortcuts */}
      <div className="space-y-2">
        <button
          onClick={() => setActivePage('meus-agendamentos')}
          className="w-full p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-mono text-xs font-bold uppercase flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <CalendarCheck className="w-4 h-4 text-amber-400" />
            <span>Ver Meus Agendamentos</span>
          </div>
          <span className="text-amber-400">→</span>
        </button>

        <button
          onClick={() => setActivePage('agenda')}
          className="w-full p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-extrabold uppercase flex items-center justify-between shadow-lg shadow-amber-500/15 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Scissors className="w-4 h-4 stroke-[2.5]" />
            <span>Fazer Novo Agendamento</span>
          </div>
          <span>+</span>
        </button>
      </div>

      {/* Logout button bottom */}
      <button
        onClick={logout}
        className="w-full py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair da Conta BARBA10</span>
      </button>

    </div>
  );
};
