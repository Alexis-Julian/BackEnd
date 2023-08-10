import env from "../config/enviroment.config.js";
import MongoSingleton from "../db.js";
export let Products;
export let Cart;
export let Auth;
export let Chat;

switch (env.PERSISTENCE) {
  case "MONGO":
    MongoSingleton.getInstance();

    const { default: ProductFactory } = await import("./mongo/classes/product.dao.js");
    const { default: CartFactory } = await import("./mongo/classes/cart.dao.js");
    const { default: AuthFactory } = await import("./mongo/classes/auth.dao.js");
    const { default: ChatFactory } = await import("./mongo/classes/chat.dao.js");
    Products = ProductFactory;
    Cart = CartFactory;
    Auth = AuthFactory;
    Chat = ChatFactory;
    break;
  case "MEMORY":
    break;
}
