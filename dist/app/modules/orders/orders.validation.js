"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    country: zod_1.z.string(),
    city: zod_1.z.string(),
    phone: zod_1.z.string().regex(/^\d+$/), // Assuming phone number consists of digits only
    post_code: zod_1.z.string(),
    name: zod_1.z.string()
});
// Define the Order schema
const orderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    img: zod_1.z.string().url(),
    stock: zod_1.z.number().min(0),
    quantity: zod_1.z.number().min(1),
    payable: zod_1.z.number().min(0)
});
// Define the UserOrders schema
const createOrdersValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: userSchema,
        orders: zod_1.z.array(orderSchema)
    })
});
exports.OrderValidation = { createOrdersValidationSchema };
