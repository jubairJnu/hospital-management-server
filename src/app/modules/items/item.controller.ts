import { NextFunction, Request, Response } from "express";
import { ItemServices } from "./item.services";

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ItemServices.createItemIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Item is created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//  get all

const getAllItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ItemServices.getAllItemFromDB();
    res.status(200).json({
      success: true,
      message: "Item is created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ItemControllers = {
  createItem,
  getAllItem,
};
