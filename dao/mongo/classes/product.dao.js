import productModel from '../models/product.model.js';
import ProductDTO from '../../../services/DTOs/product.dto.js';

export default class ProductFactory {
  async getProduct(filters) {
    try {
      return await productModel.paginate(filters[0], filters[1], {
        select: '-__v',
      });
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async getProductById(id) {
    try {
      return await productModel.findById(id);
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async addProduct(product) {
    try {
      let NewProduct = new productModel(new ProductDTO(product));

      await NewProduct.save();

      return NewProduct;
    } catch (error) {
      console.log('Error:', error.message);

      return null;
    }
  }

  async updateProduct(change, id) {
    try {
      return await productModel.findByIdAndUpdate(id, change, { new: true });
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
}
