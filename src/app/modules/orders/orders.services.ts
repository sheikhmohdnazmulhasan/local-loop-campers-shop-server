import { NextFunction } from "express";
import Product from "../products/products.model";
import { TUserOrders } from "./orders.interface";
import filterOrders from "../../utils/filterOrders";
import Order from "./orders.model";
import httpStatus from "http-status";

async function createOrderIntoDb(payload: TUserOrders, next: NextFunction) {
    const filteredOrders = filterOrders(payload.orders);
    const dataForNewOrder = { ...payload, orders: filteredOrders };

    try {

        payload.orders.forEach(async (order) => {
            const updatedQuantity: number = order.stock - order.quantity;
            await Product.findByIdAndUpdate(order.id, { quantity: updatedQuantity });
        });

        const result = await Order.create(dataForNewOrder);

        return { success: true, statusCode: httpStatus.OK, message: 'Order Placed successfully', data: result, error: null };

    } catch (error) {
        next(error);
    }

}

export const OrderServices = { createOrderIntoDb }