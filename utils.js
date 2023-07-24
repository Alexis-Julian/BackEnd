import fetch from "node-fetch";
import ObjectId from "bson-objectid";

export const STATUS_TYPES = Object.freeze({
  ERROR: Symbol(),
  WARNING: Symbol(),
  INFO: Symbol(),
});

export const VERBS_HTTP = Object.freeze({
  GET: Symbol(),
  POST: Symbol(),
  PUT: Symbol(),
  DELETE: Symbol(),
});

export const FETCHINGS = async (url, params, method) => {
  let res;
  if (method === VERBS_HTTP.GET) {
    res = await fetch(`${url}${params}`)
      .then((response) => response.json())
      .catch((error) => error);
  } else if (method === VERBS_HTTP.POST) {
    res = await fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: params,
    })
      .then((response) => response.json())
      .catch((error) => error);
  } else if (method === VERBS_HTTP.PUT) {
    /* PENDIENTE */
  } else if (method === VERBS_HTTP.DELETE) {
    res = await fetch(`${url}${params}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => error);
  } else {
  }
  return res;
};

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
      status: "WARNING",
      msg: "Not finished correctly",
      data: product[0],
    });
  }
};

export function FormatingRender(eformater) {
  let array = eformater.map((e) => JSON.stringify(e));
  return array;
}

export function IsIdValid(id) {
  return ObjectId.isValid(id);
}
