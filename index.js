const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = (template, data) => {
    let output = template
        .replace(/{%PRODUCT_NAME%}/g, data.productName)
        .replace(/{%PRODUCT_IMAGE%}/g, data.image)
        .replace(/{%PRODUCT_PRICE%}/g, data.price)
        .replace(/{%PRODUCT_FROM%}/g, data.from)
        .replace(/{%PRODUCT_HEALTH%}/g, data.nutrients)
        .replace(/{%PRODUCT_QUANTITY%}/g, data.quantity)
        .replace(/{%PRODUCT_DESCRIPTION%}/g, data.description)
        .replace(/{%PRODUCT_ID%}/g, data.id);

    if (!data.organic) {
        output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
};

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const productsData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const parsedData = JSON.parse(productsData);

const server = http.createServer((req, res) => {
    const path = req.url;

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