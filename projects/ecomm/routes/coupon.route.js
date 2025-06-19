const express = require("express");

const {
    createCoupon
} = require("../controllers/coupon.controller");

const router = express.Router();


router.post("/create", createCoupon);

module.exports = router;