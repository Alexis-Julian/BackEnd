export default class ProductDTO {
  constructor(product) {
    if (!product.title || typeof product.title !== 'string') {
      throw new Error('The title is invalid');
    }

    if (!product.description || typeof product.description !== 'string') {
      throw new Error('The description is invalid');
    }

    if (!product.price || typeof product.price !== 'number' || isNaN(product.price)) {
      throw new Error('The price is invalid');
    }

    if (!product.code || typeof product.code !== 'string') {
      throw new Error('The code is invalid');
    }

    if (!product.stock || typeof product.stock !== 'number' || isNaN(product.stock)) {
      throw new Error('The stock is invalid');
    }

    if (!product.category || typeof product.category !== 'string') {
      throw new Error('The category is invalid');
    }

    this.title = product.title;
    this.description = product.description;
    this.price = parseInt(product.price);
    this.code = product.code;
    this.stock = parseInt(product.stock);
    this.status = product.status;
    this.category = product.category;
  }
}
