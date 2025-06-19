const createCoupon = async (req,res) => {
    res.json({
        success: true,
        message: "Dummy create coupon api"
    });
};

const couponController = {
    createCoupon
};

module.exports = couponController;