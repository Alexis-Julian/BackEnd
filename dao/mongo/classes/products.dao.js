import productModel from "../models/product.model.js";

export default class ProductManager {
  async getProduct() {
    try {
      productModel.find();
    } catch (error) {
      console.log("Error: ", error.message);
      return null;
    }
  }
  async getProductById() {}
  async addProduct() {}
  async deleteProduct() {}
}
