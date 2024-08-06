"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const ZodValidation_1 = __importDefault(require("../../middlewares/ZodValidation"));
const products_validation_1 = require("./products.validation");
const router = (0, express_1.Router)();
router.post('/new', (0, ZodValidation_1.default)(products_validation_1.ProductValidations.createProductValidationSchema), products_controller_1.ProductController.createProduct);
router.get('/:id', products_controller_1.ProductController.getSingleProduct);
router.get('/', products_controller_1.ProductController.getAllProducts);
router.put('/:id', (0, ZodValidation_1.default)(products_validation_1.ProductValidations.updateProductValidationSchema), products_controller_1.ProductController.updateProduct);
router.delete('/', products_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
