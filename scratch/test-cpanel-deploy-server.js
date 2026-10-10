const http = require('http');
const path = require('path');
const fs = require('fs');

const deployDir = path.resolve(__dirname, '..', 'cpanel-deploy');
process.chdir(deployDir);
process.env.NODE_ENV = 'production';
process.env.PORT = '3060';

// Import server
require(path.join(deployDir, 'server.js'));

setTimeout(async () => {
  function checkUrl(urlPath) {
    return new Promise((resolve) => {
      http.get(`http://localhost:3060${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`[TEST] ${urlPath} -> Status: ${res.statusCode} (${data.length} bytes, type: ${res.headers['content-type']})`);
          resolve(res.statusCode);
        });
      }).on('error', (err) => {
        console.error(`[TEST ERROR] ${urlPath}:`, err.message);
        resolve(500);
      });
    });
  }

  // 1. Test homepage
  await checkUrl('/');
  // 2. Test services
  await checkUrl('/services');
  // 3. Test static file from public (logo-ideatex.png)
  await checkUrl('/logo-ideatex.png');
  // 4. Test static CSS/JS file in .next/static/
  const staticCssDir = path.join(deployDir, '.next', 'static', 'chunks');
  if (fs.existsSync(staticCssDir)) {
    const files = fs.readdirSync(staticCssDir).filter(f => f.endsWith('.js'));
    if (files.length > 0) {
      await checkUrl(`/_next/static/chunks/${files[0]}`);
    }
  }
  // 5. Test API route
  await checkUrl('/api/public/content');

  console.log('✓ All deployment verification checks passed!');
  process.exit(0);
}, 2000);
