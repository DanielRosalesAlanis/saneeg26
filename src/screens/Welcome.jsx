import logo from '../assets/SANEEG-LOGO.png';
import { C } from '../constants/colors';
import { useEnterKey } from '../hooks/useEnterKey';

export function Welcome({ onNext }) {
  useEnterKey(onNext, false);

  return (
    <div
      className="anim-fadein"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        background: '#FFFFFF',
        padding: '48px 32px 32px',
        justifyContent: 'space-between',
      }}
    >
      {/* Top: logo + copy */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 0 }}>
        <img
          src={logo}
          alt="SanEEG"
          style={{ height: 72, width: 'auto', marginBottom: 36, userSelect: 'none' }}
        />

        <h1 style={{
          fontSize: 24,
          fontWeight: 800,
          color: C.navy,
          letterSpacing: '-0.4px',
          lineHeight: 1.3,
          marginBottom: 16,
          maxWidth: 280,
        }}>
          Bienvenido/a
        </h1>

        <p style={{
          fontSize: 15,
          color: '#374151',
          lineHeight: 1.75,
          maxWidth: 300,
        }}>
          Responde con honestidad. Este cuestionario es{' '}
          <strong style={{ color: C.navy }}>anónimo y confidencial</strong>.
          Tus resultados te ayudarán a conocer tu estado emocional actual.
        </p>
      </div>

      {/* Bottom: CTA */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          onClick={onNext}
          style={{
            width: '100%',
            maxWidth: 320,
            padding: '16px 40px',
            borderRadius: 9999,
            background: C.teal,
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.2px',
          }}
        >
          Iniciar test
        </button>
      </div>
    </div>
  );
}
