import { useState, useRef, useEffect } from 'react';
import logo from '../assets/SANEEG-LOGO.png';
import { C } from '../constants/colors';
import { ActionButton } from '../components/ActionButton';
import { IconChevronLeft, IconEye, IconEyeOff } from '../components/Icons';

const INPUT_STYLE = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 10,
  border: `1.5px solid ${C.border}`,
  fontSize: 15,
  color: '#374151',
  outline: 'none',
  background: '#FFFFFF',
  transition: 'border-color 0.2s',
  marginBottom: 4,
};

export function Register({ onNext, onLogin }) {
  const [phone, setPhone] = useState('');
  const [pwd,   setPwd]   = useState('');
  const [conf,  setConf]  = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [touched,  setTouched]  = useState({});
  const phoneRef = useRef(null);

  useEffect(() => { phoneRef.current?.focus(); }, []);

  const phoneOk = /^\d{10}$/.test(phone.replace(/\s|-/g, ''));
  const pwdOk   = pwd.length >= 8;
  const confOk  = pwd === conf && conf.length > 0;
  const valid   = phoneOk && pwdOk && confOk;

  const err = (field) => {
    if (!touched[field]) return null;
    if (field === 'phone' && !phoneOk)  return 'Ingresa un número de 10 dígitos';
    if (field === 'pwd'   && !pwdOk)    return 'Mínimo 8 caracteres';
    if (field === 'conf'  && !confOk)   return 'Las contraseñas no coinciden';
    return null;
  };

  const fieldStyle = (field) => ({
    ...INPUT_STYLE,
    borderColor: err(field) ? C.error : touched[field] && !err(field) ? C.teal : C.border,
  });

  function handleNext() {
    if (valid) onNext(phone.replace(/\s|-/g, ''));
  }

  return (
    <div className="anim-fadeup" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: '#FFFFFF' }}>
      <div style={{ flexShrink: 0, padding: '24px 24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onLogin}
          aria-label="Regresar"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.navy, display: 'flex', opacity: 0.7, padding: 0 }}
        ><IconChevronLeft size={22} /></button>
        <img src={logo} alt="SanEEG" style={{ height: 28, width: 'auto' }} />
      </div>

      <div style={{ flex: 1, minHeight: 0, padding: '24px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.navy, letterSpacing: '-0.5px', marginBottom: 6 }}>
            Crear tu cuenta
          </h1>
          <p style={{ fontSize: 15, color: '#374151' }}>
            Ingresa tu número y crea una contraseña segura.
          </p>
        </div>

        {/* Phone */}
        <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>
          Número de teléfono
        </label>
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex', alignItems: 'stretch',
            border: `1.5px solid ${fieldStyle('phone').borderColor}`, borderRadius: 10,
            overflow: 'hidden', background: '#FFFFFF', transition: 'border-color 0.2s',
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
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              onBlur={() => setTouched(t => ({ ...t, phone: true }))}
              style={{ ...fieldStyle('phone'), flex: 1, border: 'none', borderRadius: 0, marginBottom: 0 }}
            />
          </div>
          {err('phone') && (
            <p style={{ color: C.error, fontSize: 12, marginTop: 4 }}>{err('phone')}</p>
          )}
        </div>

        {/* Password */}
        <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>
          Contraseña
        </label>
        <div style={{ position: 'relative', marginBottom: 4 }}>
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="Mínimo 8 caracteres"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, pwd: true }))}
            style={fieldStyle('pwd')}
          />
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: C.muted }}
            aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPwd ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>
        {err('pwd') && <p style={{ color: C.error, fontSize: 12, marginBottom: 4 }}>{err('pwd')}</p>}

        {/* Password strength bar */}
        {pwd.length > 0 && (
          <div style={{ marginBottom: 16, marginTop: 6 }}>
            <div style={{ height: 4, borderRadius: 2, background: C.navyLight, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2, transition: 'width 0.3s, background 0.3s',
                width: pwd.length < 6 ? '30%' : pwd.length < 10 ? '65%' : '100%',
                background: pwd.length < 6 ? C.error : pwd.length < 10 ? C.warn : C.success,
              }} />
            </div>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>
              {pwd.length < 6 ? 'Débil' : pwd.length < 10 ? 'Aceptable' : 'Fuerte'}
            </p>
          </div>
        )}

        {/* Confirm */}
        <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>
          Confirmar contraseña
        </label>
        <div style={{ position: 'relative', marginBottom: 4 }}>
          <input
            type={showConf ? 'text' : 'password'}
            placeholder="Repite tu contraseña"
            value={conf}
            onChange={e => setConf(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, conf: true }))}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
            style={fieldStyle('conf')}
          />
          <button
            type="button"
            onClick={() => setShowConf(v => !v)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: C.muted }}
            aria-label={showConf ? 'Ocultar' : 'Mostrar'}
          >
            {showConf ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>
        {err('conf') && <p style={{ color: C.error, fontSize: 12, marginBottom: 4 }}>{err('conf')}</p>}

        {/* Login link */}
        <p style={{ textAlign: 'center', marginTop: 28, fontSize: 15, color: '#374151' }}>
          ¿Ya tienes cuenta?{' '}
          <span
            onClick={onLogin}
            style={{ color: C.navy, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Iniciar sesión
          </span>
        </p>
      </div>

      <ActionButton label="Crear cuenta" onClick={handleNext} disabled={!valid} />
    </div>
  );
}
