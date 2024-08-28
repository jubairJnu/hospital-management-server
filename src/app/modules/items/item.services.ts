import { generateItemId } from "../../utis/GenerateOrderId";
import { TItems } from "./items.interface";
import { Item } from "./items.model";

const createItemIntoDB = async (payload: TItems) => {
  payload.itemId = await generateItemId();

  const result = await Item.create(payload);
  return result;
};

// get alll

const getAllItemFromDB = async () => {
  const result = await Item.find();
  return result;
};

export const ItemServices = {
  createItemIntoDB,
  getAllItemFromDB,
};
