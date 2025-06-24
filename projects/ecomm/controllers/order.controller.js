const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween")

const CartModel = require("../models/cart.model");
const CouponModel = require("../models/coupon.model");
const ProductModel = require("../models/product.model");
const OrderModel = require("../models/order.model");

dayjs.extend(isBetween);

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
        .findOne({ userId: req.user._id }, { products: 1, _id: 1 })
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
    console.log(total);
    // Coupon calculations

    let finalDiscount = 0;
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

        if (total < coupon.minOrderValue) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: `Min order value for this coupon is ${coupon.minOrderValue}`
                })
        }

        const startDate = dayjs(coupon.startDate);
        const endDate = dayjs(coupon.endDate);
        const currentDate = dayjs();

        const isCouponDateInBetween = currentDate.isBetween(startDate, endDate);
        if (!isCouponDateInBetween) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Coupon is expired or to be used in future"
                });
        }
        const discount = (total * coupon.discountPercentage) / 100;
        const maxDiscount = coupon.maxDiscountValue;
        finalDiscount = Math.min(discount, maxDiscount);
        console.log(finalDiscount);
    }

    const grandTotal = total - finalDiscount;

    // Reduce the qty of the items purchased
    for (let product of userCart.products) {
        console.log(product.productId._id, product.qty);
        await ProductModel.findByIdAndUpdate(product.productId._id, {
            $inc: {
                stock: -product.qty
            }
        })
    }

    // Payment modes
    if (req.body.paymentMode === "ONLINE") {
        // Redirect the user to payment gateway and return the response
    }

    // Store order data in db
    await OrderModel.create({
        products: userCart.products,
        coupon: req.body.coupon,
        user: req.user._id,
        modeOfPayment: req.body.paymentMode,
        orderTotal: grandTotal,
        orderStatus: req.body.paymentMode === "ONLINE" ? "PAYMENT_PENDING" : "IN_TRANSIT",
        deliveryAddress: req.user.address
    });
    
    await CartModel.findByIdAndDelete(userCart._id);

    res.json({
        success: true,
        message: "Order placed successfully",
    });
};

const orderController = {
    createOrder
};

module.exports = orderController;