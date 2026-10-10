const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDestInStandalone = path.join(standaloneDir, '.next', 'static');
const distCpanelDir = path.join(rootDir, 'cpanel-deploy');

console.log('=== Preparing cPanel Deployment Package ===');

// 1. Ensure .next/static is copied into .next/standalone/.next/static
if (!fs.existsSync(staticDestInStandalone)) {
  fs.mkdirSync(staticDestInStandalone, { recursive: true });
}
fs.cpSync(staticSrc, staticDestInStandalone, { recursive: true });
console.log('✓ Copied .next/static into .next/standalone/.next/static');

// 2. Re-create a clean cpanel-deploy directory
if (fs.existsSync(distCpanelDir)) {
  fs.rmSync(distCpanelDir, { recursive: true, force: true });
}
fs.mkdirSync(distCpanelDir, { recursive: true });
console.log('✓ Created clean cpanel-deploy directory');

// 3. Copy .next directory (server + static) from standalone
const destNextDir = path.join(distCpanelDir, '.next');
fs.mkdirSync(destNextDir, { recursive: true });
fs.cpSync(path.join(standaloneDir, '.next'), destNextDir, { recursive: true });
console.log('✓ Copied .next (including compiled server and static assets)');

// 4. Copy public directory from root (ensures ALL latest assets and images are present)
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(distCpanelDir, 'public');
fs.mkdirSync(publicDest, { recursive: true });
fs.cpSync(publicSrc, publicDest, { recursive: true });
const uploadsDir = path.join(publicDest, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
console.log('✓ Copied public folder with all assets & ensured public/uploads');

// 5. Copy data directory from root (CMS data & seeds)
const dataSrc = path.join(rootDir, 'data');
const dataDest = path.join(distCpanelDir, 'data');
if (fs.existsSync(dataSrc)) {
  fs.mkdirSync(dataDest, { recursive: true });
  fs.cpSync(dataSrc, dataDest, { recursive: true });
  console.log('✓ Copied data folder (CMS database)');
}

// 6. Copy package.json from standalone
fs.copyFileSync(
  path.join(standaloneDir, 'package.json'),
  path.join(distCpanelDir, 'package.json')
);
console.log('✓ Copied package.json for CloudLinux npm install');

// 7. Write Passenger-compatible server.js
const serverJsContent = `const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

process.env.NODE_ENV = 'production';
process.chdir(__dirname);

// Configure Phusion Passenger for cPanel
if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

const { serveStatic } = require('next/dist/server/serve-static');
const NextServer = require('next/dist/server/next-server').default;
const requiredServerFiles = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.next', 'required-server-files.json'), 'utf-8')
);
const conf = requiredServerFiles.config;

const nextServer = new NextServer({
  hostname: 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
  dir: __dirname,
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
      const relPath = pathname.replace(/^\\/_next\\/static\\//, '');
      const filePath = path.join(__dirname, '.next', 'static', relPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        await serveStatic(req, res, filePath);
        return;
      }
    }

    // 2. Serve static files from public/
    const publicFilePath = path.join(__dirname, 'public', pathname.replace(/^\\//, ''));
    if (pathname !== '/' && fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      await serveStatic(req, res, publicFilePath);
      return;
    }

    // 3. Delegate to NextServer handler for SSR and API routes
    await handler(req, res);
  } catch (err) {
    console.error('Server request error:', err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
});

// Bind server for cPanel Phusion Passenger or standalone fallback
if (typeof(PhusionPassenger) !== 'undefined') {
  server.listen('passenger');
} else {
  server.listen(process.env.PORT || 3000, () => {
    console.log(\`Server listening on port \${process.env.PORT || 3000}\`);
  });
}
`;
fs.writeFileSync(path.join(distCpanelDir, 'server.js'), serverJsContent, 'utf-8');
console.log('✓ Created Passenger-compatible server.js');

// 8. Create app.js wrapper
const appJsContent = `// Entry point wrapper for cPanel Phusion Passenger / CloudLinux Node.js
process.env.NODE_ENV = 'production';
require('./server.js');
`;
fs.writeFileSync(path.join(distCpanelDir, 'app.js'), appJsContent, 'utf-8');
console.log('✓ Created app.js wrapper');

// 9. Create .env and .env.production (NO hardcoded PORT!)
const envContent = `# Ideatex Production Environment Configuration
NODE_ENV=production
CMS_SESSION_SECRET=ideatex-production-cms-secret-key-2026-secure

# Email / Zoho Mail Configuration (Optional - uncomment to enable enquiry notifications)
# SMTP_HOST=smtppro.zoho.in
# SMTP_PORT=465
# SMTP_USER=hello@ideatex.co.in
# SMTP_PASS=your-zoho-app-password
# SMTP_FROM="Ideate X" <hello@ideatex.co.in>
# ENQUIRY_TO_EMAIL=hello@ideatex.co.in
`;
fs.writeFileSync(path.join(distCpanelDir, '.env'), envContent, 'utf-8');
fs.writeFileSync(path.join(distCpanelDir, '.env.production'), envContent, 'utf-8');
console.log('✓ Created .env and .env.production templates');

// 10. Verify no node_modules exists in cpanel-deploy (CloudLinux symlink safety)
const nodeModulesInDeploy = path.join(distCpanelDir, 'node_modules');
if (fs.existsSync(nodeModulesInDeploy)) {
  fs.rmSync(nodeModulesInDeploy, { recursive: true, force: true });
}
console.log('✓ Ensured node_modules is excluded (CloudLinux nodeenv manages this on server)');

console.log('=== cPanel Deployment Directory Ready at:', distCpanelDir, '===');
