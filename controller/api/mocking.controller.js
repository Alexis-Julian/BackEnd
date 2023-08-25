import { ControllerError } from "../../utils.js";
import MockingManager from "../../services/mocking.service.js";
const MockingManagerI = new MockingManager();

export async function getProducts(req, res) {
  let product = MockingManagerI.getProducts();

  ControllerError(product, res);
}

export async function createProduct(req, res, next) {
  try {
    let result = await MockingManagerI.createProduct(req.body);
    ControllerError(result, res);
  } catch (err) {
    next(err);
  }
}
