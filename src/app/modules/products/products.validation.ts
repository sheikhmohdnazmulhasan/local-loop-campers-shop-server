import { z } from "zod";

const createProductValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        quantity: z.number(),
        price: z.number(),
        images: z.array(z.string())
    })
})

const updateProductValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        images: z.array(z.string()).optional()
    })
})

export const ProductValidations = { createProductValidationSchema, updateProductValidationSchema }