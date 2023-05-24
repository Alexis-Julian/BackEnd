import fs, { writeFileSync, readFileSync } from "fs";
import { STATUS_TYPES, PRODUCT_DICCIONARY } from "../utils.js";

/* Agregar modulos archivos */
export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.modeproduct = true;
  }
  writeFile(data) {
    writeFileSync(this.path, JSON.stringify(data));
  }
  async getProduct(limits) {
    let product = ["", ""];
    try {
      this.products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(this.products);
      product = [this.products, STATUS_TYPES.INFO];
      if (limits) {
        limits = parseInt(limits);
        this.products = this.products.slice(0, limits);
        product = [this.products, STATUS_TYPES.INFO];
      }
    } catch (e) {
      product = [e, STATUS_TYPES.ERROR];
    }
    return product;
  }
  ValidationProduct(product) {
    let aux = false;
    let productkey = Object.keys(product).sort();
    PRODUCT_DICCIONARY.forEach((element, index) => {
      if (element == productkey[index]) {
        aux = true;
      } else {
        aux = false;
      }
    });
    return aux;
  }
  async addProduct(product) {
    let msg;
    let bool;
    await this.getProduct();
    this.modeproduct ? (bool = this.ValidationProduct(product)) : (bool = true);
    console.log(product);
    if (bool) {
      if (
        !this.products.some((pro) => pro.code === product.code) ||
        this.modeproduct == false
      ) {
        let index = this.products.length - 1;
        console.log(index);
        product = {
          ...product,
          id: this.products[index].id + 1,
        };
        console.log(product);
        this.products.push(product);
        this.writeFile(this.products);
        msg = [product, STATUS_TYPES.INFO];
      } else {
        msg = ["The product is already repeated", STATUS_TYPES.WARNING];
      }
    } else {
      msg = ["The product have missing fields", STATUS_TYPES.ERROR];
    }
    return msg;
  }
  async getProductById(id) {
    await this.getProduct();
    let product = [];
    let productfind = this.products.find((prodid) => prodid.id == id);
    if (!productfind) {
      product = ["Product Not Found", STATUS_TYPES.WARNING];
    } else {
      product = [productfind, STATUS_TYPES.INFO];
    }
    return product;
  }
  async deleteProduct(id) {
    let [product, symbol] = await this.getProduct();
    let data;
    let productdelete;
    try {
      let productsnew = [];
      if (product.find((proid) => proid.id == id)) {
        product.forEach((e) => {
          if (e.id != id) {
            productsnew.push({ ...e });
          } else {
            productdelete = e;
          }
        });
        this.writeFile(productsnew);
        data = [productdelete, STATUS_TYPES.INFO];
      } else {
        data = ["Product not found", STATUS_TYPES.WARNING];
      }
    } catch (e) {
      data = [e, STATUS_TYPES.ERROR];
    }
    return data;
  }

  async updateProduct(change, id) {
    let [product, symbol] = await this.getProduct();
    let data = ["Product not found", STATUS_TYPES.WARNING];
    if (!change.id) {
      product = product.map((e) => {
        if (e.id == id) {
          e = { ...e, ...change };
          data = [e, STATUS_TYPES.INFO];
        }
        return e;
      });
      this.writeFile(product);
    } else {
      data = ["Not possible to update id product", STATUS_TYPES.WARNING];
    }
    return data;
  }
}
