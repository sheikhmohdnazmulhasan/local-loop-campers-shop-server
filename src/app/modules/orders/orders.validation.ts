import { z } from "zod";

const userSchema = z.object({
    email: z.string().email(),
    country: z.string(),
    city: z.string(),
    phone: z.string().regex(/^\d+$/), // Assuming phone number consists of digits only
    post_code: z.string(),
    name: z.string()
});

// Define the Order schema
const orderSchema = z.object({
    id: z.string(),
    title: z.string(),
    img: z.string().url(),
    stock: z.number().min(0),
    quantity: z.number().min(1),
    payable: z.number().min(0)
});

// Define the UserOrders schema
const createOrdersValidationSchema = z.object({
    body: z.object({
        user: userSchema,
        orders: z.array(orderSchema)
    })
});

export const OrderValidation = { createOrdersValidationSchema }