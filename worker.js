// Relais du Décodeur Reddit B64 (Cloudflare Worker).
// Lit reddit.com et paste.sh à la place du navigateur et ajoute les en-têtes CORS.
// Limité à ces deux sites pour ne pas servir de proxy ouvert.

const ALLOWED = /^(?:(?:www|old|new)\.)?reddit\.com$|^paste\.sh$/i;
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Expose-Headers': 'Content-Type, ETag, Retry-After, X-Final-URL',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'GET') return new Response('Méthode non autorisée', { status: 405, headers: CORS });

    let target;
    try { target = new URL(new URL(request.url).searchParams.get('url')); }
    catch { return new Response('Paramètre url manquant ou invalide', { status: 400, headers: CORS }); }
    if (target.protocol !== 'https:' || !ALLOWED.test(target.hostname))
      return new Response('Site non autorisé par ce relais', { status: 403, headers: CORS });

    const upstream = await fetch(target.toString(), {
      redirect: 'follow',
      headers: { 'User-Agent': 'decodeur-b64-relay/1.0', 'Accept': request.headers.get('Accept') || '*/*' },
    });

    const headers = new Headers(CORS);
    for (const k of ['Content-Type', 'ETag', 'Retry-After']) {
      const v = upstream.headers.get(k);
      if (v) headers.set(k, v);
    }
    headers.set('X-Final-URL', upstream.url);
    return new Response(upstream.body, { status: upstream.status, headers });
  },
};
