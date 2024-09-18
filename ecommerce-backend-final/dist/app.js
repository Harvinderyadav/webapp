import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import Stripe from "stripe";
import morgan from "morgan";
import cors from "cors";
//morgan. cors
import userRoute from './routes/user.js';
import productRoute from './routes/products.js';
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
config({
    path: "./.env",
});
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDB(mongoURI);
export const myCache = new NodeCache();
export const stripe = new Stripe(stripeKey);
const app = express();
//destructure
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.get("/", (req, res) => {
    res.send("everythiing is fine here");
});
//Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);
//error handeling
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
