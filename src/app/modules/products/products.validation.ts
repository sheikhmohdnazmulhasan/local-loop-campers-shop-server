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

export const ProductValidations = { createProductValidationSchema }