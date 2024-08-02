import { NextFunction, Request, Response } from "express";
import { ProductServices } from "./products.services";

async function createProduct(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await ProductServices.createProductIntoDb(req.body, next)

        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
                error: result.error
            })
        }

    } catch (error) {
        next(error)
    }

}

export const ProductController = { createProduct }