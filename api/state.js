import { neon } from '@neondatabase/serverless'

const clientIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const allowedFields = ['bookings', 'totalWorkouts', 'weekWorkouts', 'streak', 'completedOn', 'notifications']

function sanitizeState(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  if (!Array.isArray(value.bookings) || value.bookings.length > 100) return null
  if (!value.bookings.every((booking) => typeof booking === 'string' && booking.length <= 100)) return null
  if (!['totalWorkouts', 'weekWorkouts', 'streak'].every((key) => Number.isSafeInteger(value[key]) && value[key] >= 0)) return null
  if (value.completedOn !== null && (typeof value.completedOn !== 'string' || value.completedOn.length > 10)) return null
  if (typeof value.notifications !== 'boolean') return null

  return Object.fromEntries(allowedFields.map((key) => [key, value[key]]))
}

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store')
  return res.status(status).json(body)
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT')
    return send(res, 405, { error: 'Method not allowed' })
  }

  if (!process.env.DATABASE_URL) return send(res, 503, { error: 'Database is not configured' })

  const clientId = req.method === 'GET' ? req.query?.clientId : req.body?.clientId
  if (typeof clientId !== 'string' || !clientIdPattern.test(clientId)) {
    return send(res, 400, { error: 'Invalid client id' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    if (req.method === 'GET') {
      const rows = await sql`SELECT state FROM pulsefit_app_state WHERE client_id = ${clientId}::uuid`
      return send(res, 200, { state: rows[0]?.state ?? null })
    }

    const state = sanitizeState(req.body?.state)
    if (!state) return send(res, 400, { error: 'Invalid state' })

    await sql`INSERT INTO pulsefit_app_state (client_id, state, updated_at)
      VALUES (${clientId}::uuid, ${JSON.stringify(state)}::jsonb, NOW())
      ON CONFLICT (client_id) DO UPDATE
      SET state = EXCLUDED.state, updated_at = NOW()`

    return send(res, 200, { ok: true })
  } catch (error) {
    console.error('Neon state request failed', error)
    return send(res, 500, { error: 'Database request failed' })
  }
}