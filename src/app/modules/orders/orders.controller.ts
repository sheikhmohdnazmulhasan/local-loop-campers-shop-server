import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./orders.services";

async function createOrder(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await OrderServices.createOrderIntoDb(req.body, next);

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
        next(error);
    }
}

async function getOrders(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await OrderServices.getOrdersFromDb(next);

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

async function getSingleOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const result = await OrderServices.getSingleOrderFromDb(id, next);

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
        next(error);
    }
}

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;

    try {
        const result = await OrderServices.deleteOrderFromDb(id as string, next);

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

export const OrderControllers = { createOrder, getOrders, getSingleOrder, deleteOrder }