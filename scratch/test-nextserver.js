const http = require('http');
const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';
const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
process.chdir(standaloneDir);

const NextServer = require('next/dist/server/next-server').default;
const requiredServerFiles = JSON.parse(
  fs.readFileSync(path.join(standaloneDir, '.next', 'required-server-files.json'), 'utf-8')
);
const conf = requiredServerFiles.config;

const nextServer = new NextServer({
  hostname: 'localhost',
  port: 3050,
  dir: standaloneDir,
  dev: false,
  customServer: false,
  conf
});

const handler = nextServer.getRequestHandler();

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    res.statusCode = 500;
    res.end('Error');
  }
});

server.listen(3050, async () => {
  console.log('Server started on 3050');

  function checkUrl(urlPath) {
    return new Promise((resolve) => {
      http.get(`http://localhost:3050${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`Path: ${urlPath} -> Status: ${res.statusCode} (${data.length} bytes)`);
          resolve(res.statusCode);
        });
      }).on('error', (err) => {
        console.error(`Error for ${urlPath}:`, err.message);
        resolve(500);
      });
    });
  }

  await checkUrl('/');
  await checkUrl('/services');
  await checkUrl('/api/public/content');
  
  server.close(() => {
    console.log('Test completed successfully and server closed.');
    process.exit(0);
  });
});
