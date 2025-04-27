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
const EVENTS = {
  "/keydown": () => {
  } 
};
function serveDir(target, dir, res) {
  const targetDir = path.join(process.cwd(), dir);
  const filePath = path.join(targetDir, target);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) return console.log("not found", err);
    res.writeHead(200, { 'Content-Type': MIMETYPES[ext] || 'text/plain' }), res.end(data);
  })
}
const server = createServer((req, res) => {
  const match = req.url.match(/\/[^/]+/g);
  const [first,second] = match ?? [];
  //events
  if (first === "/event") return EVENTS[second]();
  if (first === "/client") return serveDir(req.url.split("client/")[1], "client", res);
  return serveDir(first === "/" || !first ? "index.html": first, "public", res);
});
server.listen(6565, () => console.log("WEEP http://localhost:6565"));