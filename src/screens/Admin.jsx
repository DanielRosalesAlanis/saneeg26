import { useState, useEffect } from 'react';
import { C } from '../constants/colors';
import { B1, DASS, B3 } from '../constants/questions';
import { IconSearch } from '../components/Icons';

const QUESTION_TEXT = Object.fromEntries(
  [...B1, ...DASS, ...B3].map(q => [q.id, q.text])
);

const BLOQUE_LABELS = { 1: 'Bloque 1 — Personal', 2: 'Bloque 2 — DASS-21', 3: 'Bloque 3 — Demográfico' };

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Credenciales inválidas');
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100%', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: 20 }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%', maxWidth: 340, background: C.white, borderRadius: 16, padding: 'clamp(20px, 6vw, 32px)',
        boxShadow: '0 10px 30px rgba(0,32,96,0.12)', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 6 }}>Acceso administrador</h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14 }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14 }}
        />

        {error && <p style={{ color: C.error, fontSize: 13 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 14px', borderRadius: 9999, border: 'none',
            background: C.navy, color: C.white, fontWeight: 700, fontSize: 15,
            cursor: 'pointer', opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

function RespuestasModal({ registro, onClose }) {
  const bloques = [...registro.respuestas].sort((a, b) => a.bloque - b.bloque);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,32,96,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '85vh',
          overflowY: 'auto', padding: 'clamp(16px, 5vw, 24px)', boxShadow: '0 20px 50px rgba(0,32,96,0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>Respuestas de {registro.phone}</h2>
            <p style={{ fontSize: 12, color: C.muted }}>{new Date(registro.created_at).toLocaleString('es-MX')}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: C.muted, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {bloques.length === 0 && (
          <p style={{ fontSize: 14, color: C.muted }}>Este usuario no tiene respuestas guardadas.</p>
        )}

        {bloques.map(b => (
          <div key={b.bloque} style={{ marginBottom: 20 }}>
            <h3 style={{
              fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase',
              letterSpacing: '0.4px', marginBottom: 10, opacity: 0.7,
            }}>
              {BLOQUE_LABELS[b.bloque] ?? `Bloque ${b.bloque}`}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(b.respuestas).map(([id, value]) => (
                <div key={id} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>
                  <p style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>
                    {QUESTION_TEXT[id] ?? id}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegistrosTable({ registros, onLogout }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = registros.filter(r =>
    r.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
  );

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 24px)', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 800, color: C.navy }}>Registros ({filtered.length})</h1>
        <button
          onClick={onLogout}
          style={{ padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${C.border}`, background: 'none', cursor: 'pointer', fontWeight: 600, color: C.muted, flexShrink: 0 }}
        >
          Cerrar sesión
        </button>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '10px 14px',
        marginBottom: 16, maxWidth: 320, background: C.white,
      }}>
        <span style={{ display: 'flex', color: C.muted, flexShrink: 0 }}><IconSearch size={16} /></span>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Buscar por teléfono..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ border: 'none', outline: 'none', fontSize: 14, width: '100%', color: C.navy, background: 'transparent' }}
        />
      </div>

      <div className="scroll-box" style={{ overflowX: 'auto', borderRadius: 12, border: `1px solid ${C.border}` }}>
        <table style={{ width: '100%', minWidth: 680, borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.navyLight, textAlign: 'left' }}>
              {['ID', 'Teléfono', 'Fecha', 'Depresión', 'Ansiedad', 'Estrés', 'Respuestas'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 700, color: C.navy, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '16px 12px', textAlign: 'center', color: C.muted }}>
                  No se encontraron registros con ese teléfono.
                </td>
              </tr>
            )}
            {filtered.map(r => (
              <tr key={r.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: '10px 12px' }}>{r.id}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{r.phone}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{new Date(r.created_at).toLocaleString('es-MX')}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{r.dass ? `${r.dass.depresion_score} (${r.dass.depresion_severidad})` : '—'}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{r.dass ? `${r.dass.ansiedad_score} (${r.dass.ansiedad_severidad})` : '—'}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{r.dass ? `${r.dass.estres_score} (${r.dass.estres_severidad})` : '—'}</td>
                <td style={{ padding: '10px 12px' }}>
                  <button
                    onClick={() => setSelected(r)}
                    disabled={r.respuestas.length === 0}
                    style={{
                      padding: '6px 12px', borderRadius: 8, border: `1.5px solid ${C.navy}`,
                      background: 'none', color: C.navy, fontWeight: 600, fontSize: 12,
                      cursor: r.respuestas.length === 0 ? 'not-allowed' : 'pointer',
                      opacity: r.respuestas.length === 0 ? 0.4 : 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Ver respuestas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <RespuestasModal registro={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export function Admin() {
  const [authed, setAuthed] = useState(null); // null = checking, true/false = known
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetch('/api/admin/me')
      .then(r => r.json())
      .then(d => setAuthed(d.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) {
      fetch('/api/admin/registros')
        .then(r => r.json())
        .then(setRegistros)
        .catch(() => setRegistros([]));
    }
  }, [authed]);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
  }

  if (authed === null) return null;

  return (
    <div className="scroll-box" style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
      {!authed
        ? <LoginForm onSuccess={() => setAuthed(true)} />
        : <RegistrosTable registros={registros} onLogout={handleLogout} />}
    </div>
  );
}
