const http = require('http');
const url = require('url');
const fs = require('fs');

const productsData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const server = http.createServer((req, res) => {
    const path = req.url;

    if (path === '/' || path === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Home Page</h1>')
    } else if (path === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Product Page</h1>');
    } else if (path === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(productsData);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>404, page not found!</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to req');
});