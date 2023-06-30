import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
        },
      ],
      default: [],
    },
  },
  { versionKey: false }
);

export default mongoose.model(cartCollection, CartSchema);
