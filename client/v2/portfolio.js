// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let products_favorite = [];
let check_reasonable = false;
let check_recentlyDate = false;
let check_favorite = false;

// inititiate selectors

// instantiate the selectors

const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const selectBrand = document.querySelector('#brand-select');


const selectReasonableProducts = document.querySelector('#price-select');
const selectRecentProducts = document.querySelector('#date-select');
const selectSort = document.querySelector("#sort-select");
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts'); 
const spanp50 = document.querySelector("#p50PriceValue");
const spanp90 = document.querySelector("#p90PriceValue");
const spanp95 = document.querySelector("#p95PriceValue");
const spanLastReleasedDate = document.querySelector("#lastReleasedDate");
const selectShowFavorite = document.querySelector('#show-favorite');

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
    
  /*var favourite_status = false;
  if (product.uuid in favourite_list) {
      favourite_status = true;
  }*/

  const template = products
      .map(product =>{
      return `
      <div class="product" id=${product.uuid}>
         <div>
          <span>Brand 🛍 : </span>
          <strong>${product.brand}</strong>
        </div>
        <div>
          <span>Link 📎 : </span>
          <a href="${product.link}" target="_blank">${product.name}</a>
        </div>
          <span>Price 💰 : </span>
          <strong>${product.price} €</strong>
        <div>
          <span>Favorite ❤ : </span>
          <input type="checkbox" onclick="addFavorite('${product.uuid}')">
          <label for="favorite-product">Add to favorite</label>
        </div>
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

const renderIndicators = pagination => {
    const { count } = pagination;

    spanNbProducts.innerHTML = count;
    spanNbNewProducts.innerHTML = NumberNewProducts();
    if (count != 0) {
        spanp50.innerHTML = Percentile(0.50) + " €";
        spanp90.innerHTML = Percentile(0.90) + " €";
        spanp95.innerHTML = Percentile(0.95) + " €";
        spanLastReleasedDate.innerHTML = LastReleased();
    }
    else {
        spanp50.innerHTML = "None";
        spanp90.innerHTML = "None";
        spanp95.innerHTML = "None";
        spanLastReleasedDate.innerHTML = "None";
    } 
};


/*const renderBrands = products => {
    const brandsNames = [];
    var options= products.map(product => {
        if (!brandsNames.includes(product.brand)) {
            brandsNames.push(product.brand);
        }
        return `<option value="${product.brand}"${currentBrand === product.brand ? "selected" : ""}>${product.brand}</option>`;
    })
    var options = ['<option value="select a brand">select a brand</option>']
        options.push(Array.from(
            {'length': brandsNames.length },
            (value, index) => `<option value="${brandsNames[index]}">${brandsNames[index]}</option>`
    ).join(''));
    options.push('<option value="all brands">all brands</option>')

    selectBrand.innerHTML = options.join('');
}*/


// Version bis
/*const renderBrands = products => {
    let options = [... new Set(products.flatMap(x => x.brand))];

    selectBrand[0] = new Option("all");
    var i = 1;
    for (var option of options) {
        selectBrand[i] = new Option(option);
        i += 1;
    }

};*/


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
// Feature 0 - Show more : Fonctionne
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

document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(setCurrentProducts)
        .then(() => render(currentProducts, currentPagination))
);

//Feature 2 - Filter by brands : Fonctionne pas 
// As a user I want to filter by brands name So that I can browse product for a specific brand

/*selectBrand.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "all brands") {
        products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize)

    } else {
        products.result = products.result.filter(item => item.brand == event.target.value)
    }
    setCurrentProducts();
    render(currentProducts, currentPagination);
});*/



// For version bis
/*selectBrand.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(filterBrand(currentProducts, event.target.value), currentPagination));
})

function filterBrand(currentProducts, brandName) {
    var filteredProducts = []
    if (brandName == "all") {
        filteredProducts = [...currentProducts]
    }
    for (var product of currentProducts) {
        if (product.brand == brandName) {
            filteredProducts.push(product)
        }
    }
    return filteredProducts
}*/


//Feature 3 - Filter by recent products : Fonctionne
//As a user, I want to filter by recent products. So that I can browse the new released products(less than 2 weeks)

function recentProducts(product_date) {
    var now_date = new Date('2022-01-30');
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




//Feature 4 - Filter by reasonable price : Fonctionne
//As a user, I want to filter by reasonable price. So that I can buy affordable product i.e less than 50€
selectReasonableProducts.addEventListener('change', async (event) => {
    var products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    if (event.target.value == "yes") {
        products.result = products.result.filter(item => item.price <= 20);
    }
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});



//Feature 5 - Sort by price : Fonctionne
//As a user, I want to sort by price. So that I can easily identify cheapest and expensive products
//Feature 6 - Sort by date ; Fonctionne
//As a user, I want to sort by price. So that I can easily identify recent and old products

function priceFilter(items) {
    let ordered = items.sort((a, b) => (a.price > b.price) ? 1 : -1);
    return ordered;
}
function dateFilter(items) {
    let ordered = items.sort((a, b) => (new Date(a.released) > new Date(b.released)) ? -1 : 1);
    return ordered;
}

selectSort.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(SortFunction(currentProducts, event.target.value), currentPagination));
})

function SortFunction(currentProducts, selector) {
    let clone = [...currentProducts]
    var sortedProducts = []
    if (selector == "no-sort") {
        sortedProducts = [...currentProducts]
    }
    else if (selector == "price-asc") {
        sortedProducts = priceFilter(clone)
    }
    else if (selector == "price-desc") {
        sortedProducts = priceFilter(clone).reverse()
    }
    else if (selector == "date-asc") {
        sortedProducts=dateFilter(clone)
    }
    else if (selector == "date-desc") {
        sortedProducts=dateFilter(clone).reverse()
    }
    return sortedProducts
}


//Feature 8 - Number of products indicator : Fonctionne
//As a user, I want to indicate the total number of products. So that I can understand how many products is available
// already done by the teacher 


//Feature 9 - Number of recent products indicator : Fonctionne
//As a user, I want to indicate the total number of recent products. So that I can understand how many new products are available

    function NumberNewProducts() {
        var count = 0
        for (var product of currentProducts) {
            //let today = new Date(Date.now())
            let today = new Date('2022-01-30')
            let released = new Date(product.released);
            if (today - released < 14 * 1000 * 60 * 60 * 24) {
                count += 1
            }
        }
        return count
    }


//Feature 10 - p50, p90 and p95 price value indicator : Fonctionne
//As a user, I want to indicate the p50, p90 and p95 price value. So that I can understand the price values of the products
    
function Percentile(p_number) {
    let clone = [...currentProducts]
    var sortedProducts = priceFilter(clone)
    var index = Math.round(p_number * sortedProducts.length)
    var percentile = sortedProducts[index].price
    return percentile.toString()
}


//Feature 11 - Last released date indicator : Fonctionne
    //As a user, I want to indicate the last released date. So that I can understand if we have new products
    function LastReleased() {
        var sortedProducts = SortProducts(currentProducts, "date-asc")
        return sortedProducts[0].released
    }


//Feature 12 - Open product link : Fonctionne
//As a user, I want to open product link in a new page. So that I can buy the product easily

//Feature 13 - Save as favorite : Fonctionne pas
//As a user, I want to save a product as favorite. So that I can retreive this product later

function saveAsFavorite(product_id) {
    const product = currentProducts.find(product => {
        return product.uuid === product_id;
    });
    const product_index = currentProducts.indexOf(product);
    products_favorite.push(currentProducts[product_index]);
    render(currentProducts, currentPagination);
}

//Feature 14 - Filter by favorite : Fonctionne pas
//As a user, I want to filter by favorite products. So that I can load only my favorite products

selectShowFavorite.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(filterWithFavorites(currentProducts, event.target.value), currentPagination));
})

function filterWithFavorites(currentProducts, selector) {
    const listProducts = []
    const found = products_favorite.includes(product.uuid);
    if (selector == "no") {
        filteredProducts = [...currentProducts]
    }
    else {
        for (var product of currentProducts) {
            if (found) {
                    listProducts.push(product)
            }
        }
    }
    return listProducts;
}


//Feature 15 - Usable and pleasant UX : done 
//As a user, I want to parse a usable and pleasant web page. So that I can find valuable and useful content



