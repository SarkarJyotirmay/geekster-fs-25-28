const CartModel = require("../models/cart.model");


// { _id: asdfasd, products: [], userId: asdf}


const addToCart = async (req, res) => {
    // Todo: Validate req.body
    /**
     * 1. Check if the user's cart already exits
     *  1.1 If yes, then append the product to products array in document
     *  1.2 If not, proceed to step 2
     * 2. Create a new cart document for the user
     */

    const cart = await CartModel.findOne({
        userId: req.user._id
    });
    // ??
    // console.log("USER =>", req.user);
    if (!cart) {
        // Create new cart
        // Cart Schema => {
        //     _id: asdfasdfasdf,
        //     products: [{productId: 123, qty: 3}, {productId: 456, qty: 1}],
        //     userId: asdfasdfsd
        // }
        //    REQ BODY =>     {
        //     "qty": 5,
        //     "productId": "6850228754bd943d03c1a986"
        // }
        const cartData = {
            products: [
                {
                    productId: req.body.productId,
                    qty: req.body.qty
                }
            ],
            userId: req.user._id
        };
        await CartModel.create(cartData);
    } else {
        // Update existing cart
    }
    console.log("CART =>", cart);

    // await CartModel.create(req.body);

    res.json({
        success: true,
        message: "Cart updated successfully"
    });
};

const cartController = {
    addToCart
};

module.exports = cartController;