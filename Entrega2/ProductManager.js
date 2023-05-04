import fs, { writeFileSync, readFileSync } from "fs";
/* Agregar modulos archivos */
class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = [];
  }
  writeFile(data) {
    writeFileSync(this.path, JSON.stringify(data));
  }
  getProduct() {
    try {
      this.products = readFileSync(this.path, "utf-8");
      this.products = JSON.parse(this.products);
    } catch {
      this.writeFile([]);
    }
  }
  addProduct(product) {
    if (!this.products.some((pro) => pro.code === product.code)) {
      this.products.push({
        ...product,
        id: this.products.length,
      });
      this.writeFile(this.products);
    } else {
      console.log("the product is already repeated");
    }
  }
  getProductById(id) {
    if (this.products.length > 0) {
      let a = this.products.find((prodid) => prodid.id === id);
      if (!a) a = "Product not found";
      return a;
    } else {
      console.log("not having a product");
    }
  }
  deleteProduct(id) {
    try {
      let newarray = [];
      this.products.forEach((e) => {
        if (e.id != id) {
          return newarray.push({ ...e, id: newarray.length });
        }
      });
      this.products = newarray;
      this.writeFile(this.products);
    } catch {
      console.log("Error");
    }
  }

  updateProduct(change, id) {
    let entries = Object.entries(change);
    let product = this.getProductById(id);
    if (typeof product == "object" && Object.keys(change)[0] !== "id") {
      product = Object.entries(product);
      product.forEach((element) => {
        if (element[0] === entries[0][0]) {
          element[1] = entries[0][1];
        }
      });
      product = Object.fromEntries(product);
      this.products = this.products.map((ele) => {
        return ele.id == id ? (ele = { ...ele, ...product }) : ele;
      });

      this.writeFile(this.products);
    } else {
      return console.log("Product not found");
    }
  }
}

let product = {
  title: "producto prueba",
  descripcion: "esto es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc123",
  stock: 25,
  id: 1,
};

let product1 = {
  title: "producto prueba",
  descripcion: "esto es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abcl1234",
  stock: 25,
  id: 0,
};
let product2 = {
  title: "producto prueba",
  descripcion: "esto es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc12234",
  stock: 25,
  id: 5,
};
let product3 = {
  title: "producto prueba",
  descripcion: "esto es un producto prueba",
  price: 200,
  thumbnail: "Sin Imagen",
  code: "abc12d34",
  stock: 25,
  id: 4,
};

const ProductManagerI = new ProductManager();
ProductManagerI.getProduct();
ProductManagerI.addProduct(product1);
ProductManagerI.addProduct(product);
ProductManagerI.addProduct(product2);
ProductManagerI.addProduct(product3);
console.log(ProductManagerI.getProductById(1));
ProductManagerI.updateProduct({ title: "producto noo prueba" }, 0);
ProductManagerI.deleteProduct(0);
