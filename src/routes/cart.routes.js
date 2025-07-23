import express from "express";
import addToCart from "../controllers/cartControllers/addToCart.controller.js";
import getUsersCart from "../controllers/cartControllers/getUsersCart.controller.js";
import increaseProductItemIncart from "../controllers/cartControllers/increaseProductItemIncart.controller.js";
import clearCart from "../controllers/cartControllers/clearCart.controller.js";
import removeProductFromCart from "../controllers/cartControllers/removeProductFromCart.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import { decreaseProductItemIncart } from "../controllers/cartControllers/decreaseProductIncart.controller.js";

const router = express.Router();

router.post("/addToCart", isLoggedIn, addToCart);
router.get("/getUsersCart", isLoggedIn, getUsersCart);
router.patch("/increaseProductItemIncart", isLoggedIn, increaseProductItemIncart);
router.patch("/decreaseProductItemIncart", isLoggedIn, decreaseProductItemIncart);
router.delete("/removeProductFromCart", isLoggedIn, removeProductFromCart);
router.delete("/clearCart", isLoggedIn, clearCart);

export default router;
