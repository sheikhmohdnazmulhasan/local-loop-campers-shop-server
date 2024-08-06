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

};

async function getAllProducts(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await ProductServices.getAllProductsFromDb(req.query, next);

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
};

async function getSingleProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const result = await ProductServices.getSingleProductFromDb(id, next);

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
};

async function updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const payload = req.body;

    try {
        const result = await ProductServices.updateProductIntoDb(id, payload, next);

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

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;

    try {
        const result = await ProductServices.deleteProductFromDb(id as string, next);

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

export const ProductController = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct }