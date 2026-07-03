import { C } from '../constants/colors';
import { IconCheck } from './Icons';

export function OptionCard({ label, selected, onClick, multi = false }) {
  const commonProps = {
    role: multi ? 'checkbox' : 'radio',
    'aria-checked': selected,
    tabIndex: 0,
    onClick,
    onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && onClick(),
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: 52,
    marginBottom: 12,
    borderRadius: 12,
    background: selected ? C.optionSelected : C.optionBg,
    border: `1.5px solid ${selected ? C.navy : 'transparent'}`,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    boxSizing: 'border-box',
  };

  const pressHandlers = {
    onMouseDown: e => (e.currentTarget.style.transform = 'scale(0.985)'),
    onMouseUp: e => (e.currentTarget.style.transform = 'scale(1)'),
    onTouchStart: e => (e.currentTarget.style.transform = 'scale(0.985)'),
    onTouchEnd: e => (e.currentTarget.style.transform = 'scale(1)'),
  };

  if (multi) {
    return (
      <div
        {...commonProps}
        {...pressHandlers}
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 18px',
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            border: `1.5px solid ${selected ? C.navy : C.border}`,
            background: selected ? C.navy : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          {selected && (
            <span className="anim-pop" style={{ display: 'flex', color: C.white }}>
              <IconCheck size={14} strokeWidth={3} />
            </span>
          )}
        </div>

        <span
          style={{
            flex: 1,
            fontSize: 15,
            fontWeight: selected ? 600 : 400,
            color: C.navy,
            lineHeight: 1.45,
            textAlign: 'center',
          }}
        >
          {label}
        </span>

        {/* spacer to balance the checkbox so text stays visually centered */}
        <div style={{ width: 22, flexShrink: 0 }} />
      </div>
    );
  }

  return (
    <div
      {...commonProps}
      {...pressHandlers}
      style={{
        ...containerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 22px',
      }}
    >
      <span
        style={{
          fontSize: 15,
          fontWeight: selected ? 600 : 400,
          color: C.navy,
          lineHeight: 1.45,
          textAlign: 'center',
        }}
      >
        {label}
      </span>

      {selected && (
        <div
          className="anim-pop"
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: C.navy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,32,96,0.35)',
          }}
        >
          <span style={{ display: 'flex', color: C.white }}>
            <IconCheck size={12} strokeWidth={3} />
          </span>
        </div>
      )}
    </div>
  );
}
