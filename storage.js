class Storage {
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
}
