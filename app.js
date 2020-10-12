// init DOM, proizvodi
const ui = new UI();
const proizvodi = new Proizvodi();
const storage = new Storage();

// spremanje svih podataka
let cart = [];

//
document.addEventListener('DOMContentLoaded', () => {
  //  SET up app
  ui.setup(storage)


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
      ui.getBagButtons(storage);
    });
});
