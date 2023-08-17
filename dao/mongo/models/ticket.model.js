import mongoose from "mongoose";

const ticketCollection = "tickets";

const Ticket = new mongoose.Schema({
  /* Codigo del ticket */
  code: { type: String, unique: true },
  /* Tiempo en que se realizo la compra */
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  products: { type: [{ name: String, code: String, price: Number, quantity: Number }] },
  /* Precio total */
  amount: { type: Number },
  /* Email del comprador */
  purchaser: { type: String },
});

export default mongoose.model(ticketCollection, Ticket);
