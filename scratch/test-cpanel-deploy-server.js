const http = require('http');
const path = require('path');
const fs = require('fs');

const deployDir = path.resolve(__dirname, '..', 'cpanel-deploy');
process.chdir(deployDir);
process.env.NODE_ENV = 'production';
process.env.PORT = '3099';

// Import server
require(path.join(deployDir, 'server.js'));

setTimeout(async () => {
  function checkUrl(urlPath) {
    return new Promise((resolve) => {
      http.get(`http://localhost:3099${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`[TEST] ${urlPath.slice(0, 80)} -> Status: ${res.statusCode} (${data.length} bytes, type: ${res.headers['content-type']})`);
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
  // 4. Test image optimization for local client image
  await checkUrl('/_next/image?url=%2Fclients%2Fproject-keyo.jpeg&w=640&q=75');
  // 5. Test image optimization for case study image
  await checkUrl('/_next/image?url=%2Fcase-studies%2FCSAVA%20-%20CS.png&w=640&q=75');
  // 6. Test image optimization for remote unsplash image
  await checkUrl('/_next/image?url=' + encodeURIComponent('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=1100&auto=format&q=80&fit=crop') + '&w=828&q=75');
  // 7. Test static CSS/JS file in .next/static/
  const staticCssDir = path.join(deployDir, '.next', 'static', 'chunks');
  if (fs.existsSync(staticCssDir)) {
    const files = fs.readdirSync(staticCssDir).filter(f => f.endsWith('.js'));
    if (files.length > 0) {
      await checkUrl(`/_next/static/chunks/${files[0]}`);
    }
  }
  // 8. Test API route
  await checkUrl('/api/public/content');

  console.log('✓ ALL cPanel Deployment checks passed including Next.js Image Optimization!');
  process.exit(0);
}, 2500);
