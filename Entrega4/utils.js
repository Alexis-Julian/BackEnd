export const STATUS_TYPES = Object.freeze({
  ERROR: Symbol(),
  WARNING: Symbol(),
  INFO: Symbol(),
});
export const PRODUCT_DICCIONARY = [
  "category",
  "code",
  "description",
  "price",
  "status",
  "stock",
  "title",
];
export const STATUS_RES_GET = (product, res) => {
  if (product[1] === STATUS_TYPES.ERROR) {
    res
      .status(400)
      .json({ status: "ERROR", msg: "Syntax Error", data: product[0] });
  } else if (product[1] === STATUS_TYPES.INFO) {
    res
      .status(200)
      .json({ status: "SUCCESS", msg: "Fetch products", data: product[0] });
  } else if (product[1] === STATUS_TYPES.WARNING) {
    res.status(200).json({
      status: "SUCCESS",
      msg: "Not finished correctly",
      data: product[0],
    });
  }
};

export function FormatingRender(eformater) {
  let array = eformater.map((e) => JSON.stringify(e));
  return array;
}
