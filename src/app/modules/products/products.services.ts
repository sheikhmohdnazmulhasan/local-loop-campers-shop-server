import { NextFunction } from "express";
import { TProducts } from "./products.interface";
import Product from "./products.model";
import httpStatus from "http-status";

async function createProductIntoDb(payload: TProducts, next: NextFunction) {

    try {
        const result = await Product.create(payload);

        return {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product created successfully',
            data: result,
            error: null
        };

    } catch (error) {
        next(error)

    }
};

async function getAllProductsFromDb(category: string | undefined, next: NextFunction) {

    try {

        if (category) {
            const result = await Product.find({ category })

            return {
                success: true,
                statusCode: httpStatus.OK,
                message: 'Products retrieve successfully',
                data: result,
                error: null
            };
        }

        const result = await Product.find();

        return {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Products retrieve successfully',
            data: result,
            error: null
        };

    } catch (error) {
        next(error)
    }
}

async function getSingleProductFromDb(id: string, next: NextFunction) {

    try {
        const result = await Product.findById(id);

        if (!result) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Id not valid',
                data: null,
                error: null
            };
        }

        return {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product retrieve successfully',
            data: result,
            error: null
        };

    } catch (error) {
        next(error)
    }

};

async function updateProductIntoDb(id: string, payload: Partial<TProducts>, next: NextFunction) {

    try {
        const isValidId = await Product.findById(id);

        if (!isValidId) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Id not valid',
                data: null,
                error: null
            };
        }

        const result = await Product.findByIdAndUpdate(id, payload, { new: true });

        return {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product Updated successfully',
            data: result,
            error: null
        };

    } catch (error) {
        next(error)
    }

}

async function deleteProductFromDb(id: string, next: NextFunction) {

    try {

        const isValidId = await Product.findById(id);

        if (!isValidId) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Id not valid',
                data: null,
                error: null
            };
        }

        const result = await Product.findByIdAndDelete(id);

        return { success: true, statusCode: httpStatus.OK, message: 'Product deleted successfully', data: result, error: null };

    } catch (error) {
        next(error)
    }

}

export const ProductServices = { createProductIntoDb, getAllProductsFromDb, getSingleProductFromDb, updateProductIntoDb, deleteProductFromDb }