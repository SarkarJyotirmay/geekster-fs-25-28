const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./route/job.routes");

const app = express();

// Middleware
app.use(express.json());

// Connection with MongoDB
// mongodb://server:port/db_name
mongoose
    .connect("mongodb+srv://djain7429:Pa9F5adkSXR2NLJu@cluster0.wbipcdx.mongodb.net/")
    .then(() => console.log(`DB Connected successfully`))
    .catch(err => console.log(`Error connecting database`, err));


// Routes
app.use("/api/v1/job", jobRoutes);

const portNo = 8080;

app.listen(portNo, () => console.log(`Server is up and running at port ${portNo}`));