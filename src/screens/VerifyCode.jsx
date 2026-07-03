import { useState, useRef, useEffect } from 'react';
import { C } from '../constants/colors';
import { Header } from '../components/Header';
import { ActionButton } from '../components/ActionButton';
import { IconMessage, IconShield } from '../components/Icons';

const OTP_LENGTH = 6;

export function VerifyCode({ phone, onNext, onBack }) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [sending, setSending] = useState(false);
  const refs = useRef([]);

  const valid = digits.every(d => d !== '');

  // Timer countdown
  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  function change(i, val) {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
    // Auto-submit when all filled
    if (v && i === OTP_LENGTH - 1 && next.every(d => d !== '')) {
      setTimeout(() => onNext(), 300);
    }
  }

  function keyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function paste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (text.length === OTP_LENGTH) {
      setDigits(text.split(''));
      refs.current[OTP_LENGTH - 1]?.focus();
    }
  }

  // TODO: integrate Twilio API to send OTP via SMS/WhatsApp
  async function resend() {
    if (!canResend) return;
    setSending(true);
    // await twilioService.sendOTP(phone);
    await new Promise(r => setTimeout(r, 800)); // simulate
    setSending(false);
    setCanResend(false);
    setSeconds(60);
    setDigits(Array(OTP_LENGTH).fill(''));
    refs.current[0]?.focus();
  }

  const maskedPhone = phone
    ? `+52 *** *** ${phone.slice(-4)}`
    : '';

  return (
    <div className="anim-fadeup" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Header onBack={onBack} />

      <div style={{ flex: 1, minHeight: 0, padding: '28px 24px', overflowY: 'auto' }}>
        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: C.tealLight, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: C.teal, marginBottom: 20,
        }}>
          <IconMessage size={28} />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: C.navy, letterSpacing: '-0.5px', marginBottom: 8 }}>
          Verifica tu número
        </h1>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, marginBottom: 36 }}>
          Enviamos un código de {OTP_LENGTH} dígitos a tu WhatsApp{phone ? ` al número ${maskedPhone}` : ''}.
          Ingrésalo para continuar.
        </p>

        {/* OTP boxes */}
        <div
          style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}
          onPaste={paste}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => change(i, e.target.value)}
              onKeyDown={e => keyDown(i, e)}
              style={{
                width: 48,
                height: 58,
                borderRadius: 12,
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 700,
                color: C.navy,
                border: `2px solid ${d ? C.navy : C.border}`,
                outline: 'none',
                background: d ? C.navyLight : C.white,
                transition: 'all 0.15s',
                boxShadow: d ? `0 0 0 3px ${C.teal}22` : 'none',
              }}
            />
          ))}
        </div>

        {/* Resend */}
        <div style={{ textAlign: 'center' }}>
          {canResend ? (
            <span
              onClick={resend}
              style={{
                fontSize: 15, color: C.teal, fontWeight: 700, cursor: 'pointer',
                textDecoration: 'underline', textUnderlineOffset: 3,
                opacity: sending ? 0.5 : 1,
              }}
            >
              {sending ? 'Enviando…' : 'Reenviar código'}
            </span>
          ) : (
            <p style={{ fontSize: 14, color: C.muted }}>
              Reenviar en{' '}
              <span style={{ color: C.navy, fontWeight: 700 }}>{seconds}s</span>
            </p>
          )}
        </div>

        {/* Privacy note */}
        <div style={{
          marginTop: 32, padding: '12px 14px', borderRadius: 10,
          background: C.navyLight, display: 'flex', gap: 10,
        }}>
          <span style={{ display: 'flex', color: C.navy, flexShrink: 0, marginTop: 1 }}><IconShield size={16} /></span>
          <p style={{ fontSize: 13, color: C.navy, lineHeight: 1.5 }}>
            El código es de un solo uso y expira en 10 minutos. Nunca lo compartas con nadie.
          </p>
        </div>
      </div>

      <ActionButton label="Verificar" onClick={onNext} disabled={!valid} />
    </div>
  );
}
