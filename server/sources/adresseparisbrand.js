const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
    const $ = cheerio.load(data);
    const released = new Date();

    return $('.product_list .ajax_block_product')
        .map((i, element) => {

            const brand = "Adresse_Paris"; 
            const name = $(element)
                .find('.product-name')
                .text()
                .trim()
                .replace(/\s/g, ' ').split('  ')[0];

            const price = parseInt(
                $(element)
                    .find('.price')
                    .text()
            );

            const image = $(element).find('img').attr('src');

            var link = $(element)
                .find('.product-name').attr('href');

            const date = released.toLocaleDateString()

            return {brand, name, price, image, link, date };
        })
        .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const body = await response.text();

            return parse(body);
        }

        console.error(response);

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
