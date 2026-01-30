/**
 * Proxy pour rediriger les appels API vers Railway
 * Utilisé par Vercel pour rediriger /api/* vers le backend Railway
 */

export default async function handler(req, res) {
  const baseUrl = (process.env.VITE_API_URL || process.env.BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');
  const path = req.url || '';
  const targetUrl = path.startsWith('http') ? path : `${baseUrl}${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
