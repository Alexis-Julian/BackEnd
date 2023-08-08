import mongoose from "mongoose";

const cartCollection = "carts";

const CartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number },
        },
      ],

      default: [],
    },
  },
  { versionKey: false }
);

export default mongoose.model(cartCollection, CartSchema);
