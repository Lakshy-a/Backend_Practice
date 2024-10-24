import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import reviewsRoutes from "./routes/reviews.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import adminRoutes from "./routes/adminAuth.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);

export { app };
