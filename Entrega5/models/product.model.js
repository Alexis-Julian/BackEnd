import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    stock: {
      required: true,
      type: Number,
    },
    status: {
      required: true,
      type: Boolean,
    },
    category: {
      required: true,
      type: String,
    },
  },
  { versionKey: false }
);
ProductSchema.plugin(mongoosePaginate);

export default mongoose.model(productCollection, ProductSchema);
