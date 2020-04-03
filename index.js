const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const productsData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const parsedData = JSON.parse(productsData);

const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    const urlObj = url.parse(reqUrl, true);
    const path = urlObj.pathname;
    const urlQuery = urlObj.query;

    if (path === '/' || path === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardsHTML = parsedData.map(product => replaceTemplate(tempCard, product)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        res.end(output);
    } else if (path === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = parsedData[urlQuery.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
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