import app from "./app.js";
import middlewares from "./middlewares.js";
middlewares(app);

app.listen(8080);
console.log("Server listening on port 8080");
