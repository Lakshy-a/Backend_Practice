import express from "express";
import getAllProducts from "../controllers/productControllers/getAllProducts.controller.js";
import getProductsById from "../controllers/productControllers/getproductById.controller.js";
import getProductsByCategory from "../controllers/productControllers/getProductsByCategory.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import postNewProduct from "../controllers/productControllers/postNewProduct.controller.js";
import deleteProduct from "../controllers/productControllers/deleteProduct.controller.js";

const router = express.Router();
import upload from "../middlewares/upload.middleware.js";
import restoreProduct from "../controllers/productControllers/restoreProduct.controller.js";

router.get("/allProduct", getAllProducts);
router.get("/productsById/:_id", getProductsById);
router.get("/productsByCategory/:category", getProductsByCategory);
router.post(
  "/addProduct",
  upload.array("productImages"),
  postNewProduct
);
router.delete("/deleteProduct/:_id", isLoggedIn, deleteProduct);
router.post("/restoreProduct/:_id", isLoggedIn, restoreProduct);

export default router;
