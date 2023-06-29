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
            if: { $in: [productId, "$products._id"] },
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
            if: { $eq: ["$$item._id", productId] },
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
    console.log(cid);
    const cart = await cartModel
      .findOne({ _id: cid })
      .populate("products.product");
    console.log(cart);
  }

  async addCart() {
    const newCart = await cartModel.create({});
    await newCart.save();
    let data = [newCart, STATUS_TYPES.INFO];
    return data;
  }

  async clearProductsCart(cid) {
    try {
      const clearCart = await cartModel.findOneAndUpdate({ _id: cid }, [
        { $set: { products: [] } },
      ]);
    } catch (err) {
      console.log("Error", err);
    }
  }
  async addProductCart(idCart, idPro, method, quantity) {
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
      console.log(updatedCart);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
}
