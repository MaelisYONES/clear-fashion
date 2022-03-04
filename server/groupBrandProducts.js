// JavaScript source code
const fs = require("fs")
const dedicated_products = require('./dedicated.json');
const montlimart_products = require('./montlimart.json');
const adresse_paris = require('./adresseparis.json');


var allBrands_products = dedicated_products.concat(montlimart_products, adresse_paris)

function WriteJsonFile(products, path) {
    products = JSON.stringify(products);
    fs.writeFile(path, products, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('File written successfully');
        }
    });
}
WriteJsonFile(allBrands_products, "./allBrands_products.json")

var total = dedicated_products.length + montlimart_products.length + adresse_paris.length
console.log(total)
console.log(allBrands_products.length)