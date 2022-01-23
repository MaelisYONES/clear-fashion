// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
var cheapest_Tshirt = "https://adresse.paris/t-shirts-et-polos/3983-t-shirt-ranelagh-1300000259194.html"

// 2. Log the variable
console.log('The cheapest t-shirt is: ', cheapest_Tshirt)


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
var nb_products = marketplace.length
// 2. Log the variable
console.log('The number of products is: ', nb_products)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
var name_brand = []
for(var i in marketplace)
name_brand[i] = marketplace[i].brand

const brand_filter = name_brand.filter(function (ele, pos) {
    return name_brand.indexOf(ele) == pos;
})

// autre façon de faire avec foreach
// marketplace.forEach(obj => brandNames.push(obj.brand))
// ou 
// marketplace.forEach(function(entry){
//     brandNames.push(entry.brand)
//})

// autre example
let Brands = [];
for (let i = 0; i < nb_products; i++) {
    if (!Brands.includes(marketplace[i].brand)) {
        Brands.push(marketplace[i].brand)
    }
}

const unique_brand = new Set(name_brand) // autre méthode avec Set
// 2. Log the variable
console.log('The brand names are:')
console.log(name_brand)
console.log(brand_filter)
console.log(unique_brand)
// 3. Log how many brands we have
console.log(unique_brand.size)

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
function priceFilter () {
    let ordered = marketplace.sort((a, b) => (a.price > b.price) ? 1 : -1);
    return ordered;
}

var price_ordered = priceFilter()
console.log('The marketplace products sorted by price: ', price_ordered)

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function dateFilter() {
    let ordered = marketplace.sort(
        function (a, b) {
            a = new Date(a.date)
            b = new Date(b.date)
            if (a < b) {
                return 1;
            }
            else {
                return -1;
            }
        });
    return ordered;
};

function dateFilterbis() {
    let ordered = marketplace.sort((a, b) => (a.date > b.date) ? -1 : 1);
    return ordered;
}
var date_ordered = dateFilter();
console.log('The marketplace products sorted by date: ',date_ordered);

var date_orderedbis = dateFilterbis();
console.log('The marketplace products sorted by date: ', date_orderedbis);


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var productsBetween50And100 = [];
for (let i = 0; i < nb_products; i++) {
    if (marketplace[i].price >= 50 && marketplace[i].price <= 100) {
        productsBetween50And100.push(marketplace[i]);
    }
}
console.log('The marketplace products between 50€ and 100€: ', productsBetween50And100)

// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

var average = 0;
for (let i = 0; i < nb_products; i++) {
    average += marketplace[i].price;
}
average = average / nb_products;

console.log('Average price is: ',average)


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
var brand_adresse = [];
for (var i in marketplace) {
    if (marketplace[i].brand == "adresse") {
        brand_adresse.push(marketplace[i])
    }
}

var brand_aatise = [];
for (var i in marketplace) {
    if (marketplace[i].brand == "aatise") {
        brand_aatise.push(marketplace[i])
    }
}

var brand_loom = [];
for (var i in marketplace) {
    if (marketplace[i].brand == "loom") {
        brand_loom.push(marketplace[i])
    }
}

var brand_1083 = [];
for (var i in marketplace) {
    if (marketplace[i].brand == "1083") {
        brand_1083.push(marketplace[i])
    }
}

var brand_dedicated = [];
for (var i in marketplace) {
    if (marketplace[i].brand == "dedicated") {
        brand_dedicated.push(marketplace[i])
    }
}

const brands = {
    'adresse': brand_adresse,
    'aatise': brand_aatise,
    'loom': brand_loom,
    '1083': brand_1083,
    'dedicated': brand_dedicated
};

// 2. Log the variable
console.log(brands)
// 3. Log the number of products by brands
console.log('adresse: ', brands["adresse"].length)
console.log('aatise: ', brands["aatise"].length)
console.log('Loom: ', brands["loom"].length)
console.log('1083: ',brands["1083"].length)
console.log('dedicated: ',brands["dedicated"].length)


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort





/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products





/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
