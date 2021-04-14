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
    this.cartItemTotal = document.querySelector('.cart-items-total');
    // definira se nakon renderiranje strainice
    this.btns;
    // polje u koje cemo spremati podatke za sidebar
    this.cart = [];
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
          <button class="bag-btn" data-id=${element.id}><i class="fas fa-shopping-cart"></i>Dodaj u košaricu</button>
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

    // pokupim sve naslove 'Dodaj u košaricu' i promjenim ako je zapis u localStorage
    document.querySelectorAll('.bag-btn').forEach((e) => {
      const id = e.getAttribute('data-id');
      this.cart.forEach((data) => {
        if (data.id === id) {
          e.innerHTML = 'In chart';
        }
      });
    });
  }

  // dodaj u sidebar jedan cart
  addCartItem(jedanCart) {
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
    this.cartItemTotal.innerHTML = itemsTotal;
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
    this.cartContent.addEventListener('click', (e) => {
      let novakolicina = 0;
      const id = e.target.getAttribute('data-id');

      //  brisi sa  cart liste
      if (e.target.classList.contains('remove-item')) {
        console.log('-- mod BRISANJA');
        this.brisiSaListe(id);
        // this.cart = this.cart.filter((item) => item.id !== id);
        // storage.saveCart(this.cart);
        // this.cartContent.innerHTML = '';
        // this.populate(this.cart);
        // this.setCartValues(this.cart);
        // document.querySelectorAll('.bag-btn').forEach((button) => {
        //   if (
        //     button.innerHTML === 'In chart' &&
        //     button.getAttribute('data-id') === id
        //   ) {
        //     button.innerHTML = 'Dodaj u košaricu';
        //     button.disabled = false;
        //   }
        // });
      }

      // dodaje broj vise
      if (e.target.classList.contains('dodaj')) {
        console.log('mod DODAVANJA');
        this.cart = this.cart.map((item) => {
          if (item.id === id) {
            item.amount += 1;
            novakolicina = item.amount;
          }
          return item;
        });
        // refresh kolicine podataka
        e.target.nextElementSibling.innerHTML = novakolicina;
        // save cart in local storage
        storage.saveCart(this.cart);
        // set cart values
        this.setCartValues(this.cart);
      }

      // oduzima broj više
      if (e.target.classList.contains('oduzmi')) {
        console.log('mod ODUZIMANJA');
        this.cart = this.cart.map((item) => {
          if (item.id === id) {
            item.amount -= 1;
            if (item.amount < 0) {
              item.amount = 0;
            }
            novakolicina = item.amount;
          }
          return item;
        });
        // refresh kolicine podataka
        e.target.previousElementSibling.innerHTML = novakolicina;
        // save cart in local storage
        storage.saveCart(this.cart);
        // set cart values
        this.setCartValues(this.cart);
      }
    });

    // povlačimo podatke iz local storage
    this.cart = storage.getCart();
    // popuni side bar sa podacima iz localstorage
    this.populate(this.cart);
    // popuni totalsum i totalitem
    this.setCartValues(this.cart);

    // Otvori side bar, vidimo listu proizvoda u košarici
    this.cartBtn.addEventListener('click', (e) => {
      this.showCard(storage);
    });

    // zatvaranje side bara kad stisnemo križić
    this.closeCartBtn.addEventListener('click', (e) => {
      this.cartOverlay.classList.remove('transparentBcg');
      this.cartDOM.classList.remove('showCart');
    });

    // zatvaranje stranice kad je overlay uključen
    this.cartOverlay.addEventListener('click', (e) => {
      console.log('this.cartOverlay.addEventListener', e);
      if (e.target.classList.contains('transparentBcg')) {
        this.cartOverlay.classList.remove('transparentBcg');
        this.cartDOM.classList.remove('showCart');
      }
    });
  }

  // popinjavanje DOM za svaki proizvod
  populate(cart) {
    cart.forEach((jedanCart) => {
      this.addCartItem(jedanCart);
    });
  }

  // obrada podataka
  cartLogic(storage, proizvod) {
    //  ciscenje cijele chart liste
    this.claerCartBtn.addEventListener('click', (e) => {
      this.cart = [];
      storage.saveCart(this.cart);
      this.cartContent.innerHTML = '';
      this.populate(this.cart);
      this.setCartValues(this.cart);
      this.displayProducts(proizvod);
      this.getBagButtons(storage);
    });
  }

  // brisi sa liste
  brisiSaListe(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    storage.saveCart(this.cart);
    this.cartContent.innerHTML = '';
    this.populate(this.cart);
    this.setCartValues(this.cart);
    document.querySelectorAll('.bag-btn').forEach((button) => {
      if (
        button.innerHTML === 'In chart' &&
        button.getAttribute('data-id') === id
      ) {
        button.innerHTML = 'Dodaj u košaricu';
        button.disabled = false;
      }
    });
  }
}


