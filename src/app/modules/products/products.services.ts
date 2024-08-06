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

async function getAllProductsFromDb(query: Record<string, unknown>, next: NextFunction) {
    let searchTerm: string | null = null;
    let category: string | null = null;
    let minPrice: number | null = null;
    let maxPrice: number | null = null;
    let sortOrder: 'asc' | 'desc' = 'asc';

    if (query?.searchTerm) searchTerm = query.searchTerm as string;
    if (query?.category) category = query.category as string;
    if (query?.minPrice) minPrice = Number(query.minPrice);
    if (query?.maxPrice) maxPrice = Number(query.maxPrice);
    if (query?.sortOrder) sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';

    let filter: Record<string, unknown> = {};

    if (searchTerm) {
        filter.$or = [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } }
        ];
    }

    if (category) {
        filter.category = category;
    }

    if (minPrice !== null && maxPrice !== null) {
        filter.price = { $gte: minPrice, $lte: maxPrice };

    } else if (minPrice !== null) {
        filter.price = { $gte: minPrice };

    } else if (maxPrice !== null) {
        filter.price = { $lte: maxPrice };
    }

    try {
        const result = await Product.find(filter).sort({ price: sortOrder });

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