/* Trazo fino, estilo Lucide — sin emojis */
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ size = 20, style, children, ...rest }) {
  return (
    <svg {...base} width={size} height={size} style={style} {...rest}>
      {children}
    </svg>
  );
}

export const IconChevronLeft = (p) => (
  <Svg {...p}><path d="M15 18l-6-6 6-6" /></Svg>
);

export const IconChevronDown = (p) => (
  <Svg {...p}><path d="M6 9l6 6 6-6" /></Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}><path d="M20 6L9 17l-5-5" /></Svg>
);

export const IconCheckCircle = (p) => (
  <Svg {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </Svg>
);

export const IconLock = (p) => (
  <Svg {...p}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" />
  </Svg>
);

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </Svg>
);

export const IconMessage = (p) => (
  <Svg {...p}>
    <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H8l-5 2 1.5-4.5A8.5 8.5 0 1 1 21 11.5z" />
  </Svg>
);

export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const IconEyeOff = (p) => (
  <Svg {...p}>
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.6 18.6 0 0 1 5-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </Svg>
);

export const IconAlertTriangle = (p) => (
  <Svg {...p}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4M12 17h.01" />
  </Svg>
);

export const IconInfo = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-5M12 8h.01" />
  </Svg>
);

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Svg>
);

export const IconMapPin = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

export const IconWalk = (p) => (
  <Svg {...p}>
    <circle cx="13" cy="4" r="1.5" />
    <path d="M10 21l1-6-2-2 1-5 3-1 3 3 3 1M9 15l-3 2v4" />
  </Svg>
);

export const IconStar = ({ filled, ...p }) => (
  <Svg {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </Svg>
);

export const IconStethoscope = (p) => (
  <Svg {...p}>
    <path d="M4.8 2.3A.3.3 0 1 0 5.4 2 .3.3 0 0 0 4.8 2.3z" />
    <path d="M8 2v6a5 5 0 0 0 10 0V2M11 19a5 5 0 0 0 5-5v-2M4 2v6a5 5 0 0 0 5 5" />
    <circle cx="20" cy="10" r="2" />
  </Svg>
);

export const IconUser = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
  </Svg>
);

export const IconHeart = (p) => (
  <Svg {...p}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </Svg>
);

export const IconUsers = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c1.1-3.6 3.7-5.3 6.5-5.3s5.4 1.7 6.5 5.3" />
    <circle cx="17" cy="8.5" r="2.6" />
    <path d="M15.5 14.8c1.7.4 3.1 1.7 4 4.2" />
  </Svg>
);

export const IconBrain = (p) => (
  <Svg {...p}>
    <path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5v.2A3.5 3.5 0 0 0 4 10v.5A3.5 3.5 0 0 0 6 14v1a3.5 3.5 0 0 0 3.5 3.5" />
    <path d="M14.5 3a3.5 3.5 0 0 1 3.5 3.5v.2a3.5 3.5 0 0 1 2 3.3v.5a3.5 3.5 0 0 1-2 3.5v1a3.5 3.5 0 0 1-3.5 3.5" />
    <path d="M9.5 3v15.5M14.5 3v15.5" />
  </Svg>
);

export const IconSmile = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 13.5s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </Svg>
);

export const IconFrown = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 15.5s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01" />
  </Svg>
);

export const IconPlus = (p) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
  </Svg>
);
