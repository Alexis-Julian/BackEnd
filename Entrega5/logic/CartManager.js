import { STATUS_TYPES } from "../utils.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
export default class CartManager {
  constructor(path) {
    this.cart = [];
  }
  updateProductInCart(productId, method, quantity) {
    return {
      $set: {
        products: {
          $cond: {
            if: { $in: [productId, "$products.product"] },
            then: this.updateExistingProduct(productId, method, quantity),
            else: this.addNewProduct(productId),
          },
        },
      },
    };
  }
  updateAddQuantity() {
    return {
      $mergeObjects: ["$$item", { quantity: { $add: ["$$item.quantity", 1] } }],
    };
  }
  updateSubstractQuantity() {
    return {
      $mergeObjects: [
        "$$item",
        { quantity: { $subtract: ["$$item.quantity", 1] } },
      ],
    };
  }

  updateReplaceQuantity({ quantity }) {
    return {
      $mergeObjects: ["$$item", { quantity: parseInt(quantity) }],
    };
  }
  updateExistingProduct(productId, method, quantity) {
    let methods = {
      ADD: () => this.updateAddQuantity(),
      SUBB: () => this.updateSubstractQuantity(),
      REP: () => this.updateReplaceQuantity(quantity),
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

  addNewProduct(productId) {
    return {
      $concatArrays: ["$products", [{ product: productId, quantity: 1 }]],
    };
  }

  async getCart(cid) {
    let data;
    try {
      const cart = await cartModel
        .findOne({ _id: cid })
        .populate("products.product", "-__v")
        .catch((e) => {
          throw new Error("Cart not found");
        });
      data = [cart, STATUS_TYPES.INFO];
    } catch (e) {
      data = [e.message, STATUS_TYPES.ERROR];
    }
    return data;
  }

  async addCart() {
    const newCart = await cartModel.create({});
    await newCart.save();
    let data = [newCart, STATUS_TYPES.INFO];
    return data;
  }

  async clearProductsCart(cid) {
    let msg;
    try {
      const clearCart = await cartModel
        .findOneAndUpdate({ _id: cid }, [{ $set: { products: [] } }])
        .catch((e) => {
          throw new Error("Cart not found");
        });
      msg = ["Products deleted successfully", STATUS_TYPES.INFO];
    } catch (err) {
      msg = [`Error: ${err.message}`, STATUS_TYPES.WARNING];
    }
  }
  async addProductCart(idCart, idPro, method, quantity) {
    let msg;
    try {
      const product = await productModel
        .findOne({ _id: idPro })
        .select("_id")
        .catch((e) => {
          throw new Error("Product not found");
        });

      const updatedCart = await cartModel
        .findOneAndUpdate(
          { _id: idCart },
          [this.updateProductInCart(product._id, method, quantity)],
          {
            new: true,
          }
        )
        .catch((e) => {
          throw new Error("Cart not found");
        });
      msg = ["Product added successfully", STATUS_TYPES.INFO];
    } catch (error) {
      msg = [`Error:, ${error.message}`, STATUS_TYPES.WARNING];
    }
    return msg;
  }
}
