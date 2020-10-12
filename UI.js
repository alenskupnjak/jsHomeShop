// display products
class UI {
  constructor() {
    this.cartBtn = document.querySelector('.cart-btn');
    this.closeCartBtn = document.querySelector('.close-cart');
    this.claerCartBtn = document.querySelector('.clear-cart');
    this.cartDOM = document.querySelector('.cart');
    this.cartOverlay = document.querySelector('.cart-overlay');
    this.cartItems = document.querySelector('.cart-items');
    this.cartTotal = document.querySelector('.cart-total');
    this.cartContent = document.querySelector('.cart-content');
    this.productsDOM = document.querySelector('.products-center');
    this.btns = document.querySelectorAll('.bag-btn');

    
    // console.log(cartBtn, closeCartBtn, claerCartBtn);
    // console.log(cartDOM, cartOverlay, cartItems);
    // console.log(cartTotal, cartContent, productsDOM);
  }

  displayProducts(products) {
    let result = '';
    products.forEach((element) => {
      result += `
      <!-- Pojedinacno proizvod -->
      <article class="product">
        <div class="img-container">
          <img src=${element.img} class="product-img">
          <button class="bag-btn" data-id=${element.id}><i class="fas fa-shopping-cart"></i>Dodaj u kosaricu</button>
        </div>
        <h3>${element.title}</h3>
        <h4>$${element.price}</h4>
      </article>
      <!-- KRAJ Pojedinacno proizvod -->`;
    });
    // console.log(result);
    // console.log(this.productsDOM);
    this.productsDOM.innerHTML = result;
  }
}
