import cartModel from '../models/cart.model.js';

export default class CartFactory {
  async getCart(id) {
    try {
      return await cartModel.findById(id).populate('products.product', '-__v');
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async addCart() {
    try {
      let NewCart = cartModel.create({});

      return await NewCart.save();
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async updateCart(id, query) {
    try {
      let cart = await cartModel.findByIdAndUpdate(id, query && query, { new: true });
      return cart;
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async clearProductCart(id) {
    try {
      return await cartModel.findByIdAndUpdate(id, [{ $set: { products: [] } }]);
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }
}
