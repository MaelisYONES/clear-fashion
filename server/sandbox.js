/* eslint-disable no-console, no-process-exit */
//const dedicatedbrand = require('./sources/dedicatedbrand');
//const adresseparisbrand = require('./sources/adresseparisbrand');
const montlimartbrand = require('./sources/montlimartbrand');

// The link of the different brands
// https://www.dedicatedbrand.com/en/men/news
// https://adresse.paris/602-nouveautes
// https://www.montlimart.com/toute-la-collection.html

async function sandbox(eshop = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //const products = await dedicatedbrand.scrape(eshop);
    //const products = await adresseparisbrand.scrape(eshop);
      const products = await montlimartbrand.scrape(eshop);
      const fs = require('fs');
      // convert JSON object to string
      const data = JSON.stringify(products);
      // write JSON string to a file
      fs.writeFile('product_montlimart.json', data, (err) => {
          if (err) {
              throw err;
          }
          console.log("JSON data is saved.");
      });

    console.log(products);
    console.log('done');
    //process.exit(0);
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

// https://attacomsian.com/blog/nodejs-write-json-object-to-file : json file link 

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
