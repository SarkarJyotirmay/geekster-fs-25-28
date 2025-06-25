const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");


const authMiddleware = require("./middlewares/auth");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const couponRoutes = require("./routes/coupon.route");
const orderRoutes = require("./routes/order.route");

const app = express();

dotenv.config();

const limit = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    message: {
        message: "API Limit exceeded",
        success: false
    }
});

// Middlewares
app.use(express.json());
app.use(limit);
app.use(cors({
    origin: "http://127.0.0.1:5501"
}));

// DB Connection
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log(`DB Connected successfully`))
    .catch(err => console.log(`DB Connection Error, ${err}`))

// Modular routes
app.use("/api/v1/user", userRoutes);
app.use(authMiddleware); // DO NOT MOVE THE MIDDLEWARE
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/order", orderRoutes);

const portNo = process.env.PORT_NO || 8080;

app.listen(portNo, () => console.log(`Server is up and running at port ${portNo}`));