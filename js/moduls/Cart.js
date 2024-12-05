class Cart {
    constructor({ products = [], qty = 0, totalPrice = 0 } = {}) {
        this.products = products;
        this.qty = qty;
        this.totalPrice = totalPrice;
    }

    addProduct(product) {
        console.log('addProduct');
        console.log(product);
        this.products.push(product);
        this.qty += 1;
        this.totalPrice += product.price;
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    }

    updateProduct() {
        console.log('updateProduct');
    }

    removeProduct() {
        console.log('removeProduct');
    }
}

export default Cart;