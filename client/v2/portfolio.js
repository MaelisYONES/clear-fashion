// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiate selectors

// instantiate the selectors

const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const selectBrand = document.querySelector('#brand-select');
//const selectResonableProducts = document.querySelector('#price-select');
//const selectRecentProducts = document.querySelector('#date-select');
//const selectSort = document.querySelector("#sort-select");
//const spanNbProducts = document.querySelector('#nbProducts');
//const spanNbNewProducts = document.querySelector('#nbNewProducts'); 
//const p50PriceValue = document.querySelector("#p50PriceValue");
//const p90PriceValue = document.querySelector("#p90PriceValue");
//const p95PriceValue = document.querySelector("#p95PriceValue");
//const LastReleaseDate = document.querySelector("#lastReleasedDate");


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

const renderBrands = products => {
    const brandsNames = [];
    /*for (var i in products) {
        if (!brandNames.includes(products.brand)) {
            brandNames.push(products.brand);
        }
    }*/
    products.forEach(product => {
        if (!brandsNames.includes(product.brand)) {
            brandsNames.push(product.brand);
        }
    })
    var options = ['<option value="select a brand">select a brand</option>']
        options.push(Array.from(
            { 'length': brandsNames.length },
            (value, index) => `<option value="${brandsNames[index]}">${brandsNames[index]}</option>`
    ).join(''));
    options.push('<option value="all brands">all brands</option>')

    selectBrand.innerHTML = options;
}


const render = (products, pagination) => {
    renderProducts(products);
    renderPagination(pagination);
    renderIndicators(pagination);
    renderBrands(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
// Feature 0 - Show more
// As a user I want to show more products So that I can display 12, 24 or 48 products on the same page
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
        .then(() => render(currentProducts, currentPagination));
});

//Feature 1 - Browse pages
// As a user I want to browse available pages So that I can load more products
selectPage.addEventListener('change', event => {
    fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(currentProducts, currentPagination));
});

//Feature 2 - Filter by brands
// As a user I want to filter by brands name So that I can browse product for a specific brand
selectBrand.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "all brands") {
        products =await fetchProducts(currentPagination.currentPage, currentPagination.pageSize)

    } else {
        products.result = products.result.filter(item => item.brand == event.target.value)
    }
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});

/*function filterBrand(items, brand_chosen) {
    var list_product_brand = []
    for (var i in items)
        if (i[brand] == brand_chosen)
            list_product_brand.push(i);
    return list_product_brand;
}*/
/*
//Feature 3 - Filter by recent products
//As a user, I want to filter by recent products. So that I can browse the new released products(less than 2 weeks)

function recentProducts(product_date) {
    var now_date = new Date();
    product_date = new Date(product_date);
    var numberDay = now_date - product_date;
    return numberDay;
}

selectRecentProducts.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "yes") {
        products.result = products.result.filter(item => recentProducts(item.released) <= 14*24*60*60*1000);
    }
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});

//Feature 4 - Filter by reasonable price
//As a user, I want to filter by reasonable price. So that I can buy affordable product i.e less than 50€
selectReasonableProducts.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "yes") {
        products.result = products.result.filter(item => item.price <= 50);
    }
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});

//Feature 5 - Sort by price
//As a user, I want to sort by price. So that I can easily identify cheapest and expensive products
//Feature 6 - Sort by date
//As a user, I want to sort by price. So that I can easily identify recent and old products

function priceFilter(items) {
    let ordered = items.sort((a, b) => (a.price > b.price) ? 1 : -1);
    return ordered;
}
function dateFilter(items) {
    let ordered = items.sort((a, b) => (a.date > b.date) ? -1 : 1);
    return ordered;
}

selectSort.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "price-asc") {
        // products.result = products.result.sort((a, b) => { return a.price - b.price});
        currentProducts = priceFilter(products);
    }
    else if (event.target.value == "price-desc") {
        //products.result = products.result.sort((a, b) => { return b.price - a.price });
        currentProducts = priceFilter(products).reverse();
    }
    else if (event.target.value == "date-asc") {
        // products.result = products.result.sort((a, b) => { return new Date(b.released) - new Date(a.released) });
        currentProducts = dateFilter(products);
    }
    else if (event.target.value == "date-desc") {
        //products.result = products.result.sort((a, b) => { return new Date(a.released) - new Date(b.released)});
        currentProducts = dateFilter(products).reverse();
    }
    else {}
    //setCurrentProducts(products);
    render(currentProducts, currentPagination);
});
//Feature 8 - Number of products indicator
//As a user, I want to indicate the total number of products. So that I can understand how many products is available
// already done by the teacher 

//Feature 9 - Number of recent products indicator
//As a user, I want to indicate the total number of recent products. So that I can understand how many new products are available

/**
 * Render page selector
 * @param  {Object} pagination
 */
/*
const renderIndicators = pagination => {
    const { count } = pagination;
    spanNbProducts.innerHTML = count;
    var nbRecent = 0;
    var last_date = new Date("2020-01-01")
    //var two_weeks_ago = recentProducts(last_date);
    var two_weeks_ago = new Date(Date.now() - 12096e5);
    var products = await fetchProducts(1, count);
    products.result.forEach(item => {
        var item_date = new Date(item.released)
        if (item_date.getTime() > two_weeks_ago.getTime()) { nbRecent+=1 }
    })
    spanNbNewProducts.innerHTML = nbRecent;

//Feature 10 - p50, p90 and p95 price value indicator
//As a user, I want to indicate the p50, p90 and p95 price value. So that I can understand the price values of the products
    var sortProducts = priceFilter(products.result);
    p50PriceValue.innerHTML = sortProducts[Math.round(count * 0.50)].price;
    p90PriceValue.innerHTML = sortProducts[Math.round(count * 0.90)].price;
    p95PriceValue.innerHTML = sortProducts[Math.round(count * 0.95)].price;


//Feature 11 - Last released date indicator
    //As a user, I want to indicate the last released date. So that I can understand if we have new products
    products.result.forEach(item => {
        var item_date = new Date(item.released)
        if (item_date.getTime() > last_date) { last_date = item_date }
    })
    lastReleaseDate.innerHTML = last_date.toLocaleDateString(); 
};

//Feature 12 - Open product link
//As a user, I want to open product link in a new page. So that I can buy the product easily

//Feature 13 - Save as favorite
//As a user, I want to save a product as favorite. So that I can retreive this product later

//Feature 14 - Filter by favorite
//As a user, I want to filter by favorite products. So that I can load only my favorite products

//Feature 15 - Usable and pleasant UX
//As a user, I want to parse a usable and pleasant web page. So that I can find valuable and useful content

*/

document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(setCurrentProducts)
        .then(() => render(currentProducts, currentPagination))
);
