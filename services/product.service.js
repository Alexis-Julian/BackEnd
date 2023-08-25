import { PRODUCT_DICCIONARY } from '../utils.js';
import { Products } from '../dao/factory.js';

const ProductFactoryI = new Products();

/* Agregar modulos archivos */
export default class ProductManager {
  async getProduct(querys) {
    const filter = ValidationQuery(querys);
    return await ProductFactoryI.getProduct(filter);
  }

  async addProduct(product) {
    return await ProductFactoryI.addProduct(product);
  }

  async getProductById(id) {
    return await ProductFactoryI.getProductById(id);
  }

  async updateProduct(change, id) {
    let PossibleUpdate = ValidationCorrectlyFields(change);

    if (!PossibleUpdate) {
      console.log('Error: error in fields update');
      return null;
    }

    return await ProductFactoryI.updateProduct(change, id);
  }

  async deleteProduct(id) {
    return await ProductFactoryI.deleteProduct(id);
  }
}

function ValidationProductFields(product) {
  let aux = false;
  let productkey = Object.keys(product).sort();
  PRODUCT_DICCIONARY.forEach((element, index) => {
    if (element == productkey[index]) {
      aux = true;
    } else {
      aux = false;
    }
  });
  return aux;
}

function ValidationCorrectlyFields(change) {
  let aux = 1;
  let bool = false;
  const fields = Object.keys(change).sort();
  for (const indexd in PRODUCT_DICCIONARY) {
    for (const indexf in fields) {
      if (fields.length === aux) {
        bool = true;
        break;
      } else if (PRODUCT_DICCIONARY[indexd] === fields[indexf]) {
        aux++;
      }
    }
  }
  return bool;
}

function ValidationQuery({ limit, page, query, sort }) {
  const sortt = sort ? Object.fromEntries([[sort, -1]]) : undefined;
  const category = query ? Object.fromEntries([['category', query]]) : undefined;

  const filters = {
    limit: limit > 0 ? limit : 10,
    page: page > 0 ? page : 1,
    sort: sortt,
    select: '-__v',
  };

  return [category, filters];
}
