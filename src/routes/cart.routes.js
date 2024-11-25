import express from "express";
import addToCart from "../controllers/cartControllers/addToCart.controller.js";
import getUsersCart from "../controllers/cartControllers/getUsersCart.controller.js";
import updateCartItemQuantity from "../controllers/cartControllers/updateCartItemQuantity.controller.js";
import clearCart from "../controllers/cartControllers/clearCart.controller.js";
import removeProductFromCart from "../controllers/cartControllers/removeProductFromCart.controller.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.get("/getUsersCart", getUsersCart);
router.patch("/updateCartItemQuantity", updateCartItemQuantity);
router.delete("/removeProductFromCart", removeProductFromCart);
router.delete("/clearCart", clearCart);

export default router;
