import jwt from 'jsonwebtoken';
import env from '../../config/enviroment.config.js';
import { Auth as AuthFactory } from '../../dao/factory.js';
import { Products as ProductFactory } from '../../dao/factory.js';

const AuthFactoryI = new AuthFactory();
const ProductFactoryI = new ProductFactory();

/* Esto es mal se supone que una vez adentro ya tendria informacion
del usuario */
export async function getProducts(req, res) {
  const { token } = req.cookies;

  let { id } = jwt.verify(token, env.TOKEN);
  let user = await AuthFactoryI.UserFoundById(id);

  let { docs } = await ProductFactoryI.getProduct(req.query);

  res.render('home', { docs, user });
}
