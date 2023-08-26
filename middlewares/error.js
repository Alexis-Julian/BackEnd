import EErrors from "../services/errors/enums.js";
import { logger } from "../utils/logger.js";
function ErrorHanlder(err, req, res, next) {
  console.log(err.cause);
  switch (err.code) {
    case EErrors.INVALID_TYPE_ERROR:
      logger.error(err.name);
      res.status(400).send({ status: "error", err: err.name });
      break;
    case EErrors.DATABASE_ERROR:
      logger.warn(err.name);
      res.status(500).send({ status: "error", err: err.name });
      break;
    case EErrors.ROUTING_ERROR:
      logger.info(err.name);
      res.status(404).send({ status: "error", err: err.name });
      break;
    case EErrors.INVALID_TYPE_INFO:
      logger.info(err.name);
      res.status(422).send({ status: "error", err: err.name });
      break;
    default:
      res.send({ status: "Error", err: "Unhhandled error" });
      break;
  }
}

export default ErrorHanlder;
