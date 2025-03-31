import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import reviewsRoutes from "./routes/reviews.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import adminRoutes from "./routes/adminAuth.routes.js";
import notificationRoutes from "./routes/notifications.routes.js"
import dotenv from "dotenv";
import connectionToDb from "./db/database.js";

const app = express();

dotenv.config();

connectionToDb()
  .then(
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Connected to database on port: `, process.env.PORT || 5000);
    }),
    app.on("error", (error) => {
      console.error("Error: ", error);
    })
  )
  .catch((error) => {
    console.log(`DB connection failed:`, error);
  });

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes)
app.use("/api/notifications", notificationRoutes)
