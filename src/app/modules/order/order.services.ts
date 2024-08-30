/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { orderSearchableField } from "./order.constance";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { generateOrderId } from "../../utis/GenerateOrderId";
import mongoose from "mongoose";
import { TItems } from "../items/items.interface";
import PDFDocument from "pdfkit";

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

const generatePdfFromDB = async (id: string): Promise<Buffer> => {
  const orderDetails = await Order.findById(id).populate("orderItem.itemId");
  if (!orderDetails) {
    throw new AppError(httpStatus.NOT_FOUND, "No Order");
  }

  // Create a new PDF document
  const doc = new PDFDocument();

  // Buffer to hold PDF data
  const buffers: Buffer[] = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfBuffer = Buffer.concat(buffers);
    return pdfBuffer;
  });

  // Add title
  doc.fontSize(18).text("Order Details", { underline: true });
  doc.moveDown();

  // Add order details
  doc.fontSize(12).text(`Order ID: ${orderDetails?.orderId}`);
  doc.text(`Name: ${orderDetails?.name}`);
  doc.text(`Date: ${orderDetails?.date}`);
  doc.text(`Status: ${orderDetails?.status}`);
  doc.moveDown();

  // Add table header
  doc.fontSize(12).text("Order Items:", { underline: true });
  doc.moveDown();

  // Table header
  const tableTop = doc.y;
  doc.fontSize(12).text("Item ID", 50, tableTop, { continued: true });
  doc.text("Title", 150, tableTop, { continued: true });
  doc.text("Price", 250, tableTop);
  doc.moveDown();

  // Draw table rows
  orderDetails?.orderItem?.forEach((item: any) => {
    doc.text(item?.itemId?.itemId, 50, doc.y, { continued: true });
    doc.text(item?.itemId?.title, 150, doc.y, { continued: true });
    doc.text(item?.itemId?.price, 250, doc.y);
    doc.moveDown();
  });

  // Finalize the PDF and end the stream
  doc.end();

  // Return a Promise that resolves with the PDF buffer
  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on("error", reject);
  });
};

// search order

const updateOrderInfoIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
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
  updateOrderInfoIntoDB,
  updateOrderIntemIntoDB,
  generatePdfFromDB,
};
