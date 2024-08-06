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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const products_model_1 = __importDefault(require("../products/products.model"));
const filterOrders_1 = __importDefault(require("../../utils/filterOrders"));
const orders_model_1 = __importDefault(require("./orders.model"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
function createOrderIntoDb(payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        const filteredOrders = (0, filterOrders_1.default)(payload.orders);
        const dataForNewOrder = Object.assign(Object.assign({}, payload), { orders: filteredOrders, others: {
                track: Math.floor(Math.random() * 900000000000),
                status: 'processing'
            } });
        try {
            session.startTransaction();
            for (const order of payload.orders) {
                const product = yield products_model_1.default.findById(order.id).session(session);
                if (product) {
                    const updatedQuantity = product.quantity - order.quantity;
                    if (updatedQuantity < 0) {
                        throw new Error(`Not enough stock for product ${product.title}`);
                    }
                    yield products_model_1.default.findByIdAndUpdate(order.id, { quantity: updatedQuantity }).session(session);
                }
                else {
                    throw new Error(`Product with id ${order.id} not found`);
                }
            }
            const result = yield orders_model_1.default.create([dataForNewOrder], { session });
            yield session.commitTransaction();
            session.endSession();
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Order Placed successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            next(error);
        }
    });
}
function getOrdersFromDb(next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_model_1.default.find();
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Orders retrieve successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
function getSingleOrderFromDb(id, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_model_1.default.findById(id);
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Order retrieve successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteOrderFromDb(id, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_model_1.default.findByIdAndDelete(id);
            if (!result) {
                return {
                    success: false,
                    statusCode: http_status_1.default.OK,
                    message: 'Order Not Found',
                    data: null,
                    error: 'Order with the specified ID does not exist'
                };
            }
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Order delete successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
exports.OrderServices = { createOrderIntoDb, getOrdersFromDb, getSingleOrderFromDb, deleteOrderFromDb };
