import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { orderSearchableField } from "./order.constance";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { generateOrderId } from "../../utis/GenerateOrderId";
import mongoose from "mongoose";
import { TItems } from "../items/items.interface";

// create order

const createOrderIntoDB = async (paylod: TOrder) => {
  // console.log(paylod, "payload intital");
  const orderId = await generateOrderId();

  paylod.orderId = orderId;



  const result = await Order.create(paylod);

  return result;
};

// get all order

const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  // console.log("quer inservice", query);
  const orderQuery = new QueryBuilder(
    Order.find().populate("orderItem.itemId"),
    query
  )
    .search(orderSearchableField)
    .sort()
    .paginate();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

// search order

const searchOrderFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate("orderItem.itemId"),
    query
  )
    .search(orderSearchableField)
    .sort()
    .paginate();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

// update order item

const updateOrderIntemIntoDB = async (id: string, payload: Partial<TItems>) => {
  const itemObjectId = new mongoose.Types.ObjectId(payload.itemId);



  const isExistOrder = await Order.findById(id);

  if (!isExistOrder) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not Found");
  }
  // Log the existing order items and the item to check

  const itemExists = isExistOrder.orderItem.some((orderItem) =>
    orderItem.itemId.equals(itemObjectId)
  );

  if (itemExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Already Exist");
  }

  const result = await Order.findByIdAndUpdate(
    id,
    {
      $addToSet: { orderItem: { itemId: itemObjectId } },
    },
    {
      new: true,
    }
  );

  return result;
};

export const OrderServices = {
  getAllOrderFromDB,
  createOrderIntoDB,
  searchOrderFromDB,
  updateOrderIntemIntoDB,
};
