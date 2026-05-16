export async function onRequest(context) {
  const { params, env } = context;
  const path = params.path.join('/');
  const key = `audio/${path}`;

  const object = await env.PODCAST_AUDIO.get(key);

  if (!object) {
    return new Response('Not Found', { status: 404 });
  }

  const headers = new Headers();
  headers.set('Content-Type', 'audio/mpeg');
  headers.set('Cache-Control', 'public, max-age=86400');
  headers.set('Accept-Ranges', 'bytes');

  return new Response(object.body, { headers });
}
