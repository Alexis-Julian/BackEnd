import fs, { writeFileSync, readFileSync } from "fs";
/* Agregar modulos archivos */
export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  writeFile(data) {
    writeFileSync(this.path, JSON.stringify(data));
  }
  async getProduct() {
    try {
      this.products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(this.products);
    } catch {
      console.log("Opa aca estoy", this.path);
      this.writeFile([]);
    }
    return this.products;
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
  async getProductById(id) {
    await this.getProduct();
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
