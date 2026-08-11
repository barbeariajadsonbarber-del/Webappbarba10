import React from 'react';
import { Scissors, Menu, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { barbershopInfo, setIsSidebarOpen, isLoggedIn, setActivePage } = useApp();

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-[#000000]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 shadow-md transition-colors duration-200 relative overflow-hidden flex items-center">
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActivePage('agenda')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DAA520] flex items-center justify-center text-black font-bold shadow-md shadow-[#DAA520]/25 shrink-0">
            <Scissors className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest text-[#8E9299] uppercase font-bold leading-none mb-0.5">
              Barbearia
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#DAA520] font-mono leading-tight">
              {barbershopInfo.name}
            </span>
          </div>
        </div>

        {/* Right Actions: Menu (if logged in) or Login button (if logged out) */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="py-2 px-3.5 rounded-lg bg-[#DAA520] hover:bg-[#c9951b] text-black font-extrabold transition-all active:scale-95 flex items-center gap-2 shadow-md shadow-[#DAA520]/15 text-xs uppercase tracking-wider cursor-pointer"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline-block">Menu</span>
            </button>
          ) : (
            <button
              onClick={() => setActivePage('login')}
              className="py-1.5 px-2.5 rounded-lg bg-[#DAA520] hover:bg-[#c9951b] text-black font-extrabold transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-[#DAA520]/15 text-[11px] uppercase tracking-wider cursor-pointer"
              aria-label="Entrar na conta"
            >
              <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Entrar</span>
            </button>
          )}
        </div>

      </div>

      {/* Animated Breathing Yellow Bottom Border */}
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#DAA520]/20 via-[#DAA520] to-[#DAA520]/20 animate-header-breath pointer-events-none" 
      />
    </header>
  );
};

