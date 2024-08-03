import { Router } from "express";
import { ProductController } from "./products.controller";
import ValidationRequest from "../../middlewares/ZodValidation";
import { ProductValidations } from "./products.validation";

const router = Router();

router.post('/new', ValidationRequest(ProductValidations.createProductValidationSchema), ProductController.createProduct)

router.get('/:id', ProductController.getSingleProduct);
router.get('/', ProductController.getAllProducts);
router.put('/:id', ValidationRequest(ProductValidations.updateProductValidationSchema), ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)

export const ProductRoutes = router;