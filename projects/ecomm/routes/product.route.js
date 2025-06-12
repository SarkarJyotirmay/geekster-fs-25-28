const express = require("express");

const { listProducts } = require("../controllers/product.controller");

const router = express.Router();

router.get("/list", listProducts);

module.exports = router;