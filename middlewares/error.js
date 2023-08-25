import EErrors from "../services/errors/enums.js";
function ErrorHanlder(err, req, res, next) {
  console.log(err);
  switch (err.code) {
    case EErrors.INVALID_TYPE_ERROR:
      res.send({ status: "error", err: err.name });
      break;
    default:
      res.send({ status: "Error", err: "Unhhandled error" });
      break;
  }
}

export default ErrorHanlder;
