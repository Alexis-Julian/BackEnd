import { STATUS_TYPES, PRODUCT_DICCIONARY } from "../utils.js";
import productModel from "../models/product.model.js";

/* Agregar modulos archivos */
export default class ProductManager {
  constructor() {
    this.products = [];
  }
  ValidationProductFields(product) {
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
  ValidationProductRepeat({ code }) {
    return this.products.some((pro) => pro.code === code);
  }
  ValidationCorrectlyFields(change) {
    let aux = 1;
    let bool = false;
    const fields = Object.keys(change).sort();
    for (const indexd in PRODUCT_DICCIONARY) {
      for (const indexf in fields) {
        if (fields.length === aux) {
          bool = true;
          break;
        } else if (PRODUCT_DICCIONARY[indexd] === fields[indexf]) {
          aux++;
        }
      }
    }
    return bool;
  }
  ValidationQuery({ limit, page, query, sort }) {
    console.log(limit, page, query, sort);
    const sortt = sort ? Object.fromEntries([[sort, -1]]) : undefined;
    const category = query
      ? Object.fromEntries([["category", query]])
      : undefined;

    const filters = {
      limit: limit > 0 ? limit : 10,
      page: page > 0 ? page : 1,
      sort: sortt,
      select: "-__v",
    };
    return [category, filters];
  }

  async getProduct(querys) {
    let product = ["", ""];
    const filter = this.ValidationQuery(querys);
    try {
      this.products = await productModel.paginate(filter[0], filter[1], {
        select: "-__v",
      });
      product = [this.products, STATUS_TYPES.INFO];
    } catch (e) {
      console.log(e);
      product = [e, STATUS_TYPES.ERROR];
    }
    return product;
  }

  async addProduct(product) {
    let msg;
    if (this.ValidationProductFields(product)) {
      if (!this.ValidationProductRepeat(product)) {
        const newProduct = new productModel({ ...product });
        await newProduct.save();
        this.products.push(newProduct);
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
    let productmsg;
    let productfind = this.products.find((pro) => pro.code == id);
    if (!productfind) {
      productmsg = ["Product Not Found", STATUS_TYPES.WARNING];
    } else {
      productmsg = [productfind, STATUS_TYPES.INFO];
    }
    return productmsg;
  }

  async deleteProduct(codep) {
    let data;
    const productfound = await this.getProductById(codep);
    const [{ code }] = productfound;
    if (code) {
      const { deletdCount } = await productModel.deleteOne({ code: code });
      this.products.splice(
        this.products.findIndex((ele) => ele.code == code),
        1
      );
      data = ["Product deleted", STATUS_TYPES.INFO];
    } else {
      data = productfound;
    }
    return data;
  }

  async updateProduct(change, code) {
    let data = ["", ""];
    if (this.ValidationCorrectlyFields(change)) {
      if (this.ValidationProductRepeat({ code: code })) {
        const updateFields = await productModel.updateOne(
          { code: code },
          change
        );
        data = ["Update Succefully", STATUS_TYPES.INFO];
      } else {
        data = ["Product not found", STATUS_TYPES.WARNING];
      }
    } else {
      data = ["Fields incorrectly", STATUS_TYPES.ERROR];
    }
    return data;
  }
}
