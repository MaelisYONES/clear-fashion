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

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

// Pour récupérer tous les produits de notre scrapping
app.get('/products', (request, response) => {
    response.status(200).json(products)
});

/*app.get('/products/:id', (request, response) => {
    const id = request.params.id
    const product = products.find(product => product.id === id)
    response.status(200).json(products)
});*/

app.get('/products/:id', async (request, response) => {
    let product = await db.find_by_id(request.params.id)
    response.send({ "_id": request.params.id, "product": product })
})

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
