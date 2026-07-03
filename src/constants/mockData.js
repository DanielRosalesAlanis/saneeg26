// ── Líneas de Ayuda en México ─────────────────────────────────────────────────
export const HELP_LINES = [
  {
    name: 'SAPTEL',
    desc: 'Crisis emocionales, 24/7, gratuito',
    phone: '55 5259-8121',
    icon: '📞',
    color: '#002060',
  },
  {
    name: 'Línea de la Vida',
    desc: 'SSA – Salud mental y adicciones',
    phone: '800 911-2000',
    icon: '💙',
    color: '#00BCBF',
  },
  {
    name: 'CONASAMA',
    desc: 'Consejo Nacional de Salud Mental',
    phone: '800 290-0024',
    icon: '🧠',
    color: '#7C3AED',
  },
  {
    name: 'IMSS – Línea de Apoyo',
    desc: 'Orientación en salud mental',
    phone: '800 623-2323',
    icon: '🏥',
    color: '#059669',
  },
];

// ── Centros Profesionales (datos de ejemplo – conectar a backend) ─────────────
export const MOCK_CENTERS = [
  {
    id: 1,
    name: 'UTEZ Centro de Bienestar Estudiantil',
    address: 'Km. 1 Carretera Emiliano Zapata – Tlaltizapán, Morelos',
    specialty: ['Psicología', 'Orientación Educativa'],
    rating: 4.8,
    distance: '0.2 km',
    badge: 'Recomendado',
    doctors: [
      {
        id: 11,
        name: 'Dra. Ana Martínez Reyes',
        specialty: 'Psicología Clínica',
        photo: '👩‍⚕️',
        slots: ['Lun 09:00', 'Lun 11:00', 'Mié 10:00', 'Jue 15:00'],
      },
      {
        id: 12,
        name: 'Lic. Roberto Sánchez',
        specialty: 'Orientación Psicopedagógica',
        photo: '👨‍⚕️',
        slots: ['Mar 09:00', 'Mar 14:00', 'Vie 10:00'],
      },
    ],
  },
  {
    id: 2,
    name: 'Centro de Salud Mental Cuernavaca',
    address: 'Av. Plan de Ayala 123, Cuernavaca, Morelos',
    specialty: ['Psicología', 'Psiquiatría'],
    rating: 4.6,
    distance: '8.4 km',
    badge: null,
    doctors: [
      {
        id: 21,
        name: 'Dr. Carlos López Herrera',
        specialty: 'Psiquiatría',
        photo: '👨‍⚕️',
        slots: ['Mar 11:00', 'Jue 16:00', 'Vie 12:00'],
      },
      {
        id: 22,
        name: 'Dra. Sofía Torres',
        specialty: 'Psicología',
        photo: '👩‍⚕️',
        slots: ['Lun 08:00', 'Mié 14:00', 'Jue 09:00'],
      },
    ],
  },
  {
    id: 3,
    name: 'Centro Comunitario de Salud Mental',
    address: 'Calle Hidalgo 456, Emiliano Zapata, Morelos',
    specialty: ['Psicología', 'Trabajo Social', 'Terapia Familiar'],
    rating: 4.5,
    distance: '1.1 km',
    badge: 'Gratuito',
    doctors: [
      {
        id: 31,
        name: 'Dra. Patricia Flores Cruz',
        specialty: 'Terapia Familiar',
        photo: '👩‍⚕️',
        slots: ['Mié 11:00', 'Jue 13:00', 'Vie 16:00'],
      },
      {
        id: 32,
        name: 'Lic. Gabriela Vega',
        specialty: 'Trabajo Social',
        photo: '👩‍⚕️',
        slots: ['Lun 10:00', 'Mar 15:00', 'Vie 09:00'],
      },
    ],
  },
  {
    id: 4,
    name: 'Hospital General Emiliano Zapata',
    address: 'Blvd. Cuauhnáhuac s/n, Emiliano Zapata, Morelos',
    specialty: ['Psiquiatría', 'Trabajo Social'],
    rating: 4.3,
    distance: '2.5 km',
    badge: null,
    doctors: [
      {
        id: 41,
        name: 'Dr. Alejandro Méndez',
        specialty: 'Psiquiatría',
        photo: '👨‍⚕️',
        slots: ['Mar 08:00', 'Mié 10:00', 'Jue 08:00'],
      },
    ],
  },
];
