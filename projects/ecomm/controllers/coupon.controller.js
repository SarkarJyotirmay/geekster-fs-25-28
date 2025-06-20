const CouponModel = require("../models/coupon.model");

const createCoupon = async (req, res) => {
    // Todo : Write your validations here
    await CouponModel.create(req.body);
    res.json({
        success: true,
        message: "Coupon created successfully"
    });
};

const listCoupons = async (req, res) => {
    const coupons = await CouponModel.find(); // Todo: Add pagination
    res.json({
        success: true,
        message: "Coupon list",
        data: coupons
    });
};

const couponController = {
    createCoupon,
    listCoupons
};

module.exports = couponController;