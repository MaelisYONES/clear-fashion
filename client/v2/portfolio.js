// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiate selectors

// instantiate the selectors

const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectRecentProducts = document.querySelector('#price-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

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

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
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

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

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

function filterBrand(items, brand_chosen) {
    var list_product_brand = []
    for (var i in items)
        if (i[brand] == brand_chosen)
            list_product_brand.push(i);
    return list_product_brand;
}

//Feature 3 - Filter by recent products
//As a user, I want to filter by recent products. So that I can browse the new released products(less than 2 weeks)

selectRecentProducts.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "yes") {
        products.result = products.result.filter(item => item.price <= 50);
    }
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});


//Feature 4 - Filter by reasonable price
//As a user, I want to filter by reasonable price. So that I can buy affordable product i.e less than 50€

//Feature 5 - Sort by price
//As a user, I want to sort by price. So that I can easily identify cheapest and expensive products

//Feature 6 - Sort by date
//As a user, I want to sort by price. So that I can easily identify recent and old products

//Feature 8 - Number of products indicator
//As a user, I want to indicate the total number of products. So that I can understand how many products is available

//Feature 9 - Number of recent products indicator
//As a user, I want to indicate the total number of recent products. So that I can understand how many new products are available

//Feature 10 - p50, p90 and p95 price value indicator
//As a user, I want to indicate the p50, p90 and p95 price value. So that I can understand the price values of the products

//Feature 11 - Last released date indicator
//As a user, I want to indicate the last released date. So that I can understand if we have new products

//Feature 12 - Open product link
//As a user, I want to open product link in a new page. So that I can buy the product easily

//Feature 13 - Save as favorite
//As a user, I want to save a product as favorite. So that I can retreive this product later

//Feature 14 - Filter by favorite
//As a user, I want to filter by favorite products. So that I can load only my favorite products

//Feature 15 - Usable and pleasant UX
//As a user, I want to parse a usable and pleasant web page. So that I can find valuable and useful content

