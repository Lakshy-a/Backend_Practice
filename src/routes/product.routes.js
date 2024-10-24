import express from "express";
import getAllProducts from "../controllers/productControllers/getAllProducts.controller.js";
import getProductsById from "../controllers/productControllers/getproductById.controller.js";
import getProductsByCategory from "../controllers/productControllers/getProductsByCategory.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import postNewProduct from "../controllers/productControllers/postNewProduct.controller.js";
import deleteProduct from "../controllers/productControllers/deleteProduct.controller.js";

const router = express.Router();
import upload from "../middlewares/upload.middleware.js";

router.get("/allProduct", isLoggedIn, getAllProducts);
router.get("/productsById/:_id", isLoggedIn, getProductsById);
router.get(
  "/productsByCategory/:category",
  isLoggedIn,
  getProductsByCategory
);
router.post("/addProduct", upload.array("productImages"), isLoggedIn, postNewProduct);
router.delete("/deleteProduct/:_id", isLoggedIn, deleteProduct);

export default router;
