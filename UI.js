// const storage = new Storage();

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

    // definira se nakon renderiranje strainice
    this.btns;

    // polje u koje cemo spremati podatke za sidebar
    this.cart = [];

    // polje u koje cemo spremati podatke za sidebar
    this.buttonsDOM = [];

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

  getBagButtons(storage) {
    // rijesavamo se nodlist extenzije
    this.btns = [...document.querySelectorAll('.bag-btn')];
    this.buttonsDOM = this.buttonsDOM;
    this.btns.forEach((button) => {
      let id = button.dataset.id;
      // let inChart = this.cart.find((item) => {
      //   return (item.id = id);
      // });

      // if (inChart) {
      //   button.innerHTML = 'In chart';
      //   button.disabled = true;
      // }

      button.addEventListener('click', (e) => {
        console.log(e.target);
        e.target.innerText = 'In chart';
        e.target.disabled = true;

        // get proizvos from, products
        let dataStorage = { ...storage.getProduct(id), amount: 1 };

        // add product to cards
        this.cart.push(dataStorage);

        // save cart in local storage
        storage.saveCart(this.cart);

        // set cart values
        this.setCartValues(this.cart);

        // display cart item
        this.addCartItem(dataStorage);

        // show the cart
        this.showCard(storage);
      });
    });
  }

  // dodaj
  addCartItem(dataStorage) {
    console.log(dataStorage);

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
    <!-- cart item -->
    <img src=${dataStorage.img} alt="product">
    <div>
      <h4>${dataStorage.title}</h4>
      <h5>$${dataStorage.price}</h5>
      <span class="remove-item" data-id="${dataStorage.id}">Remove</span>
    </div>
    <div>
      <i class="fas fa-chevron-up dodaj" data-id="${dataStorage.id}"></i>
      <p class="item-amount" data-id="${dataStorage.id}">${dataStorage.amount}</p>
      <i class="fas fa-chevron-down oduzmi" data-id="${dataStorage.id}"></i>
    </div>
    <!-- END cart item -->
    `;

    // Ubaci u DOM
    this.cartContent.appendChild(div);
    console.log(this.cartContent);
  }

  setCartValues(cart) {
    let tepmTotal = 0;
    let itemsTotal = 0;
    // prolazim kroz cijel podatke i racunam
    cart.map((item) => {
      tepmTotal += item.price * item.amount;
      itemsTotal += +item.amount;
    });
    this.cartTotal.innerHTML = parseFloat(tepmTotal.toFixed(2));
    this.cartItems.innerHTML = itemsTotal;
  }

  // prikazi karte u side bar
  showCard(storage) {
    this.cartOverlay.classList.add('transparentBcg');
    this.cartDOM.classList.add('showCart');

    //  zatvori side bar
    this.closeCartBtn.addEventListener('click', (e) => {
      this.cartOverlay.classList.remove('transparentBcg');
      this.cartDOM.classList.remove('showCart');
    });

    //  dodavanje na klicine
    document.querySelectorAll('.dodaj').forEach((item) => {      
      item.addEventListener('click', (e) => {
        let novakolicina;
        console.log('next=',e.target.nextElementSibling);
        
        // e.target.nextSibling.innerHTML = '10'
        const id = e.target.getAttribute('data-id');

        //  nova vrijednost polja upisanih
        this.cart = this.cart.map((item) => {
          if (item.id === id) {
            item.amount += 1;
            novakolicina = item.amount
          }
          return item
        });

        // refresh kolicine podataka
        e.target.nextElementSibling.innerHTML = novakolicina 

        console.log(this.cart);

        // save cart in local storage
        storage.saveCart(this.cart);

        // set cart values
        this.setCartValues(this.cart);
      });
    });

    document.querySelectorAll('.oduzmi').forEach((item) => {
      item.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        console.log('oduzimam', id);
      });
    });
  }
}
