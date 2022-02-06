/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
//const adresseparisbrand = require('./sources/adresseparisbrand');
//const montlimartbrand = require('./sources/montlimartbrand');

// The link of the different brands
// https://www.dedicatedbrand.com/en/men/news
// https://adresse.paris/602-nouveautes
// https://www.montlimart.com/toute-la-collection.html

async function sandbox(eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);
    //const products = await adresseparisbrand.scrape(eshop);
   // const products = await montlimartbrand.scrape(eshop);
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
