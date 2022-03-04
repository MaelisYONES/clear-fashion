const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
    const $ = cheerio.load(data);

    return $('.category-products .products-grid .item .product-info')
        .map((i, element) => {
            const brand = "montlimart"
            let name_ = $(element)
                //.find('.product-name')
                .find('a')
                .text()
                .trim()
                .replace(/\s/g, ' ').split("  ");
            const price = parseInt(
                $(element)
                    .find('.price')
                    .text()
            );
           
            const image = $(element).find('img').attr('src');
            var color = name_[name_.length - 1];
            var link = $(element)
                //.find('.product-name').attr('a href');
                .find('a').attr('href');
            var name = name_[0] + color;
            return {brand, name, price, image, link };
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

