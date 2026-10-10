const http = require('http');
const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';
process.chdir(path.join(__dirname, '..', '.next', 'standalone'));

// Phusion Passenger configuration
if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

const NextServer = require('next/dist/server/next-server').default;
const requiredServerFiles = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.next', 'required-server-files.json'), 'utf-8')
);
const conf = requiredServerFiles.config;

const nextServer = new NextServer({
  hostname: 'localhost',
  port: parseInt(process.env.PORT, 10) || 3005,
  dir: process.cwd(),
  dev: false,
  customServer: false,
  conf
});

const handler = nextServer.getRequestHandler();

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error('Server error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

const port = process.env.PORT || 3005;

if (typeof(PhusionPassenger) !== 'undefined') {
  server.listen('passenger');
} else {
  server.listen(port, () => {
    console.log(`Ready on port ${port}`);
  });
}
