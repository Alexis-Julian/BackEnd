class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    const a = this.products.filter((prodid) => prodid.id === id);
    return a.length > 0 ? { ...a[0] } : "Product not Found";
  }
  addProduct(product) {
    if (!this.products.some((pro) => pro.code === product.code)) {
      this.products.push({ ...product, id: this.products.length });
    } else {
      console.log("Product already exists");
    }
  }
}

const ProductManagerI = new ProductManager();

let product = {
  title: "producto prueba",
  descripcion: "esto es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
  id: 0,
};
let product1 = {
  title: "producto prueba",
  descripcion: "esto es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc1234",
  stock: 25,
  id: 0,
};

console.log(ProductManagerI.getProducts());
ProductManagerI.addProduct(product);
ProductManagerI.addProduct(product1);
ProductManagerI.addProduct(product);
console.log(ProductManagerI.getProductById(2));
console.log(ProductManagerI.getProductById(0));
ProductManagerI.getProducts();
