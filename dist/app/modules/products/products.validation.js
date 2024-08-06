"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        category: zod_1.z.string(),
        quantity: zod_1.z.number(),
        price: zod_1.z.number(),
        images: zod_1.z.array(zod_1.z.string())
    })
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional()
    })
});
exports.ProductValidations = { createProductValidationSchema, updateProductValidationSchema };
