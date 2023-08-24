import { faker } from "@faker-js/faker";
import { generateRandomCode } from "../utils.js";
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
}
