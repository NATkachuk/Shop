import Cart from "./moduls/Cart.js";

const productList = document.querySelector('.product__list');

let productsArr = [];
let cartObj = {
    products: [],
    qty: 0,
    totalPrice: 0
};
const CartFromLS = JSON.parse(localStorage.getItem('cart'));

if (CartFromLS) {
    cartObj = CartFromLS;
}
let cart = new Cart(cartObj);

function addProductToDom(product) {
    const html = `
        <div class="product-wrap">
            <div class="card" data-id="${product.id}">
                <img src="${product.images[0]}" alt="${product.title}" class="card__img">
                <div class="card__body">
                    <h5 class = "card__title"> ${product.title}</h5>
                    <p class = "card__text">  ${product.description}</p>
                    <p class = "card__text"> Price:  ${product.price}$</p>
                    <a href="#" class="card__link js-product-buy" >Buy</a>
                </div>
            </div>
        </div>
    `;
    productList.innerHTML += html;
}

window.addEventListener('load', () => {
    async function loadProducts() {
     try {
         const response = await fetch('https://dummyjson.com/products/search?q=phone');
         const data = await response.json();
         productsArr = data.products; 
         return data;
     } catch (error) {
         console.log(error);
     }
    } 
    loadProducts().then( (data) => {
     const { products } = data;
     if (data) {
         products.forEach(product => {
             addProductToDom(product);
         });
     }
    });
    cart = new Cart([], 0, 0);
 });

 document.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-product-buy')) {
        e.preventDefault();
        const productId = e.target.closest('.card').getAttribute('data-id');
        const product = productsArr.find((product) => product.id === parseInt(productId));
        cart.addProduct(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        console.log(cart);
    }
});

