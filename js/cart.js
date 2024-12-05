import Cart from "./moduls/Cart.js";

const productList = document.querySelector('.card-product-list');

if (!productList) {
  console.error("Element with class 'cart-product-list' not found");
}

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

console.log(cart);

function addCartProductToDom(product) {
  const html = `
    <div class="product-wrap">
      <div class="card" data-id="${product.id}">
        <img src="${product.images[0]}" alt="${product.title}" class="card__img">
        <div class="card__body">
          <h5 class = "card__title"> ${product.title}</h5>
          <p class = "card__text">  ${product.description}</p>
          <p class = "card__text"> Price:  ${product.price}$</p>
          <a href="#" class="card__link js-product-buy ${cart.products.includes(product) ? 'green-btn' : ''}"  >Buy</a>
        </div>
      </div>
    </div>
  `;
  if (productList) {
    productList.innerHTML += html;
  } else {
    console.error("Cannot add product to DOM because element with class 'cart-product-list' not found");
  }
}

window.addEventListener('load', (e) => {
  if (cart.qty > 0) {
    cart.products.forEach(product => {
      addCartProductToDom(product);
    });
  }
});
