import ProductManager from "../logic/product_manager.js";
const ProductManagerI = new ProductManager();

export async function getProducts(req, res) {
  let [product] = await ProductManagerI.getProduct(req.query);
  let producpars = product.docs;
  res.render("home", { producpars });
}
