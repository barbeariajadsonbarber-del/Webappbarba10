export type ThemeMode = 'dark' | 'light';

export interface Barber {
  id: string;
  name: string;
  role: string;
  photo: string;
  specialties: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  status: 'available' | 'busy' | 'off';
  workingHours: {
    start: string; // e.g., '08:00'
    end: string;   // e.g., '20:00'
  };
  lunchBreak: {
    start: string; // e.g., '12:00'
    end: string;   // e.g., '13:00'
  };
  workingDays: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
  category: 'individual' | 'combo';
  popular?: boolean;
  includedServiceIds?: string[];
}

export type AppointmentStatus = 'Agendado' | 'Confirmado' | 'Concluído' | 'Cancelado';

export interface AppointmentService {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  services: AppointmentService[];
  isCombo: boolean;
  totalDuration: number; // minutes
  totalPrice: number; // R$
  status: AppointmentStatus;
  createdAt: string;
  updatedAt?: string;
  cancelledAt?: string;
  rescheduleHistory?: {
    previousDate: string;
    previousTime: string;
    changedAt: string;
  }[];
}

export interface FeedPost {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  date: string;
  likesCount: number;
  author: string;
  isLiked?: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export interface BarbershopInfo {
  name: string;
  slogan: string;
  description: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
}
