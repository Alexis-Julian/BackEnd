/* Classes */
import { Cart as CartFactory } from "../dao/factory.js";
import ProductManager from "./product_manager.js";
import TicketManager from "./ticket_manager.js";
import TicketDTO from "./DTOs/ticket.dto.js";

/* Instace Classes */
const CartFactoryI = new CartFactory();

const ProductManagerI = new ProductManager();
const TicketManagerI = new TicketManager();

export default class CartManager {
  async getCart(id) {
    return await CartFactoryI.getCart(id);
  }

  async addCart() {
    return await CartFactoryI.addCart();
  }

  async addProductCart(idCart, idPro, method, quantity) {
    let product = await ProductManagerI.getProductById(idPro);

    if (!product) return null;

    let cart = await CartFactoryI.updateCart(idCart, [updateProductInCart(product._id, method, quantity)]);

    if (!cart) return null;

    return cart;
  }

  async clearProductsCart(id) {
    CartFactoryI.clearProductsCart(id);
  }

  async PurchaseCart(cid) {
    let amount = 0;

    let products = { discarded: [], approved: [] };

    let cart = await this.getCart(cid);

    if (!cart) return null;

    for (const e of cart.products) {
      if (e.product.stock >= e.quantity) {
        let newStock = e.product.stock - e.quantity;

        let pro_upd = await ProductManagerI.updateProduct({ stock: newStock }, e.product.id);

        if (!pro_upd) return null;

        let cart_upd = await this.deleteProductCart(cart.id, e.product.id);

        if (!cart_upd) return null;

        amount += e.product.price * e.quantity;

        products.approved.push({ name: e.product.title, code: e.product.code, price: e.product.price * e.quantity, quantity: e.quantity });
      } else {
        products.discarded.push(e.product);
      }
    }

    if (products.approved.length > 0) {
      let ticket = new TicketDTO({ amount, product: products.approved });

      ticket = TicketManagerI.createTicket(ticket);
    }

    return ["Ticket no generado" || ticket, products.discarded];
  }

  async deleteProductCart(cid, pid) {
    let result = await CartFactoryI.deleteProductCart(cid, pid);
    return result;
  }
}

/* Functions Queries */

function updateProductInCart(productId, method, quantity) {
  return {
    $set: {
      products: {
        $cond: {
          if: { $in: [productId, "$products.product"] },
          then: updateExistingProduct(productId, method, quantity),
          else: addNewProduct(productId, quantity),
        },
      },
    },
  };
}

function updateExistingProduct(productId, method, quantity) {
  let methods = {
    ADD: () => updateAddQuantity(quantity),
    SUBB: () => updateSubstractQuantity(),
    REP: () => updateReplaceQuantity(quantity),
  };

  return {
    $map: {
      input: "$products",
      as: "item",
      in: {
        $cond: {
          if: { $eq: ["$$item.product", productId] },
          then: methods[method](),
          else: "$$item",
        },
      },
    },
  };
}

function addNewProduct(productId, quantity) {
  return {
    $concatArrays: ["$products", [{ product: productId, quantity: parseInt(quantity) }]],
  };
}

function updateAddQuantity(quantity) {
  console.log("Tnedira que pasar por aca", quantity);
  return {
    $mergeObjects: ["$$item", { quantity: { $add: ["$$item.quantity", parseInt(quantity)] } }],
  };
}

function updateSubstractQuantity() {
  return {
    $mergeObjects: ["$$item", { quantity: { $subtract: ["$$item.quantity", 1] } }],
  };
}

function updateReplaceQuantity({ quantity }) {
  return {
    $mergeObjects: ["$$item", { quantity: parseInt(quantity) }],
  };
}
