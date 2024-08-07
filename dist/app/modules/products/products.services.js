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
exports.ProductServices = void 0;
const products_model_1 = __importDefault(require("./products.model"));
const http_status_1 = __importDefault(require("http-status"));
function createProductIntoDb(payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield products_model_1.default.create(payload);
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Product created successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
;
function getAllProductsFromDb(query, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let searchTerm = null;
        let category = null;
        let minPrice = null;
        let maxPrice = null;
        let sortOrder = 'asc';
        if (query === null || query === void 0 ? void 0 : query.searchTerm)
            searchTerm = query.searchTerm;
        if (query === null || query === void 0 ? void 0 : query.category)
            category = query.category;
        if (query === null || query === void 0 ? void 0 : query.minPrice)
            minPrice = Number(query.minPrice);
        if (query === null || query === void 0 ? void 0 : query.maxPrice)
            maxPrice = Number(query.maxPrice);
        if (query === null || query === void 0 ? void 0 : query.sortOrder)
            sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';
        let filter = {};
        if (searchTerm) {
            filter.$or = [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ];
        }
        if (category) {
            filter.category = category;
        }
        if (minPrice !== null && maxPrice !== null) {
            filter.price = { $gte: minPrice, $lte: maxPrice };
        }
        else if (minPrice !== null) {
            filter.price = { $gte: minPrice };
        }
        else if (maxPrice !== null) {
            filter.price = { $lte: maxPrice };
        }
        try {
            const result = yield products_model_1.default.find(filter).sort({ price: sortOrder });
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Products retrieve successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
function getSingleProductFromDb(id, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield products_model_1.default.findById(id);
            if (!result) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Id not valid',
                    data: null,
                    error: null
                };
            }
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Product retrieve successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
;
function updateProductIntoDb(id, payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isValidId = yield products_model_1.default.findById(id);
            if (!isValidId) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Id not valid',
                    data: null,
                    error: null
                };
            }
            const result = yield products_model_1.default.findByIdAndUpdate(id, payload, { new: true });
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Product Updated successfully',
                data: result,
                error: null
            };
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteProductFromDb(id, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isValidId = yield products_model_1.default.findById(id);
            if (!isValidId) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Id not valid',
                    data: null,
                    error: null
                };
            }
            const result = yield products_model_1.default.findByIdAndDelete(id);
            return { success: true, statusCode: http_status_1.default.OK, message: 'Product deleted successfully', data: result, error: null };
        }
        catch (error) {
            next(error);
        }
    });
}
exports.ProductServices = { createProductIntoDb, getAllProductsFromDb, getSingleProductFromDb, updateProductIntoDb, deleteProductFromDb };
