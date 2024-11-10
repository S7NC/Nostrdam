// middleware/lnurlp-logger.global.ts
export default defineEventHandler((event) => {
  const { req } = event.node;
  if (req.url?.startsWith('/.well-known/lnurlp/')) {
    console.log(`Route accessed: ${req.url}`);
  }
});
