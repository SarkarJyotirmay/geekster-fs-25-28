const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    // eligibleCategories: {
    //     type: [String]
    // },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    minOrderValue: {
        type: Number,
        required: true
    },
    maxDiscountValue: {
        type: Number,
        required: true
    }
});

const CouponModel = mongoose.model("coupons", couponSchema);

module.exports = CouponModel;