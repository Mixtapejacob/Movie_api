const url = require('url');
let addr = 'http://localhost:8080/default.html?year=2017&month=february';
let q = new URL(addr,  'http://localhost:8080');


const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');