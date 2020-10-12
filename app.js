// init DOM, proizvodi
const ui = new UI();
const proizvodi = new Proizvodi();
const storage = new Storage();

// spremanje svih podataka
let cart = [];

//
document.addEventListener('DOMContentLoaded', () => {
  // povuci podatke
  proizvodi
    .getProduct()
    .then((proizvod) => {
      // Prikazi proizvode na ekranu
      ui.displayProducts(proizvod);

      // spremi podatke u local storage
      storage.saveProduct(proizvod);
    })
    .then(() => {
      ui.btns = document.querySelectorAll('.bag-btn');
      console.log(ui.btns);
      
      
    });
});
