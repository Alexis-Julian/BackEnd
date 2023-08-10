import express from "express";

import { addFriend, searchFriend, requestFriend, declineFriend } from "../../controller/api/friend.controller.js";

export const app = express.Router();

/* Busca personas para agregar amigos */
app.post("/search", searchFriend);

/* Envia la solicitud a la persona ha agregar */
app.post("/solicitude/send", requestFriend);

/* Acepta la solicitud de la persona ha agregar */
app.post("/solicitude/accept", addFriend);

/* Rechaza la solcitud de la persona ha agregar */
app.post("/solicitude/decline", declineFriend);
