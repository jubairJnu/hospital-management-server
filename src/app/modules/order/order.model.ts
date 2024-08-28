import { model, Schema } from "mongoose";
import { TOrder, TOrderItems } from "./order.interface";

const orderItemSchema = new Schema<TOrderItems>(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  {
    _id: false,
  }
);

const orderShcema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      requred: true,
    },
    date: { type: String, requird: true },
    status: { type: String, requird: true, default: "initialize" },
    orderItem: [orderItemSchema],
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", orderShcema);
