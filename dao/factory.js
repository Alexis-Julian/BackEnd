import env from '../config/enviroment.config.js';
import MongoSingleton from '../db.js';
export let Products;
export let Cart;
export let Auth;

switch (env.PERSISTENCE) {
  case 'MONGO':
    MongoSingleton.getInstance();

    const { default: ProductFactory } = await import('./mongo/classes/product.dao.js');
    const { default: CartFactory } = await import('./mongo/classes/cart.dao.js');
    const { default: AuthFactory } = await import('./mongo/classes/auth.dao.js');

    Products = ProductFactory;
    Cart = CartFactory;
    Auth = AuthFactory;

    break;
  case 'MEMORY':
    break;
}
