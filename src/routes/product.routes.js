import express from "express";
import getAllProducts from "../controllers/productControllers/getAllProducts.controller.js";
import getProductsById from "../controllers/productControllers/getproductById.controller.js";
import getProductsByCategory from "../controllers/productControllers/getProductsByCategory.js";
import postNewProduct from "../controllers/productControllers/postNewProduct.controller.js";
import deleteProduct from "../controllers/productControllers/deleteProduct.controller.js";

const router = express.Router();
import upload from "../middlewares/upload.middleware.js";
import restoreProduct from "../controllers/productControllers/restoreProduct.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import { whatRole } from "../middlewares/whatRole.middleware.js";

router.get("/allProduct", getAllProducts);
router.get("/productsById/:_id", getProductsById);
router.get("/productsByCategory/:category", getProductsByCategory);
router.post("/addProduct", isLoggedIn, upload.array("productImages"), postNewProduct);
router.delete(`/deleteProduct/:_id`, isLoggedIn, whatRole("admin"), deleteProduct);
router.post("/restoreProduct/:_id", isLoggedIn, whatRole("admin"), restoreProduct);

export default router;
