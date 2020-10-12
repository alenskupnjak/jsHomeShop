class Proizvodi {

  // povuci podatke
  async getProduct() {
    try {
      let result = await fetch('./products.json');
      let dataRes = await result.json();
      let podaci = dataRes.items;
      podaci = podaci.map((item) => {
        const id = item.sys.id;
        const title = item.fields.title;
        const price = item.fields.price;
        const img = item.fields.image.fields.file.url;
        return { id, title, price, img };
      });
      return podaci;
    } catch (error) {
      console.log(error);
    }
  }
}