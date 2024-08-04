import { Router } from "express";
import { OrderControllers } from "./orders.controller";
import ValidationRequest from "../../middlewares/ZodValidation";
import { OrderValidation } from "./orders.validation";

const router = Router()

router.post('/', ValidationRequest(OrderValidation.createOrdersValidationSchema), OrderControllers.createOrder);
router.get('/', OrderControllers.getOrders)

export const OrderRouts = router;