import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./orders.services";

async function createOrder(req: Request, res: Response, next: NextFunction) {

    const result = OrderServices.createOrderIntoDb(req.body);
}

export const OrderControllers = { createOrder }