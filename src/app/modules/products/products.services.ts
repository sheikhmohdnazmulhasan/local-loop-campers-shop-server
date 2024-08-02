import { NextFunction } from "express";
import { TProducts } from "./products.interface";
import Product from "./products.model";
import httpStatus from "http-status";

async function createProductIntoDb(payload: TProducts, next: NextFunction) {

    try {
        const result = await Product.create(payload);

        return { success: true, statusCode: httpStatus.OK, message: 'Product created successfully', data: result, error: null };

    } catch (error) {
        next(error)

    }
};

async function getAllProductsFromDb(category: string | undefined, next: NextFunction) {

    try {

        if (category) {
            const result = await Product.find({ category })
            return { success: true, statusCode: httpStatus.OK, message: 'Products retrieve successfully', data: result, error: null };
        }

        const result = await Product.find();

        return { success: true, statusCode: httpStatus.OK, message: 'Products retrieve successfully', data: result, error: null };

    } catch (error) {
        next(error)
    }
}

async function getSingleProductFromDb(id: string, next: NextFunction) {

    try {
        const result = await Product.findById(id);

        return { success: true, statusCode: httpStatus.OK, message: 'Product retrieve successfully', data: result, error: null };

    } catch (error) {
        next(error)
    }

}

export const ProductServices = { createProductIntoDb, getAllProductsFromDb, getSingleProductFromDb }