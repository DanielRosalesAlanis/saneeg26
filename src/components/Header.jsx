import { C } from '../constants/colors';
import { Logo } from './Logo';
import { IconChevronLeft } from './Icons';

export function Header({ progress, onBack }) {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: '20px 24px 14px',
        background: C.white,
        borderBottom: `1px solid ${C.navyLight}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Regresar"
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 8px 4px 0',
              cursor: 'pointer',
              color: C.navy,
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              opacity: 0.75,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
          >
            <IconChevronLeft size={22} />
          </button>
        )}
        <Logo size={20} />
      </div>

      {progress !== undefined && (
        <div
          style={{
            marginTop: 12,
            height: 3,
            borderRadius: 2,
            background: C.navyLight,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: C.navy,
              borderRadius: 2,
              transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </div>
      )}
    </div>
  );
}
