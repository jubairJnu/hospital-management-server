import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderServices.createOrderIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Order is created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//  get all order

const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderServices.getAllOrderFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "order retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// generate pdf

const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const pdfBuffer = await OrderServices.generatePdfFromDB(id);

    res.setHeader("Content-Disposition", "inline; filename=order.pdf");
    res.setHeader("Content-Type", "application/pdf");

    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

//  update

const updateOrderInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.updateOrderInfoIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Order Updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.updateOrderIntemIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Order Updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//

export const OrderControllers = {
  createOrder,
  getAllOrder,
  updateOrderInfo,
  updateOrder,
  generatePdf,
};
