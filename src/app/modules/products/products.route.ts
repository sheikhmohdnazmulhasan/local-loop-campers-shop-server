import { Router } from "express";
import { ProductController } from "./products.controller";
import ValidationRequest from "../../middlewares/ZodValidation";
import { ProductValidations } from "./products.validation";

const router = Router();

router.post('/new', ValidationRequest(ProductValidations.createProductValidationSchema), ProductController.createProduct)

router.get('/', ProductController.getAllProducts)

export const ProductRoutes = router;