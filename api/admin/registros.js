import { neon } from '@neondatabase/serverless';
import { verifySession } from '../../lib/adminAuth.js';

export default async function handler(req, res) {
  if (!verifySession(req)) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const usuarios = await sql`SELECT id, phone, created_at FROM usuarios ORDER BY created_at DESC`;
    const respuestas = await sql`SELECT usuario_id, bloque, respuestas FROM respuestas`;
    const resultados = await sql`SELECT * FROM resultados_dass`;

    const registros = usuarios.map(u => ({
      ...u,
      respuestas: respuestas.filter(r => r.usuario_id === u.id),
      dass: resultados.find(r => r.usuario_id === u.id) ?? null,
    }));

    res.status(200).json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
