import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Barber,
  ServiceItem,
  Appointment,
  FeedPost,
  BarbershopInfo,
  AppointmentStatus,
  AppointmentService,
  UserAccount,
} from '../types';
import {
  initialBarbers,
  initialServices,
  initialFeedPosts,
  initialBarbershopInfo,
  sampleAppointments,
} from '../data/initialData';

export type ActivePage =
  | 'agenda'
  | 'meus-agendamentos'
  | 'feed'
  | 'barbearia'
  | 'servicos'
  | 'barbeiros'
  | 'perfil'
  | 'login';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  barbershopInfo: BarbershopInfo;
  barbers: Barber[];
  services: ServiceItem[];
  feedPosts: FeedPost[];
  appointments: Appointment[];
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;

  // Auth & Profile state
  isLoggedIn: boolean;
  currentUser: UserAccount | null;
  login: (emailOrPhone: string, password?: string) => Promise<boolean>;
  registerUser: (name: string, phone: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserAccount>) => void;
  
  // Booking pre-selection helpers
  selectedBarberForBooking?: Barber;
  setSelectedBarberForBooking: (barber: Barber | undefined) => void;
  
  // Appointment actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<Appointment>;
  cancelAppointment: (appointmentId: string) => Promise<boolean>;
  rescheduleAppointment: (
    appointmentId: string,
    newDate: string,
    newStartTime: string,
    newEndTime: string,
    newBarberId: string,
    newBarberName: string
  ) => Promise<boolean>;
  updateAppointmentServices: (
    appointmentId: string,
    newServices: AppointmentService[],
    newTotalPrice: number,
    newTotalDuration: number,
    isCombo: boolean
  ) => Promise<boolean>;
  deleteAppointment: (appointmentId: string) => Promise<boolean>;
  clearHistory: () => Promise<boolean>;

  // Feed actions
  toggleLikePost: (postId: string) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Drawer / Sidebar state
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_APPOINTMENTS_KEY = 'barba10_appointments';
const LOCAL_STORAGE_CUSTOMER_KEY = 'barba10_customer';
const LOCAL_STORAGE_USER_KEY = 'barba10_logged_user';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('agenda');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [barbershopInfo] = useState<BarbershopInfo>(initialBarbershopInfo);
  const [barbers] = useState<Barber[]>(initialBarbers);
  const [services] = useState<ServiceItem[]>(initialServices);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(initialFeedPosts);
  const [selectedBarberForBooking, setSelectedBarberForBooking] = useState<Barber | undefined>();

  // Auth & Profile State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading user from localStorage', e);
    }
    return null;
  });

  const isLoggedIn = Boolean(currentUser);

  // Customer info state
  const [customerName, setCustomerNameState] = useState<string>(() => {
    if (currentUser?.name) return currentUser.name;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.name || 'Cliente BARBA10';
      }
    } catch (e) {
      // fallback
    }
    return 'Cliente BARBA10';
  });

  const [customerPhone, setCustomerPhoneState] = useState<string>(() => {
    if (currentUser?.phone) return currentUser.phone;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.phone || '(11) 99999-8888';
      }
    } catch (e) {
      // fallback
    }
    return '(11) 99999-8888';
  });

  // Sync user state with localStorage and customerName/Phone
  const login = async (emailOrPhone: string, _password?: string): Promise<boolean> => {
    const isEmail = emailOrPhone.includes('@');
    const mockUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: currentUser?.name || (isEmail ? emailOrPhone.split('@')[0] : 'Cliente Barba10'),
      email: isEmail ? emailOrPhone : 'cliente@barba10.com.br',
      phone: !isEmail ? emailOrPhone : '(11) 98765-4321',
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(mockUser);
    setCustomerNameState(mockUser.name);
    setCustomerPhoneState(mockUser.phone);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    addToast(`Bem-vindo, ${mockUser.name}! Login realizado com sucesso.`, 'success');
    return true;
  };

  const registerUser = async (
    name: string,
    phone: string,
    email: string,
    _password?: string
  ): Promise<boolean> => {
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(newUser);
    setCustomerNameState(newUser.name);
    setCustomerPhoneState(newUser.phone);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    addToast(`Conta criada com sucesso! Seja bem-vindo, ${newUser.name}.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    addToast('Você saiu da sua conta.', 'info');
    setActivePage('agenda');
  };

  const updateProfile = (updatedData: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    if (updated.name) setCustomerNameState(updated.name);
    if (updated.phone) setCustomerPhoneState(updated.phone);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));
    addToast('Perfil atualizado com sucesso!', 'success');
  };

  const setCustomerName = (name: string) => {
    setCustomerNameState(name);
    localStorage.setItem(
      LOCAL_STORAGE_CUSTOMER_KEY,
      JSON.stringify({ name, phone: customerPhone })
    );
  };

  const setCustomerPhone = (phone: string) => {
    setCustomerPhoneState(phone);
    localStorage.setItem(
      LOCAL_STORAGE_CUSTOMER_KEY,
      JSON.stringify({ name: customerName, phone })
    );
  };

  // Appointments state with LocalStorage persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading appointments from localStorage', e);
    }
    return sampleAppointments;
  });

  // Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persist appointments to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_APPOINTMENTS_KEY,
        JSON.stringify(appointments)
      );
    } catch (e) {
      console.error('Error saving appointments to localStorage', e);
    }
  }, [appointments]);

  // Appointment Actions
  const addAppointment = async (
    appointmentData: Omit<Appointment, 'id' | 'createdAt'>
  ): Promise<Appointment> => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = async (appointmentId: string): Promise<boolean> => {
    setAppointments((prev) =>
      prev.map((app) => {
        if (app.id === appointmentId) {
          return {
            ...app,
            status: 'Cancelado' as AppointmentStatus,
            cancelledAt: new Date().toISOString(),
          };
        }
        return app;
      })
    );
    addToast('Agendamento cancelado com sucesso.', 'info');
    return true;
  };

  const rescheduleAppointment = async (
    appointmentId: string,
    newDate: string,
    newStartTime: string,
    newEndTime: string,
    newBarberId: string,
    newBarberName: string
  ): Promise<boolean> => {
    setAppointments((prev) =>
      prev.map((app) => {
        if (app.id === appointmentId) {
          const historyItem = {
            previousDate: app.date,
            previousTime: app.startTime,
            changedAt: new Date().toISOString(),
          };
          const updatedHistory = [...(app.rescheduleHistory || []), historyItem];
          return {
            ...app,
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            barberId: newBarberId,
            barberName: newBarberName,
            status: 'Agendado' as AppointmentStatus,
            updatedAt: new Date().toISOString(),
            rescheduleHistory: updatedHistory,
          };
        }
        return app;
      })
    );
    addToast('Agendamento reagendado com sucesso!', 'success');
    return true;
  };

  const updateAppointmentServices = async (
    appointmentId: string,
    newServices: AppointmentService[],
    newTotalPrice: number,
    newTotalDuration: number,
    isCombo: boolean
  ): Promise<boolean> => {
    setAppointments((prev) =>
      prev.map((app) => {
        if (app.id === appointmentId) {
          return {
            ...app,
            services: newServices,
            totalPrice: newTotalPrice,
            totalDuration: newTotalDuration,
            isCombo,
            updatedAt: new Date().toISOString(),
          };
        }
        return app;
      })
    );
    addToast('Serviços do agendamento atualizados.', 'success');
    return true;
  };

  const deleteAppointment = async (appointmentId: string): Promise<boolean> => {
    setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
    addToast('Agendamento removido do histórico.', 'info');
    return true;
  };

  const clearHistory = async (): Promise<boolean> => {
    const today = new Date().toISOString().split('T')[0];
    setAppointments((prev) =>
      prev.filter((app) => app.status !== 'Cancelado' && app.status !== 'Concluído' && app.date >= today)
    );
    addToast('Histórico de agendamentos excluído com sucesso.', 'success');
    return true;
  };

  const toggleLikePost = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        barbershopInfo,
        barbers,
        services,
        feedPosts,
        appointments,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        isLoggedIn,
        currentUser,
        login,
        registerUser,
        logout,
        updateProfile,
        selectedBarberForBooking,
        setSelectedBarberForBooking,
        addAppointment,
        cancelAppointment,
        rescheduleAppointment,
        updateAppointmentServices,
        deleteAppointment,
        clearHistory,
        toggleLikePost,
        toasts,
        addToast,
        removeToast,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
