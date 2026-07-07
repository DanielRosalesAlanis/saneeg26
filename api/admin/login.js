import { checkCredentials, createSessionCookie } from '../../lib/adminAuth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email y password son requeridos' });
  }

  if (!checkCredentials(email, password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  res.setHeader('Set-Cookie', createSessionCookie(email));
  res.status(200).json({ ok: true });
}
