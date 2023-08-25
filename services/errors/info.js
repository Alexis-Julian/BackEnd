export const generateUserErrorInfo = (user) => {};

export const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid. List of required properties:
    List of required properties:
    * Title: ned needs to be a String ,received ${product.title}
    * Description: needs to be a String ,received ${product.description}
    * Price: needs to be a integer ,received ${product.price}
    * Code: needs to be a String ,received ${product.code}
    * Stock: needs to be a integer ,received ${product.stock}
    * Status: needs to be a boolean ,received ${product.status}
    * Category: needs to be a String ,received ${product.category}
  `;
};
