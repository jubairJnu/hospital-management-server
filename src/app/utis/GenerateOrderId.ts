import { Item } from "../modules/items/items.model";
import { Order } from "../modules/order/order.model";

const findLastOrderId = async () => {
  const lastOrder = await Order.findOne(
    {},
    {
      orderId: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastOrder?.orderId ? lastOrder.orderId : undefined;
};

export const generateOrderId = async () => {
  let currentId = (0).toString();
  const lastOrderid = await findLastOrderId();

  if (lastOrderid) {
    currentId = lastOrderid.substring(2);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(3, "0");

  return incrementId;
};

//

// generate item id

const findLastItemId = async () => {
  const lastOrder = await Item.findOne(
    {},
    {
      itemId: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastOrder?.itemId ? lastOrder.itemId : undefined;
};

export const generateItemId = async () => {
  let currentId = (0).toString();
  const lastItemid = await findLastItemId();

  if (lastItemid) {
    currentId = lastItemid.substring(2);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(3, "0");

  return incrementId;
};
