import { Barber, ServiceItem, FeedPost, BarbershopInfo, Appointment } from '../types';

export const initialBarbershopInfo: BarbershopInfo = {
  name: 'BARBA10',
  slogan: 'Seu estilo, seu momento.',
  description: 'A Barbearia BARBA10 oferece uma experiência premium em cortes modernos, barbas desenhadas e tratamento masculino completo. Espaço exclusivo com ambiente climatizado, atendimento com horário marcado e profissionais altamente qualificados.',
  address: 'Avenida Principal, 1000 - Centro',
  neighborhood: 'Centro',
  city: 'São Paulo - SP',
  phone: '(11) 99999-1010',
  whatsapp: '5511999991010',
  instagram: '@barbeariabarba10',
  hours: {
    weekdays: 'Segunda a Sexta: 08:00 às 20:00',
    saturday: 'Sábado: 08:00 às 19:00',
    sunday: 'Domingo: Fechado',
  },
  googleMapsUrl: 'https://maps.google.com/?q=Barbearia+BARBA10',
};

export const initialBarbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'João Silva',
    role: 'Master Barber & Visagista',
    photo: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=500&auto=format&fit=crop&q=80',
    specialties: ['Degradê Navalhado', 'Barba Terapia', 'Visagismo Masculino'],
    description: 'Especialista em cortes modernos com mais de 8 anos de experiência. Mestre em transição de corte e alinhamento de barba.',
    rating: 4.9,
    reviewsCount: 142,
    status: 'available',
    workingHours: { start: '08:00', end: '20:00' },
    lunchBreak: { start: '12:00', end: '13:00' }, // João lunch: 12:00 to 13:00
    workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
  },
  {
    id: 'barber-2',
    name: 'Pedro Santos',
    role: 'Especialista em Barba & Pigmentação',
    photo: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=80',
    specialties: ['Barba Esculpida', 'Pigmentação de Barba', 'Corte Social'],
    description: 'Referência em barboterapia e tratamentos de pele. Alinha tradição e precisão para um acabamento impecável.',
    rating: 4.8,
    reviewsCount: 118,
    status: 'available',
    workingHours: { start: '08:00', end: '20:00' },
    lunchBreak: { start: '13:00', end: '14:00' }, // Pedro lunch: 13:00 to 14:00
    workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
  },
  {
    id: 'barber-3',
    name: 'Carlos Eduardo',
    role: 'Estilista Capilar & Freestyle',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
    specialties: ['Freestyle Hair', 'Corte Freestyle', 'Desenho na Navalha'],
    description: 'Criativo e inovador. Especializado em riscos, artes na navalha e cortes no estilo urbano contemporâneo.',
    rating: 4.9,
    reviewsCount: 96,
    status: 'available',
    workingHours: { start: '09:00', end: '20:00' },
    lunchBreak: { start: '14:00', end: '15:00' }, // Carlos lunch: 14:00 to 15:00
    workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
  },
  {
    id: 'barber-4',
    name: 'Lucas Mendes',
    role: 'Barbeiro Clássico',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    specialties: ['Corte Clássico Tesoura', 'Sobrancelha', 'Tratamento Capilar'],
    description: 'Atendimento calmo e atencioso. Especializado em cortes clássicos na tesoura e harmonização de sobrancelha.',
    rating: 4.7,
    reviewsCount: 84,
    status: 'available',
    workingHours: { start: '08:00', end: '19:00' },
    lunchBreak: { start: '12:30', end: '13:30' }, // Lucas lunch: 12:30 to 13:30
    workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
  },
];

