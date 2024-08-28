import express from "express";
import cors from 'cors';
import { GlobalErrorHandler } from "./app/middlewars/GlobalErrorhandler";
import { OrderRoutes } from "./app/modules/order/order.routes";
import { ItemRoutes } from "./app/modules/items/items.routes";
const app = express();

//parser
app.use(express.json());
app.use(cors());

//  application route

app.use("/order", OrderRoutes);
app.use("/item", ItemRoutes);



app.use(GlobalErrorHandler);

export default app;
