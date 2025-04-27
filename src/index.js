import { createServer } from "http";
import fs from "fs";
import path from "path";

const MIMETYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
};
const publicDir = path.join(process.cwd(), "public");
const clientDir = path.join(process.cwd(), "client");
const server = createServer((req, res) => {
  // server files
  const requestedPath = req.url === '/' ? '/index.html' : req.url;
  const [_, clientPath] = req.url.split("/client");
  const dir = clientPath ? clientDir: publicDir;
  const target = clientPath ? clientPath === "/" ? "index.js": clientPath : requestedPath;
  const filePath = path.join(dir, target);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) res.writeHead(404), res.end('Not Found');
    else res.writeHead(200, { 'Content-Type': MIMETYPES[ext] || 'text/plain' }), res.end(data);
  });
});
server.listen(6565, () => console.log("WEEP http://localhost:6565"));