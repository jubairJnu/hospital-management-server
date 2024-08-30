import { Router } from "express";
import { OrderControllers } from "./order.controller";

const router = Router();

//post
router.post("/", OrderControllers.createOrder);

// get and serarch

router.get("/", OrderControllers.getAllOrder);

//

router.get("/pdf/:id", OrderControllers.generatePdf);

// update
router.patch("/update/:id", OrderControllers.updateOrderInfo);

router.patch("/:id", OrderControllers.updateOrder);

export const OrderRoutes = router;
