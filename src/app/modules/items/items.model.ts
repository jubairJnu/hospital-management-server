import { model, Schema } from "mongoose";
import { TItems } from "./items.interface";

const itemSchema = new Schema<TItems>(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      requird: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = model("Item", itemSchema);
