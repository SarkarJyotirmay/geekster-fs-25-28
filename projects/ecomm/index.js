const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

const app = express();

dotenv.config();

// Middlewares
app.use(express.json());

//// IGNORE BELOW BLOCK
const cors = require("cors");
app.use(cors());

// DB Connection
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log(`DB Connected successfully`))
    .catch(err => console.log(`DB Connection Error, ${err}`))

// Modular routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

const portNo = process.env.PORT_NO || 8080;

app.listen(portNo, () => console.log(`Server is up and running at port ${portNo}`));