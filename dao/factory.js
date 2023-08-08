import env from "../config/enviroment.config.js";
import { connectMongoDb } from "../db.js";
export default () => {
  switch (env.PERSISTENCE) {
    case "MONGO":
      connectMongoDb();
      break;
    case "MEMORY":
      break;
  }
};
