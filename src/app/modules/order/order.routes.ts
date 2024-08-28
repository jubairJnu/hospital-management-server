import { Router } from "express";
import { OrderControllers } from "./order.controller";

const router = Router();

//post
router.post("/", OrderControllers.createOrder);

// get and serarch

router.get("/", OrderControllers.getAllOrder);

// update
router.patch("/:id", OrderControllers.updateOrder);

export const OrderRoutes = router;
