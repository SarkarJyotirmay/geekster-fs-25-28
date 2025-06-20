const express = require("express");

const { listProducts, createProduct } = require("../controllers/product.controller");
const authorizer = require("../middlewares/rbac");

const router = express.Router();

router.get("/list", listProducts);

router.post("/create", authorizer(["SELLER"]), createProduct);

module.exports = router;