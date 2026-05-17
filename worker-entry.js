// Worker entry point that wraps static assets and adds COOP/COEP headers
// required for SharedArrayBuffer / WASM threading to work.
export default {
  async fetch(request, env, ctx) {
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
    newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
};
