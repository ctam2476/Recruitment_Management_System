import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(root, 'public');
const dataDir = join(root, 'data');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function safePath(base, requestPath) {
  const decoded = decodeURIComponent(requestPath.split('?')[0]);
  const full = normalize(join(base, decoded));
  return full.startsWith(base) ? full : null;
}

async function sendFile(res, path) {
  try {
    const info = await stat(path);
    if (!info.isFile()) return false;
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(await readFile(path));
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  const requestPath = req.url || '/';
  if (requestPath === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, app: 'recruitdb' }));
    return;
  }
  const dataPath = requestPath.startsWith('/data/') ? safePath(dataDir, requestPath.replace('/data', '')) : null;
  const publicPath = safePath(publicDir, requestPath === '/' ? '/index.html' : requestPath);
  if (dataPath && await sendFile(res, dataPath)) return;
  if (publicPath && await sendFile(res, publicPath)) return;
  const fallback = join(publicDir, 'index.html');
  if (requestPath.startsWith('/api/') || !(await sendFile(res, fallback))) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, '0.0.0.0', () => console.log(`RecruitDB listening on http://0.0.0.0:${port}`));