export const initialServices: ServiceItem[] = [
  // Individual Services
  {
    id: 'serv-corte',
    name: 'Corte de Cabelo',
    price: 35.0,
    durationMinutes: 30,
    description: 'Corte moderno ou clássico com lavagem e finalização com pomada e secador.',
    category: 'individual',
    popular: true,
  },
  {
    id: 'serv-barba',
    name: 'Barba Terapia',
    price: 25.0,
    durationMinutes: 30,
    description: 'Modelagem de barba com toalha quente, óleo hidratante, massagem facial e navalha.',
    category: 'individual',
    popular: true,
  },
  {
    id: 'serv-sobrancelha',
    name: 'Design de Sobrancelha',
    price: 15.0,
    durationMinutes: 15,
    description: 'Limpeza e alinhamento do contorno da sobrancelha masculina na navalha.',
    category: 'individual',
  },
  {
    id: 'serv-pigmentacao',
    name: 'Pigmentação de Barba',
    price: 30.0,
    durationMinutes: 30,
    description: 'Preenchimento de falhas e realce da barba com tinta especial e duradoura.',
    category: 'individual',
  },
  {
    id: 'serv-hidratacao',
    name: 'Hidratação Capilar',
    price: 25.0,
    durationMinutes: 20,
    description: 'Tratamento profundo para fios secos e danificados, devolvendo brilho e maciez.',
    category: 'individual',
  },
  {
    id: 'serv-pezinho',
    name: 'Pezinho e Acabamento',
    price: 15.0,
    durationMinutes: 15,
    description: 'Manutenção rápida dos contornos do cabelo, nuca e costeiras.',
    category: 'individual',
  },

  // Combos
  {
    id: 'combo-corte-barba',
    name: 'Combo Corte + Barba',
    price: 50.0,
    durationMinutes: 50,
    description: 'Corte completo + Barboterapia com toalha quente e finalização. Economize R$10.',
    category: 'combo',
    popular: true,
    includedServiceIds: ['serv-corte', 'serv-barba'],
  },
  {
    id: 'combo-vip',
    name: 'Combo VIP Completo',
    price: 60.0,
    durationMinutes: 60,
    description: 'Corte + Barba Terapia + Design de Sobrancelha. O visual completo BARBA10.',
    category: 'combo',
    popular: true,
    includedServiceIds: ['serv-corte', 'serv-barba', 'serv-sobrancelha'],
  },
  {
    id: 'combo-master',
    name: 'Combo Master Pigmentação',
    price: 80.0,
    durationMinutes: 75,
    description: 'Corte + Barba + Pigmentação da barba + Sobrancelha de brinde.',
    category: 'combo',
    includedServiceIds: ['serv-corte', 'serv-barba', 'serv-pigmentacao', 'serv-sobrancelha'],
  },
];

export const initialFeedPosts: FeedPost[] = [
  {
    id: 'post-1',
    title: 'Estilos de Barba para 2026: Descubra o Seu',
    category: 'Tendências',
    content: 'O estilo degradê na barba e o contorno bem definido continuam em alta nesta temporada. Agende sua barboterapia e renove seu visual com os nossos mestres.',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=600&auto=format&fit=crop&q=80',
    date: 'Hoje',
    likesCount: 34,
    author: 'Equipe BARBA10',
  },
  {
    id: 'post-2',
    title: 'Promoção de Terça a Quinta: Combo VIP com Desconto',
    category: 'Campanha',
    content: 'Aproveite o Combo VIP (Corte + Barba + Sobrancelha) com atendimento exclusivo nos dias de menor movimento. Garanta seu horário pelo aplicativo.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
    date: 'Ontem',
    likesCount: 52,
    author: 'Barbearia BARBA10',
  },
  {
    id: 'post-3',
    title: 'Importância da Hidratação na Barboterapia',
    category: 'Cuidados',
    content: 'Usar óleo e balm diariamente previne a irritação da pele sob os fios e deixa a barba alinhada e macia durante todo o dia.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80',
    date: 'Há 3 dias',
    likesCount: 28,
    author: 'Pedro Santos',
  },
];

// Sample existing appointment for demo/history
export const sampleAppointments: Appointment[] = [
  {
    id: 'app-demo-1',
    customerId: 'cust-demo',
    customerName: 'Cliente Exemplo',
    customerPhone: '(11) 98888-7777',
    barberId: 'barber-1',
    barberName: 'João Silva',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '10:50',
    services: [
      { id: 'combo-corte-barba', name: 'Combo Corte + Barba', price: 50.0, durationMinutes: 50 }
    ],
    isCombo: true,
    totalDuration: 50,
    totalPrice: 50.0,
    status: 'Confirmado',
    createdAt: new Date().toISOString(),
  }
];
