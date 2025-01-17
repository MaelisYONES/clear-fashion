const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const products = require('./allBrands_products.json');
const db= require('./db')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

// server:  https://server-seven-chi.vercel.app
// client:  https://v2-eight-iota.vercel.app

app.options('*', cors());

app.get('/', (request, response) => {
    response.send({ 'ack': true });
});

// Pour récupérer tous les produits de notre scrapping à partir du document 
/*app.get('/products', async (request, response) => {
    let product = await db.find_by_brand(request.params.brand)
    response.send(product)
});*/

app.get('/products', async (request, response) => {
    //await connection();
    let products = await db.all_products();
    response.send({ "all products": products });
})

app.get('/products/search', async (request, response) => {
    // set default values for query parameters
    const { brand = 'all', price = 'all', limit = 12, skip = 0, sort = 1 } = request.query;
    if (brand === 'all' && price === 'all') {
        const products = await db.find_limit([{ '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    } else if (brand === 'all') {
        const products = await db.find_limit([{ '$match': { 'price': { '$lte': parseInt(price) } } }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    } else if (price === 'all') {
        const products = await db.find_limit([{
            '$match': { 'brand': brand }
        }, { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    } else {
        const products = await db.find_limit([{ '$match': { 'brand': brand } },
        { '$match': { 'price': { '$lte': parseInt(price) } } },
        { '$sort': { "price": parseInt(sort) } }, { '$limit': parseInt(limit) }, { '$skip': parseInt(skip) }]);
        response.send(products);
    }
});

app.get('/products/:id', async (request, response) => {
    //console.log(request.params.id)
    let product = await db.find_by_id(request.params.id)

    response.send({ "product": product })
})


// Pour récupérer tous les produits de notre scrapping à partir de notre base de données
//app.get('/products', (request, response) => {
//    response.status(200).json(products)
//});
/*app.get('/products/:id', (request, response) => {
    const id = request.params.id
    const product = products.find(product => product.id === id)
    response.status(200).json(products)
});*/


//Search endpoint for specific products
//This endpoint accepts the following optional query string parameters:
//limit - number of products to return (default: 12)
//brand - filter by brand(default: All brands)
//price - filter by price(default: All price)

// brand endpoint
/*app.get('/products/:brand', async (request, response) => {
    let product = await db.find_by_brand(request.params.brand)
    response.send({ "brand": request.params.brand, "product": product })
})*/


/*app.get('/products/:brand', (request, response) => {
    const brand = request.params.brand
    const product=[]
    for (var p of products){
        if (products.find(p => p.brand === brand)) {
            product.push(p)
        }    
    }
    response.status(200).json(product)
});*/


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
