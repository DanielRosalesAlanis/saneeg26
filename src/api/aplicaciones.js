const STORAGE_KEY = 'saneeg_aplicacion';

async function request(path, options) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error del servidor (${res.status})`);
  }
  return res.json();
}

export function iniciarAplicacion(phone) {
  return request('/api/aplicaciones', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

export function guardarBloque(aplicacionId, bloque, respuestas) {
  return request(`/api/aplicaciones/${aplicacionId}/bloques/${bloque}`, {
    method: 'PATCH',
    body: JSON.stringify({ respuestas }),
  });
}

export function obtenerEstado(aplicacionId) {
  return request(`/api/aplicaciones/${aplicacionId}`, { method: 'GET' });
}

export function saveProgress(aplicacionId, phone) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ aplicacionId, phone }));
}

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
