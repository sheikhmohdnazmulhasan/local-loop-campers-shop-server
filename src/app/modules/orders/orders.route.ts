import { Router } from "express";
import { OrderControllers } from "./orders.controller";

const router = Router()

router.post('/', OrderControllers.createOrder);

export const OrderRouts = router;