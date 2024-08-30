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
  let currentId = "0";
  const lastOrderid = await findLastOrderId();

  if (lastOrderid) {
    currentId = lastOrderid;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(3, "0");
 

  return incrementId;
};

//

// generate item id

const findLastItemId = async () => {
  const lastItem = await Item.findOne(
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

  return lastItem?.itemId ? lastItem.itemId : undefined;
};

export const generateItemId = async () => {
  let currentId = "0";
  const lastItemid = await findLastItemId();

  if (lastItemid) {
    currentId = lastItemid;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(3, "0");
  console.log("incre", incrementId);

  return incrementId;
};
