const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: false,
            default: ""
        },
        landmark: {
            type: String,
            required: false,
            default: ""
        },
        city: {
            type: String,
            requried: true
        },
        state: {
            type: String,
            requried: true
        },
        pincode: {
            type: String,
            requried: true
        },
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;