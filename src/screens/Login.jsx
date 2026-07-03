import { useState, useRef, useEffect } from 'react';
import logo from '../assets/SANEEG-LOGO.png';
import { C } from '../constants/colors';
import { ActionButton } from '../components/ActionButton';
import { IconChevronLeft, IconEye, IconEyeOff, IconAlertTriangle } from '../components/Icons';

export function Login({ onNext, onRegister }) {
  const [phone, setPhone]       = useState('');
  const [pwd,   setPwd]         = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const phoneRef = useRef(null);

  useEffect(() => { phoneRef.current?.focus(); }, []);

  const phoneOk = /^\d{10}$/.test(phone.replace(/\s|-/g, ''));
  const valid   = phoneOk && pwd.length >= 8;

  function handleNext() {
    if (!valid) return;
    // TODO: connect to backend auth API
    // For now simulate: any valid input proceeds
    onNext(phone.replace(/\s|-/g, ''));
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 10,
    border: `1.5px solid ${C.border}`,
    fontSize: 15,
    color: '#374151',
    outline: 'none',
    background: '#FFFFFF',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="anim-fadeup" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: '#FFFFFF' }}>
      <div style={{ flexShrink: 0, padding: '24px 24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onRegister}
          aria-label="Regresar"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.navy, display: 'flex', opacity: 0.7, padding: 0 }}
        ><IconChevronLeft size={22} /></button>
        <img src={logo} alt="SanEEG" style={{ height: 28, width: 'auto' }} />
      </div>

      <div style={{ flex: 1, minHeight: 0, padding: '24px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.navy, letterSpacing: '-0.5px', marginBottom: 6 }}>
            Bienvenido de nuevo
          </h1>
          <p style={{ fontSize: 15, color: '#374151' }}>Ingresa para continuar tu evaluación.</p>
        </div>

        {error && (
          <div style={{
            padding: '12px 14px', borderRadius: 10, background: '#FEF2F2',
            border: `1px solid ${C.error}33`, marginBottom: 20, display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <span style={{ color: C.error, display: 'flex', flexShrink: 0, marginTop: 1 }}><IconAlertTriangle size={16} /></span>
            <p style={{ fontSize: 14, color: C.error }}>{error}</p>
          </div>
        )}

        <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>
          Número de teléfono
        </label>
        <div style={{
          display: 'flex', alignItems: 'stretch', marginBottom: 16,
          border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', background: '#FFFFFF',
        }}>
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 12px', fontSize: 15, color: C.muted, fontWeight: 600,
            borderRight: `1.5px solid ${C.border}`, background: C.surface, flexShrink: 0,
          }}>+52</span>
          <input
            ref={phoneRef}
            type="tel"
            inputMode="numeric"
            placeholder="55 1234 5678"
            value={phone}
            onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
            style={{ ...inputStyle, flex: 1, border: 'none', borderRadius: 0 }}
          />
        </div>

        <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>
          Contraseña
        </label>
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            value={pwd}
            onChange={e => { setPwd(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: C.muted }}
          >
            {showPwd ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>

        {/* Forgot password – placeholder for future backend */}
        <div style={{ textAlign: 'right', marginBottom: 28 }}>
          <span
            onClick={() => setError('Funcionalidad disponible próximamente.')}
            style={{ fontSize: 13, color: C.navy, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            ¿Olvidaste tu contraseña?
          </span>
        </div>

        <p style={{ textAlign: 'center', fontSize: 15, color: '#374151' }}>
          ¿No tienes cuenta?{' '}
          <span
            onClick={onRegister}
            style={{ color: C.navy, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Regístrate
          </span>
        </p>
      </div>

      <ActionButton label="Ingresar" onClick={handleNext} disabled={!valid} />
    </div>
  );
}
