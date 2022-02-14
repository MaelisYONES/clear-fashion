/* eslint-disable no-console, no-process-exit */
//const dedicatedbrand = require('./sources/dedicatedbrand');
//const adresseparisbrand = require('./sources/adresseparisbrand');
//const montlimartbrand = require('./sources/montlimartbrand');

// The link of the different brands
// https://www.dedicatedbrand.com/en/men/news
// https://adresse.paris/630-toute-la-collection?id_category=630&n=118
// https://www.montlimart.com/toute-la-collection.html

const fs = require("fs");

async function sandbox(eshop, brand) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //const products = await dedicatedbrand.scrape(eshop);
    //const products = await adresseparisbrand.scrape(eshop);
    //const products= await montlimartbrand.scrape(eshop);
    const products = await brand.scrape(eshop);

    return products
    //console.log(products);
    //console.log('done');
    //process.exit(0);
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
}

//const [,, eshop] = process.argv;

//sandbox(eshop);

function adresseParis_scrap() {
    var listProducts = []
    var page_link = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
    const adresseparisbrand = require('./sources/adresseparisbrand');
    products = sandbox(page_link, adresseparisbrand).then(products => {
        for (var product of products) {
            listProducts.push(product)
        }
        writeInJson(listProducts, "./adresseParis.json")
    })
}

function montlimart_scrap() {
    var listProducts = []
    for (var i = 1; i < 9; i++) {
        var page_link = 'https://www.montlimart.com/toute-la-collection.html' + "?p=" + i.toString();
        const montlimartbrand = require('./sources/montlimartbrand');
        products = sandbox(page_link, montlimartbrand).then(products => {
            for (var product of products) {
                listProducts.push(product)
            }
            writeInJson(listProducts, "./montlimart.json")
        }) 
    }
}

function dedicatedBrand_scrap() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var req = new XMLHttpRequest();
    req.open('GET', 'https://www.dedicatedbrand.com/en/loadfilter', false);
    req.send(null);
    var json_file = JSON.parse(req.responseText)
    var json_dedicated = []
    for (document of json_file.products) {
        if (document.uri != undefined) {
            var product = {};//create the product with the params we want
            product.name = document.name;
            product.price = parseInt(document.price.price);
            product.image = document.image[0];
            product.link = "https://www.dedicatedbrand.com/en/" + document.canonicalUri;
            json_dedicated.push(product)
        }
    }
    //console.log(json_dedicated)
    console.log("Dedicated brand products stored successfully")
    return json_dedicated
}


function writeInJson(products, path) {
    productsInfo = JSON.stringify(products);// convert JSON object to string
    // write JSON string to a file
    fs.writeFile(path, productsInfo, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

function allScrap() {
    var json_dedicated = dedicatedBrand_scrap();
    writeInJson(json_dedicated, "./dedicated.json")

    adresseParis_scrap()
    montlimart_scrap()
}

allScrap()


// https://attacomsian.com/blog/nodejs-write-json-object-to-file : json file link explanation

/* if ($_SERVER['REQUEST_METHOD'] == 'POST') {

     function get_data() {
         $datae = array();
         $datae[] = array(
             'Name' => $_POST['name'],
             'Branch' => $_POST['branch'],
             'College' => $_POST['college'],
         );
         return json_encode($datae);
     }

     $name = "gfg";
     $file_name = $name. '.json';

     if (file_put_contents(
         "$file_name", get_data())) {
         echo $file_name.' file created';
     }
     else {
         echo 'There is some error';
     }
 }*/
