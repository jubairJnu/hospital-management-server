import { Types } from "mongoose";

export type TOrderItems = {
  itemId: Types.ObjectId;
};

export type TOrder = {
  orderId: string;
  name: string;
  date: string;
  status: string;
  orderItem: [TOrderItems];
};
