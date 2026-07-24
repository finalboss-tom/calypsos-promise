import { createServer } from 'node:http';

const port = Number(process.env.PORT ?? 3000);
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Calypso’s Promise</title><body><main><h1>Calypso’s Promise</h1><p>Build your Living Chronicle. Improve your health. Keep the key.</p><p>Sprint 1 local workspace is running.</p></main></body></html>`;

const server = createServer((_request, response) => {
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  response.end(html);
});

server.listen(port, () => {
  console.log(`Calypso’s Promise site listening on http://localhost:${port}`);
});
