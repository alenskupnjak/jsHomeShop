class Storage {
  // snimanje posataka u colac storage
  saveProduct(products) {
    localStorage.setItem('onlineShopHome', JSON.stringify(products));
  }

  getProduct(id) {
    let proizvod = JSON.parse(localStorage.getItem('onlineShopHome'));
    return proizvod.find((product) => {
      return product.id === id;
    });
  }

  // snimanje sideliste u polje
  saveCart(cart) {
    localStorage.setItem('onlineShopHomeChart', JSON.stringify(cart));
  }

  // povlačenje podataka iz local storage
  getCart() {
    if (localStorage.getItem('onlineShopHomeChart')) {
      return JSON.parse(localStorage.getItem('onlineShopHomeChart'));
    } else {
      return [];
    }
  }
}
