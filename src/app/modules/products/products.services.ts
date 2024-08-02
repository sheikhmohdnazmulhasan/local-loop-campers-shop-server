import { NextFunction } from "express";
import { TProducts } from "./products.interface";
import Product from "./products.model";
import httpStatus from "http-status";

async function createProductIntoDb(payload: TProducts, next: NextFunction) {

    try {
        const result = await Product.create(payload);

        return { success: true, statusCode: httpStatus.OK, message: 'Product created successfully', data: result, error: null };

    } catch (error) {
        return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Something Wrong', data: null, error };

    }
}

export const ProductServices = { createProductIntoDb }