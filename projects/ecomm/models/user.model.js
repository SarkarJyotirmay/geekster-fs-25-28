const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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
    },
    jwt: {
        type: String,
        required: false,
        default: ""
    },
    role: {
        type: String,
        required: true,
        enum: ["CUSTOMER", "SELLER", "ADMIN"]
    },
    passwordOtp: {
        type: String,
        required: false,
        default: ""
    },
    otpExpiresAt: {
        type: Date,
        required: false,
        default: new Date()
    }
    // gender: {
    //     type: String,
    //     required: true,
    //     default: "O",
    //     enum: ["M", "F", "O"]
    // }
}, {
    timestamps: true
});

// DB Pre save hook
userSchema.pre("save", async function () {
    // req.body / The parameter passed to create() method = this
    // Convert pass into hash
    // Generate salt => To increase the complexity of the hash
    const salt = await bcrypt.genSalt(10);
    // console.log("SALT", salt); // Random sequence of alphnumeric chars
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;