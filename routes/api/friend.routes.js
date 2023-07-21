import express from "express"
import { addFriend } from "../../controller/friend.controller.js"

export const app = express.Router()

app.post("/",addFriend)