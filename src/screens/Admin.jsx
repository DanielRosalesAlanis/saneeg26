import { useState, useEffect } from 'react';
import { C } from '../constants/colors';

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
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
      <form onSubmit={handleSubmit} style={{
        width: 340, background: C.white, borderRadius: 16, padding: 32,
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

function RegistrosTable({ registros, onLogout }) {
  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>Registros ({registros.length})</h1>
        <button
          onClick={onLogout}
          style={{ padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${C.border}`, background: 'none', cursor: 'pointer', fontWeight: 600, color: C.muted }}
        >
          Cerrar sesión
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.navyLight, textAlign: 'left' }}>
              {['ID', 'Teléfono', 'Fecha', 'Depresión', 'Ansiedad', 'Estrés', 'Bloques guardados'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 700, color: C.navy }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros.map(r => (
              <tr key={r.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: '10px 12px' }}>{r.id}</td>
                <td style={{ padding: '10px 12px' }}>{r.phone}</td>
                <td style={{ padding: '10px 12px' }}>{new Date(r.created_at).toLocaleString('es-MX')}</td>
                <td style={{ padding: '10px 12px' }}>{r.dass ? `${r.dass.depresion_score} (${r.dass.depresion_severidad})` : '—'}</td>
                <td style={{ padding: '10px 12px' }}>{r.dass ? `${r.dass.ansiedad_score} (${r.dass.ansiedad_severidad})` : '—'}</td>
                <td style={{ padding: '10px 12px' }}>{r.dass ? `${r.dass.estres_score} (${r.dass.estres_severidad})` : '—'}</td>
                <td style={{ padding: '10px 12px' }}>{r.respuestas.map(b => b.bloque).sort().join(', ') || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;
  return <RegistrosTable registros={registros} onLogout={handleLogout} />;
}
