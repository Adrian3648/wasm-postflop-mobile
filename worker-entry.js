// Worker entry: inject COOP + COEP + CORP headers required for SharedArrayBuffer.
// Without CORP, nested workers fail to load with DataCloneError.
export default {
  async fetch(request, env, ctx) {
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
    newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
    newHeaders.set('Cross-Origin-Resource-Policy', 'same-origin');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
};
