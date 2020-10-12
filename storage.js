class Storage {
  saveProduct(products) {
    localStorage.setItem('onlineShopHome', JSON.stringify(products));
  }
}
