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

  // prikaz polja dolje
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
        let jedanCart = { ...storage.getProduct(id), amount: 1 };
        // add product to cards
        this.cart.push(jedanCart);
        // save cart in local storage
        storage.saveCart(this.cart);
        // set cart values
        this.setCartValues(this.cart);
        // display cart item
        this.addCartItem(jedanCart);
        // show the cart
        this.showCard(storage);
      });
    });
  }

  // dodaj u sidebar jedan cart
  addCartItem(jedanCart) {
    console.log(jedanCart);

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
    <!-- cart item -->
    <img src=${jedanCart.img} alt="product">
    <div>
      <h4>${jedanCart.title}</h4>
      <h5>$${jedanCart.price}</h5>
      <span class="remove-item" data-id="${jedanCart.id}">Remove</span>
    </div>
    <div>
      <i class="fas fa-chevron-up dodaj" data-id="${jedanCart.id}"></i>
      <p class="item-amount" data-id="${jedanCart.id}">${jedanCart.amount}</p>
      <i class="fas fa-chevron-down oduzmi" data-id="${jedanCart.id}"></i>
    </div>
    <!-- END cart item -->
    `;

    // Ubaci u DOM
    this.cartContent.appendChild(div);
  }

  //  prikaz totalne količine
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

  // *********************************
  // prikazi karte u side bar
  showCard(storage) {
    this.cartOverlay.classList.add('transparentBcg');
    this.cartDOM.classList.add('showCart');
  }
  
  // *************************************
  //  setup pocetni zaslon
  setup(storage) {
    // povlačimo podatke iz local storage
    this.cart = storage.getCart();
    // popuni side bar sa podacima iz localstorage
    this.populate(this.cart);
    // popuni totalsum i totalitem
    this.setCartValues(this.cart);
    // prikazi side bar

    //  DODAVANJE kolicine
    document.querySelectorAll('.dodaj').forEach((item) => {
      let novakolicina = 0;
      console.log('novaKolicina plus+=', novakolicina);
      item.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        //  nova vrijednost polja upisanih
        this.cart = this.cart.map((item) => {
          if (item.id === id) {
            item.amount += 1;
            novakolicina = item.amount;
            console.log('novaKolicina=', novakolicina);
          }
          return item;
        });
        // refresh kolicine podataka
        e.target.nextElementSibling.innerHTML = novakolicina;
        // save cart in local storage
        storage.saveCart(this.cart);
        // set cart values
        this.setCartValues(this.cart);
      });
    });

    // ODUZIMANJE kolicine oduzmi dijela
    document.querySelectorAll('.oduzmi').forEach((item) => {
      let novakolicina = 0;
      console.log('novaKolicina minus=', novakolicina);
      item.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        //  nova vrijednost polja upisanih
        this.cart = this.cart.map((item) => {
          if (item.id === id) {
            item.amount -= 1;
            if (item.amount < 0) {
              console.log('sada stavi nulu');
            }
            novakolicina = item.amount;
            console.log('novaKolicina=', novakolicina);
          }
          return item;
        });
        // refresh kolicine podataka
        e.target.previousElementSibling.innerHTML = novakolicina;
        // save cart in local storage
        storage.saveCart(this.cart);
        // set cart values
        this.setCartValues(this.cart);

        novakolicina = 0;
      });
    });

    this.cartBtn.addEventListener('click', (e) => {
      this.showCard(storage);
    });
    //
    this.closeCartBtn.addEventListener('click', (e) => {
      this.cartOverlay.classList.remove('transparentBcg');
      this.cartDOM.classList.remove('showCart');
    });
  }

  // popinjavanje DOM
  populate(cart) {
    cart.forEach((jedanCart) => {
      this.addCartItem(jedanCart);
    });
    console.log(this.cartContent);
  }
}
