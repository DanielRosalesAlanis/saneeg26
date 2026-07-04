import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const centros = await sql`SELECT * FROM centros ORDER BY id`;
    const doctores = await sql`SELECT * FROM doctores ORDER BY id`;

    const result = centros.map(centro => ({
      ...centro,
      doctores: doctores.filter(d => d.centro_id === centro.id),
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
