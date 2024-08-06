"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const orders_services_1 = require("./orders.services");
function createOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_services_1.OrderServices.createOrderIntoDb(req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                    error: result.error
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function getOrders(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_services_1.OrderServices.getOrdersFromDb(next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                    error: result.error
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function getSingleOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield orders_services_1.OrderServices.getSingleOrderFromDb(id, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                    error: result.error
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.query;
        try {
            const result = yield orders_services_1.OrderServices.deleteOrderFromDb(id, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                    error: result.error
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.OrderControllers = { createOrder, getOrders, getSingleOrder, deleteOrder };
