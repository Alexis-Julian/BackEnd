import { STATUS_TYPES } from "../utils.js";
import ProductManager from "./ProductManager.js";

export default class CartManager {
  constructor(path) {
    this.ProductManagerC = new ProductManager(path);
    this.cart = [];
    this.inicialize();
  }
  inicialize() {
    this.ProductManagerC.modeproduct = false;
  }
  async addProductCart(cid, pid) {
    let data;
    let [product] = pid;
    const [cart] = await this.ProductManagerC.getProduct();
    try {
      cart.map((e) => {
        if (e.id == cid) {
          if (e.products.length > 0) {
            e.products.map((p) => {
              if (p.id == product.id) {
                p = { ...p, quantity: (p.quantity += 1) };
              } else {
                e.products.push({ id: product.id, quantity: 1 });
              }
            });
          } else {
            e.products.push({ id: product.id, quantity: 1 });
          }
        }
      });
      this.ProductManagerC.writeFile(cart);
      data = [product, STATUS_TYPES.INFO];
    } catch (e) {
      data = [e, STATUS_TYPES.ERROR];
    }
    return data;
  }
}
