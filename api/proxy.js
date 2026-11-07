// api/proxy.js — Vercel serverless CORS proxy for the Tube Grab app.
// Usage: /api/proxy?url=<encoded target url>
// Returns the target response body with permissive CORS headers.

module.exports = async (req, res) => {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const target = req.query && req.query.url;
  if (!target) {
    res.status(400).json({ error: 'missing ?url=' });
    return;
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    res.status(400).json({ error: 'invalid url' });
    return;
  }

  // Only allow the YouTube download API host (avoid an open proxy / SSRF).
  const ALLOWED_HOSTS = ['you-tube-dl-psi.vercel.app'];
  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    res.status(403).json({ error: 'host not allowed' });
    return;
  }

  try {
    const upstream = await fetch(target, {
      method: 'GET',
      headers: { 'User-Agent': 'TubeGrab/1.0' },
    });

    const contentType = upstream.headers.get('content-type') || '';
    const isBinary = /audio|video|octet-stream|mpeg|mp4/i.test(contentType);

    res.status(upstream.status);
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (isBinary) {
      // Stream binary media
      const ab = await upstream.arrayBuffer();
      res.setHeader('Content-Length', ab.byteLength);
      res.send(Buffer.from(ab));
    } else {
      const text = await upstream.text();
      res.send(text);
    }
  } catch (err) {
    res.status(502).json({ error: 'upstream fetch failed', detail: String(err) });
  }
};