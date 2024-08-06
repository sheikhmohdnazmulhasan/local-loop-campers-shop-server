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
exports.ProductController = void 0;
const products_services_1 = require("./products.services");
function createProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield products_services_1.ProductServices.createProductIntoDb(req.body, next);
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
;
function getAllProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield products_services_1.ProductServices.getAllProductsFromDb(req.query, next);
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
;
function getSingleProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield products_services_1.ProductServices.getSingleProductFromDb(id, next);
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
;
function updateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const payload = req.body;
        try {
            const result = yield products_services_1.ProductServices.updateProductIntoDb(id, payload, next);
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
function deleteProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.query;
        try {
            const result = yield products_services_1.ProductServices.deleteProductFromDb(id, next);
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
exports.ProductController = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };
