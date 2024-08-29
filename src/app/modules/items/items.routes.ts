import { Router } from "express";
import { ItemControllers } from "./item.controller";

const router = Router();

// create

router.post("/", ItemControllers.createItem);

// get all

router.get("/", ItemControllers.getAllItem);

export const ItemRoutes = router;
