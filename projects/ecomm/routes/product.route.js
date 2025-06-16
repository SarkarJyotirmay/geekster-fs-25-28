const express = require("express");

const { listProducts, createProduct } = require("../controllers/product.controller");

const router = express.Router();

router.get("/list", listProducts);

router.post("/create", createProduct);

module.exports = router;