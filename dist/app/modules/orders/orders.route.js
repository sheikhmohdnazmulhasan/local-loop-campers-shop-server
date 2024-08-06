"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouts = void 0;
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const ZodValidation_1 = __importDefault(require("../../middlewares/ZodValidation"));
const orders_validation_1 = require("./orders.validation");
const router = (0, express_1.Router)();
router.post('/', (0, ZodValidation_1.default)(orders_validation_1.OrderValidation.createOrdersValidationSchema), orders_controller_1.OrderControllers.createOrder);
router.get('/:id', orders_controller_1.OrderControllers.getSingleOrder);
router.get('/', orders_controller_1.OrderControllers.getOrders);
router.delete('/', orders_controller_1.OrderControllers.deleteOrder);
exports.OrderRouts = router;
