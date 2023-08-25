import { faker } from "@faker-js/faker";
import { generateRandomCode } from "../utils.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { generateProductErrorInfo } from "./errors/info.js";
export default class MockingManager {
  getProducts(quantity) {
    try {
      let products = [];
      for (let i = 0; i < 50; i++) {
        let product = {
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: parseInt(faker.commerce.price({ min: 500, max: 10000, dec: 0 })),
          code: generateRandomCode(8),
          stock: parseInt(faker.commerce.price({ min: 1, max: 400, dec: 0 })),
          status: true,
          category: faker.commerce.department(),
        };
        products.push(product);
      }

      return products;
    } catch (e) {
      console.log("Failed to get products");
    }
  }
  async createProduct(body) {
    let { title, description, price, code, stock, status, category } = body;
    if (!title || !description || !price || !code || !stock || !status || !category) {
      throw new CustomError({ name: "Product creation error", cause: generateProductErrorInfo(body), message: "Error create product", code: EErrors.INVALID_TYPE_ERROR });
    } else {
      return "Product creation successfuly";
    }
  }
}
