import express from 'express';

import { addFriend, searchFriend } from '../../controller/api/friend.controller.js';

export const app = express.Router();

/* Agregar amigos recibe el email */
app.post('/add', addFriend);

app.post('/search', searchFriend);
