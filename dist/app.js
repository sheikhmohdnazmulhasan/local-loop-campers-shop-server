"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const products_route_1 = require("./app/modules/products/products.route");
const orders_route_1 = require("./app/modules/orders/orders.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// application routes
app.use('/api/v1/products', products_route_1.ProductRoutes);
app.use('/api/v1/orders', orders_route_1.OrderRouts);
// global error handler
app.use((err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || 'Something Wrong';
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
});
app.all('*', (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        statusCode: http_status_1.default.NOT_FOUND,
        message: "Not Found",
    });
});
exports.default = app;
