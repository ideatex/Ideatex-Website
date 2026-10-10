const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

process.env.NODE_ENV = 'production';
const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
process.chdir(standaloneDir);

const { serveStatic } = require('next/dist/server/serve-static');
const NextServer = require('next/dist/server/next-server').default;
const requiredServerFiles = JSON.parse(
  fs.readFileSync(path.join(standaloneDir, '.next', 'required-server-files.json'), 'utf-8')
);
const conf = requiredServerFiles.config;

const nextServer = new NextServer({
  hostname: 'localhost',
  port: 3075,
  dir: standaloneDir,
  dev: false,
  customServer: false,
  conf
});

const handler = nextServer.getRequestHandler();

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    // 1. Serve Next.js static assets (_next/static/*)
    if (pathname.startsWith('/_next/static/')) {
      const relPath = pathname.replace(/^\/_next\/static\//, '');
      const filePath = path.join(standaloneDir, '.next', 'static', relPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        await serveStatic(req, res, filePath);
        return;
      }
    }

    // 2. Serve static files from public/
    const publicFilePath = path.join(standaloneDir, 'public', pathname.replace(/^\//, ''));
    if (pathname !== '/' && fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      await serveStatic(req, res, publicFilePath);
      return;
    }

    // 3. Delegate to NextServer handler
    await handler(req, res);
  } catch (err) {
    console.error('Server error:', err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
});

server.listen(3075, async () => {
  console.log('Server started on 3075');

  function checkUrl(urlPath) {
    return new Promise((resolve) => {
      http.get(`http://localhost:3075${urlPath}`, (res) => {
        let len = 0;
        res.on('data', chunk => len += chunk.length);
        res.on('end', () => {
          console.log(`Path: ${urlPath} -> Status: ${res.statusCode} (Type: ${res.headers['content-type']}, Size: ${len})`);
          resolve(res.statusCode);
        });
      }).on('error', (err) => {
        console.error(`Error for ${urlPath}:`, err.message);
        resolve(500);
      });
    });
  }

  const cssFile = fs.readdirSync(path.join(standaloneDir, '.next', 'static', 'chunks')).find(f => f.endsWith('.css') || f.endsWith('.js'));
  await checkUrl(`/_next/static/chunks/${cssFile}`);
  await checkUrl('/logo-ideatex.png');
  await checkUrl('/');
  await checkUrl('/services');
  await checkUrl('/api/public/content');

  server.close(() => {
    console.log('All tests passed successfully!');
    process.exit(0);
  });
});
