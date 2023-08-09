/* Classes */
import { Cart as CartFactory } from '../dao/factory.js';
import { Products as ProductFactory } from '../dao/factory.js';

/* Instace Classes */
const CartFactoryI = new CartFactory();
const ProductFactoryI = new ProductFactory();

export default class CartManager {
  async getCart(id) {
    return await CartFactoryI.getCart(id);
  }

  async addCart() {
    return await CartFactoryI.addCart();
  }

  async addProductCart(idCart, idPro, method, quantity) {
    let product = await ProductFactoryI.getProductById(idPro);

    if (!product) {
      console.log('Error: Product not found');
      return null;
    }

    let cart = await CartFactoryI.updateCart(idCart, [updateProductInCart(product._id, method, quantity)]);

    if (!cart) {
      console.log('Error: Cart not found');
      return null;
    }

    return cart;
  }

  async clearProductsCart(id) {
    CartFactoryI.clearProductsCart(id);
  }
}

/* Functions Queries */

function updateProductInCart(productId, method, quantity) {
  return {
    $set: {
      products: {
        $cond: {
          if: { $in: [productId, '$products.product'] },
          then: updateExistingProduct(productId, method, quantity),
          else: addNewProduct(productId),
        },
      },
    },
  };
}

function updateExistingProduct(productId, method, quantity) {
  let methods = {
    ADD: () => updateAddQuantity(),
    SUBB: () => updateSubstractQuantity(),
    REP: () => updateReplaceQuantity(quantity),
  };

  return {
    $map: {
      input: '$products',
      as: 'item',
      in: {
        $cond: {
          if: { $eq: ['$$item.product', productId] },
          then: methods[method](),
          else: '$$item',
        },
      },
    },
  };
}

function addNewProduct(productId) {
  return {
    $concatArrays: ['$products', [{ product: productId, quantity: 1 }]],
  };
}

function updateAddQuantity() {
  return {
    $mergeObjects: ['$$item', { quantity: { $add: ['$$item.quantity', 1] } }],
  };
}

function updateSubstractQuantity() {
  return {
    $mergeObjects: ['$$item', { quantity: { $subtract: ['$$item.quantity', 1] } }],
  };
}

function updateReplaceQuantity({ quantity }) {
  return {
    $mergeObjects: ['$$item', { quantity: parseInt(quantity) }],
  };
}
