import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/Toast';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

import { AgendamentoPage } from './pages/AgendamentoPage';
import { MeusAgendamentosPage } from './pages/MeusAgendamentosPage';
import { FeedPage } from './pages/FeedPage';
import { BarbeariaPage } from './pages/BarbeariaPage';
import { ServicosPage } from './pages/ServicosPage';
import { BarbeirosPage } from './pages/BarbeirosPage';
import { LoginPage } from './pages/LoginPage';
import { PerfilPage } from './pages/PerfilPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black flex flex-col">
      {/* Header */}
      <Header />

      {/* Sidebar Drawer */}
      <Sidebar />

      {/* Main Page Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto">
        {activePage === 'agenda' && <AgendamentoPage />}
        {activePage === 'meus-agendamentos' && <MeusAgendamentosPage />}
        {activePage === 'feed' && <FeedPage />}
        {activePage === 'barbearia' && <BarbeariaPage />}
        {activePage === 'servicos' && <ServicosPage />}
        {activePage === 'barbeiros' && <BarbeirosPage />}
        {activePage === 'login' && <LoginPage />}
        {activePage === 'perfil' && <PerfilPage />}
      </main>

      {/* Fixed Bottom Navigation (Mobile) */}
      <BottomNav />

      {/* Toast Notifications Overlay */}
      <ToastContainer />

      {/* PWA Install Banner */}
      <PwaInstallPrompt />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}
