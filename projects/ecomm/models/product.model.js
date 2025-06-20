const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 9999,
        // validate: () => Promise.resolve()
        // Validation
    },
    discountPercentage: {
        type: Number,
        required: false,
        default: 0
    },
    rating: {
        type: Number,
        required: false,
        default: -1
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    // userId: {
    //     type: mongoose.Types.ObjectId, // _id of seller
    //     ref: "users"
    // }
},
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;