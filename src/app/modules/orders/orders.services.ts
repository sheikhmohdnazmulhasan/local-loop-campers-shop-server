import { NextFunction } from "express";
import Product from "../products/products.model";
import { TUserOrders } from "./orders.interface";
import filterOrders from "../../utils/filterOrders";
import Order from "./orders.model";
import httpStatus from "http-status";
import mongoose from "mongoose";

async function createOrderIntoDb(payload: TUserOrders, next: NextFunction) {
    const session = await mongoose.startSession();
    const filteredOrders = filterOrders(payload.orders);

    const dataForNewOrder = {
        ...payload,
        orders: filteredOrders,
        others: {
            track: Math.floor(Math.random() * 900000000000),
            status: 'processing'
        }
    };

    try {
        session.startTransaction();

        for (const order of payload.orders) {
            const product = await Product.findById(order.id).session(session);

            if (product) {
                const updatedQuantity: number = product.quantity - order.quantity;
                if (updatedQuantity < 0) {
                    throw new Error(`Not enough stock for product ${product.title}`);
                }
                await Product.findByIdAndUpdate(order.id, { quantity: updatedQuantity }).session(session);
            } else {
                throw new Error(`Product with id ${order.id} not found`);
            }
        }

        const result = await Order.create([dataForNewOrder], { session });

        await session.commitTransaction();
        session.endSession();

        return { success: true, statusCode: httpStatus.OK, message: 'Order Placed successfully', data: result, error: null };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

async function getOrdersFromDb(next: NextFunction) {

    try {
        const result = await Order.find().populate({
            path: 'orders',
            model: 'Product'
        })

        return { success: true, statusCode: httpStatus.OK, message: 'Orders retrieve successfully', data: result, error: null };

    } catch (error) {
        next(error)
    }
}

async function getSingleOrderFromDb(id: string, next: NextFunction) {

    try {
        const result = await Order.findById(id);

        return { success: true, statusCode: httpStatus.OK, message: 'Order retrieve successfully', data: result, error: null };

    } catch (error) {
        next(error)
    }
}

export const OrderServices = { createOrderIntoDb, getOrdersFromDb, getSingleOrderFromDb };
