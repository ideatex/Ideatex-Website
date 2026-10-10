const fs = require('fs');
const path = require('path');

// Check deploy folder contents
const deployDir = path.resolve(__dirname, '..', 'cpanel-deploy');
console.log('Deploy folder contents:');
console.log(fs.readdirSync(deployDir));

console.log('.next in deploy folder:');
console.log(fs.readdirSync(path.join(deployDir, '.next')));

console.log('.next/static in deploy folder:');
console.log(fs.readdirSync(path.join(deployDir, '.next', 'static')));

console.log('public in deploy folder:');
console.log(fs.readdirSync(path.join(deployDir, 'public')));

console.log('data in deploy folder:');
console.log(fs.readdirSync(path.join(deployDir, 'data')));
