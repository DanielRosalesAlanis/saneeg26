import { C } from '../constants/colors';
import { Header } from '../components/Header';
import { scoreDASS } from '../constants/questions';
import { HELP_LINES } from '../constants/mockData';
import {
  IconSmile, IconFrown, IconHeart, IconUsers,
  IconPhone, IconSearch, IconAlertTriangle, IconDownload,
} from '../components/Icons';

const SEVERITY_COLORS = {
  'Normal':                { bg: '#ECFDF5', border: '#10B981', text: '#065F46' },
  'Leve':                  { bg: '#FFF7ED', border: '#F59E0B', text: '#92400E' },
  'Moderado':              { bg: '#FFF7ED', border: '#F59E0B', text: '#92400E' },
  'Severo':                { bg: '#FEF2F2', border: '#EF4444', text: '#991B1B' },
  'Extremadamente severo': { bg: '#FEF2F2', border: '#EF4444', text: '#991B1B' },
};

function getOverallMessage(sevD, sevA, sevS) {
  const critical = [sevD, sevA, sevS].some(s => s === 'Severo' || s === 'Extremadamente severo');
  const moderate = [sevD, sevA, sevS].some(s => s === 'Moderado');
  const allNormal = [sevD, sevA, sevS].every(s => s === 'Normal');

  if (allNormal) return {
    Icon: IconSmile,
    title: '¡Buen estado emocional!',
    msg: 'Tus resultados indican que actualmente te encuentras dentro de rangos normales. Sigue cuidando tu bienestar con hábitos saludables.',
    color: C.success,
  };
  if (critical) return {
    Icon: IconHeart,
    title: 'Te recomendamos buscar apoyo',
    msg: 'Tus resultados muestran niveles que ameritan atención profesional. No estás solo(a); hay profesionales disponibles para ayudarte.',
    color: C.error,
  };
  if (moderate) return {
    Icon: IconUsers,
    title: 'Considera hablar con alguien',
    msg: 'Tus resultados indican niveles moderados de estrés emocional. Un profesional de salud mental puede ayudarte a manejarlos mejor.',
    color: C.warn,
  };
  return {
    Icon: IconFrown,
    title: 'Presta atención a tu bienestar',
    msg: 'Tus resultados muestran niveles leves. Con apoyo y hábitos saludables puedes mejorar tu bienestar emocional.',
    color: C.warn,
  };
}

function ScoreCard({ label, score, severity, Icon }) {
  const style = SEVERITY_COLORS[severity] ?? SEVERITY_COLORS['Normal'];
  return (
    <div style={{
      flex: 1,
      background: style.bg,
      border: `1.5px solid ${style.border}`,
      borderRadius: 12,
      padding: '16px 10px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    }}>
      <Icon size={22} style={{ color: style.text }} />
      <p style={{ fontSize: 13, fontWeight: 700, color: style.text }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 900, color: style.text, lineHeight: 1 }}>{score}</p>
      <p style={{ fontSize: 11, fontWeight: 600, color: style.text, lineHeight: 1.3 }}>{severity}</p>
    </div>
  );
}

function downloadCSV(data, userData, scores) {
  const { d, a, s, sevD, sevA, sevS } = scores;
  const rows = [
    ['pregunta', 'respuesta'],
    ...Object.entries(data).map(([key, value]) => [key, Array.isArray(value) ? value.join(' | ') : value]),
    ['depresion_score', d], ['depresion_severidad', sevD],
    ['ansiedad_score', a], ['ansiedad_severidad', sevA],
    ['estres_score', s], ['estres_severidad', sevS],
  ];
  const csv = rows.map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a_ = document.createElement('a');
  a_.href = url;
  a_.download = `resultados_${userData?.phone || 'saneeg'}.csv`;
  a_.click();
  URL.revokeObjectURL(url);
}

export function Results({ data, userData, onProfessionals, onExit }) {
  const scores = scoreDASS(data);
  const { d, a, s, sevD, sevA, sevS } = scores;
  const { Icon, title, msg, color } = getOverallMessage(sevD, sevA, sevS);

  return (
    <div className="anim-fadeup" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Header progress={100} />

      <div style={{ flex: 1, minHeight: 0, padding: '24px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.navy, letterSpacing: '-0.5px', marginBottom: 4 }}>
          Fin del cuestionario
        </h1>
        <p style={{ fontSize: 15, color: C.muted, marginBottom: 24 }}>
          Aquí están tus resultados del DASS-21.
        </p>

        {/* Score cards */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <ScoreCard label="Depresión" score={d} severity={sevD} Icon={IconFrown} />
          <ScoreCard label="Ansiedad"  score={a} severity={sevA} Icon={IconAlertTriangle} />
          <ScoreCard label="Estrés"    score={s} severity={sevS} Icon={IconHeart} />
        </div>

        {/* Overall message */}
        <div style={{
          padding: '18px 16px',
          borderRadius: 14,
          border: `1.5px solid ${color}44`,
          background: `${color}11`,
          marginBottom: 28,
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <span style={{ color, flexShrink: 0, display: 'flex', marginTop: 2 }}>
            <Icon size={26} />
          </span>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: C.navy, marginBottom: 4 }}>{title}</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{msg}</p>
          </div>
        </div>

        {/* Descarga de resultados en CSV */}
        <button
          onClick={() => downloadCSV(data, userData, scores)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 12,
            background: '#ECFDF5',
            border: '1.5px solid #10B981',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#10B981', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0, color: C.white,
          }}>
            <IconDownload size={18} strokeWidth={2.4} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>Descargar resultados (CSV)</p>
            <p style={{ fontSize: 13, color: '#065F46', opacity: 0.8 }}>
              Guarda tus respuestas y puntuaciones en tu dispositivo
            </p>
          </div>
        </button>

        {/* Líneas de ayuda */}
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.navy, marginBottom: 14 }}>
          Líneas de apoyo en México
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {HELP_LINES.map((line, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              borderRadius: 12,
              background: C.surface,
              border: `1.5px solid ${C.border}`,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${line.color}18`, color: line.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <IconPhone size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{line.name}</p>
                <p style={{ fontSize: 13, color: C.muted }}>{line.desc}</p>
              </div>
              <a
                href={`tel:${line.phone.replace(/\s|-/g, '')}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '8px 12px', borderRadius: 10,
                  background: C.navyLight, border: 'none',
                  fontSize: 13, fontWeight: 700, color: C.navy,
                  textDecoration: 'none', flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {line.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {onProfessionals && (
            <button
              onClick={onProfessionals}
              style={{
                width: '100%', maxWidth: 320, padding: '16px 40px', borderRadius: 9999,
                background: C.teal, color: C.white,
                fontSize: 16, fontWeight: 700, border: 'none',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <IconSearch size={18} />
              Buscar citas disponibles
            </button>
          )}
          <button
            onClick={onExit}
            style={{
              width: '100%', maxWidth: 320, padding: '16px 40px', borderRadius: 9999,
              background: 'transparent', color: C.muted,
              fontSize: 16, fontWeight: 600, border: `1.5px solid ${C.border}`,
              cursor: 'pointer',
            }}
          >
            Salir del test
          </button>
        </div>
      </div>
    </div>
  );
}
