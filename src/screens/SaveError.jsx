import { C } from '../constants/colors';
import { ActionButton } from '../components/ActionButton';
import { IconAlertTriangle } from '../components/Icons';

export function SaveError({ message, onRetry, onBack }) {
  return (
    <div className="anim-fadeup" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, minHeight: 0, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: '#FEF2F2', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: C.error, marginBottom: 20,
        }}>
          <IconAlertTriangle size={28} />
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 8 }}>
          No se pudo guardar
        </h1>
        <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.65, maxWidth: 300, marginBottom: 6 }}>
          Hubo un problema de conexión con el servidor. Tus respuestas siguen aquí, nada se perdió.
        </p>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{message}</p>

        <span
          onClick={onBack}
          style={{ fontSize: 14, color: C.muted, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Volver
        </span>
      </div>

      <ActionButton label="Reintentar" onClick={onRetry} />
    </div>
  );
}
