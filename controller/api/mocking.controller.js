import { ControllerError } from "../../utils.js";
import MockingManager from "../../services/mocking_manager.js";
const MockingManagerI = new MockingManager();

export async function getProducts(req, res) {
  let product = MockingManagerI.getProducts();

  ControllerError(product, res);
}

export async function createProduct(req, res) {
  let result = 1;
  const {} = req.body;
  ControllerError(result, res);
}
