import crypto from 'node:crypto';

const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 horas
const COOKIE_NAME = 'admin_session';

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionCookie(email) {
  const payload = base64url(JSON.stringify({ email, exp: Date.now() + SESSION_TTL_SECONDS * 1000 }));
  const signature = sign(payload);
  const token = `${payload}.${signature}`;
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  return `${COOKIE_NAME}=${token}; HttpOnly; ${isProd ? 'Secure; ' : ''}SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
}

function parseCookies(req) {
  const header = req.headers?.cookie ?? '';
  return Object.fromEntries(
    header.split(';').filter(Boolean).map(pair => {
      const [key, ...rest] = pair.trim().split('=');
      return [key, rest.join('=')];
    })
  );
}

export function verifySession(req) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }

  const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
  return data.exp > Date.now();
}

export function checkCredentials(email, password) {
  const validEmail = process.env.ADMIN_EMAIL ?? '';
  const validPassword = process.env.ADMIN_PASSWORD ?? '';

  const emailBuf = Buffer.from(email ?? '');
  const validEmailBuf = Buffer.from(validEmail);
  const emailOk = emailBuf.length === validEmailBuf.length && crypto.timingSafeEqual(emailBuf, validEmailBuf);

  const pwdBuf = Buffer.from(password ?? '');
  const validPwdBuf = Buffer.from(validPassword);
  const pwdOk = pwdBuf.length === validPwdBuf.length && crypto.timingSafeEqual(pwdBuf, validPwdBuf);

  return emailOk && pwdOk;
}
