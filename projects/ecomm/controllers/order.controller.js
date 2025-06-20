const CartModel = require("../models/cart.model");
const CouponModel = require("../models/coupon.model");

const createOrder = async (req, res) => {
    /**
     * 0. Get the products from user cart
     *  0.1 If cart is empty, throw error
     *  0.2 If cart is not empty, then proceed to step 1
     * 1. Check the inventory of the products ordered
     *  1.1 If items are OOS, then throw error
     *  1.2 If items are available proceed to step 2
     * 2. Calculate the total of the order
     * 3. Check for coupon
     *  3.1 If not applied proceed to step 4
     *  3.2 If applied, validate the coupon and apply the discount
     * 4. Check payment method
     *  4.1 If COD/POD proceed to step 5
     *  4.2 If Online, then redirect the user to payment gateway - Decide order status
     * 5. Reduce the stock of the products ordered
     * 6. Store the data in order collection / create a new order - Save an order status
     * 7. Delete the user cart/remove all products from user cart
     * 8. Send order confirmation email/sms
     */

    const userCart = await CartModel
        .findOne({ userId: req.user._id }, { products: 1, _id: 0 })
        .populate("products.productId");

    if (!userCart) {
        // Cart is empty
        return res
            .status(400)
            .json({
                success: false,
                message: "Cart is empty, please add products to cart before placing an order"
            });
    }

    // console.log(userCart);

    // Check stock avalability

    const productsAvailable = userCart.products.every(p => p.productId.stock >= p.qty);

    if (!productsAvailable) {
        return res
            .status(400)
            .json({
                success: false,
                message: "One or more items are out of stock"
            });
    }

    const total = userCart.products.reduce((acc, cv) => acc + (cv.productId.price * cv.qty), 0);

    // Coupon calculations

    if (req.body.coupon) {
        const coupon = await CouponModel.findOne({ code: req.body.coupon });
        if (!coupon) {
            // Invalid coupon
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid coupon code"
                });
        }
        /**
         * Check following - 
         *  1. Min order value
         *  2. Coupon start and end date
         *  3. Calculate max discount
         */
    }

    res.json({
        success: true,
        message: "Place order API",
        data: userCart
    });
};

const orderController = {
    createOrder
};

module.exports = orderController;