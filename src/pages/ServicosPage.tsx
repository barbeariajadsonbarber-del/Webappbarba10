import React, { useState } from 'react';
import { Scissors, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicosPage: React.FC = () => {
  const { services, setActivePage } = useApp();
  const [activeTab, setActiveTab] = useState<'individual' | 'combo'>('individual');

  return (
    <div className="pb-24 pt-2 px-4 max-w-3xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="border-b border-neutral-800 pb-3">
        <h1 className="text-2xl font-black text-white font-mono flex items-center gap-2">
          <Scissors className="w-6 h-6 text-amber-400" />
          Nossos Serviços
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Conheça o catálogo completo de procedimentos oferecidos pela Barbearia BARBA10
        </p>
      </div>

      {/* Navigation Buttons: Serviço Individual / Combo Promocional */}
      <div className="grid grid-cols-2 gap-2 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800 shadow-md">
        <button
          onClick={() => setActiveTab('individual')}
          className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'individual'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Serviço Individual</span>
        </button>

        <button
          onClick={() => setActiveTab('combo')}
          className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'combo'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Combo Promocional</span>
        </button>
      </div>

      {/* INDIVIDUAL SERVICES PAGE */}
      {activeTab === 'individual' && (
        <div className="space-y-3 animate-fadeIn">
          <h2 className="text-xs font-bold uppercase text-amber-400 tracking-wider font-mono flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            Serviços Individuais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services
              .filter((s) => s.category === 'individual')
              .map((service) => (
                <div
                  key={service.id}
                  className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 shadow-md space-y-2 flex flex-col justify-between hover:border-amber-500/30 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-white font-mono">{service.name}</h3>
                      <span className="text-sm font-bold text-amber-400 font-mono shrink-0">
                        R$ {service.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{service.description}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {service.durationMinutes} min
                    </span>

                    <button
                      onClick={() => setActivePage('agenda')}
                      className="py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs uppercase transition-colors"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* COMBOS SECTION / PAGE */}
      {activeTab === 'combo' && (
        <div className="space-y-3 animate-fadeIn">
          <h2 className="text-xs font-bold uppercase text-amber-400 tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Combos Promocionais (Economia Garantida)
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {services
              .filter((s) => s.category === 'combo')
              .map((combo) => (
                <div
                  key={combo.id}
                  className="bg-neutral-900/80 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-mono">{combo.name}</h3>
                        {combo.popular && (
                          <span className="text-[9px] bg-amber-500 text-black font-extrabold px-2 py-0.5 rounded uppercase font-mono">
                            Recomendado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 mt-1">{combo.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xl font-black text-amber-400 font-mono">
                        R$ {combo.price.toFixed(2).replace('.', ',')}
                      </span>
                      <p className="text-xs text-gray-400 flex items-center justify-end gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {combo.durationMinutes} minutos
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Atendimento individual com horário marcado</span>
                    <button
                      onClick={() => setActivePage('agenda')}
                      className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <span>Agendar Este Combo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
};
