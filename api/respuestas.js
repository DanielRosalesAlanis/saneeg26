import { neon } from '@neondatabase/serverless';
import { scoreDASS } from '../src/constants/questions.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, answers } = req.body ?? {};
  if (!phone || !answers) {
    return res.status(400).json({ error: 'phone y answers son requeridos' });
  }

  const b1 = {};
  const dass = {};
  const b3 = {};
  for (const [key, value] of Object.entries(answers)) {
    if (key.startsWith('b1_')) b1[key] = value;
    else if (key.startsWith('dass_')) dass[key] = value;
    else if (key.startsWith('b3_')) b3[key] = value;
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const [usuario] = await sql`
      INSERT INTO usuarios (phone)
      VALUES (${phone})
      ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone
      RETURNING id
    `;
    const usuarioId = usuario.id;

    await sql`
      INSERT INTO respuestas (usuario_id, bloque, respuestas)
      VALUES
        (${usuarioId}, 1, ${JSON.stringify(b1)}::jsonb),
        (${usuarioId}, 2, ${JSON.stringify(dass)}::jsonb),
        (${usuarioId}, 3, ${JSON.stringify(b3)}::jsonb)
      ON CONFLICT (usuario_id, bloque)
      DO UPDATE SET respuestas = EXCLUDED.respuestas, created_at = now()
    `;

    const { d, sevD, a, sevA, s, sevS } = scoreDASS(dass);

    await sql`
      INSERT INTO resultados_dass (
        usuario_id, depresion_score, depresion_severidad,
        ansiedad_score, ansiedad_severidad, estres_score, estres_severidad
      )
      VALUES (${usuarioId}, ${d}, ${sevD}, ${a}, ${sevA}, ${s}, ${sevS})
      ON CONFLICT (usuario_id)
      DO UPDATE SET
        depresion_score = EXCLUDED.depresion_score,
        depresion_severidad = EXCLUDED.depresion_severidad,
        ansiedad_score = EXCLUDED.ansiedad_score,
        ansiedad_severidad = EXCLUDED.ansiedad_severidad,
        estres_score = EXCLUDED.estres_score,
        estres_severidad = EXCLUDED.estres_severidad,
        created_at = now()
    `;

    res.status(200).json({ usuarioId, dass: { d, sevD, a, sevA, s, sevS } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
