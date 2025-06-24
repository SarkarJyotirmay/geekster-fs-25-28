const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const dayjs = require("dayjs");

const UserModel = require("../models/user.model");

dotenv.config();

const register = async (req, res) => {
    // Todo:  Write validation for req body
    await UserModel.create({
        ...req.body,
        role: "CUSTOMER"
    });
    res.json({
        succes: true,
        message: "Dummy resgister API"
    })
};

const login = async (req, res) => {
    // Match the email and password stored in db
    // Todo: Write the validations
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res
            .status(400)
            .json({
                success: false,
                message: "User not registered, please create an account first"
            });
    }
    const plainTextPassword = req.body.password; // User input
    const hashedPassword = user.password; // DB stored password

    const isPasswordMatched = await bcrypt.compare(plainTextPassword, hashedPassword);
    // console.log(isPasswordMatched);
    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Incorrect username or password"
        })
    }

    const jwtData = {
        id: user._id,
        email: user.email,
    };

    const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    });

    await UserModel.findByIdAndUpdate(user._id, {
        $set: {
            jwt: token
        }
    });

    // res.cookie("jwt", token); // To set jwt in browser cookie
    res.json({
        succes: true,
        message: "Logged in successfully",
        token: token// JWT (JSON Web Token)
    });
};

const forgotPassword = async (req, res) => {
    /**
     * 1. Generate OTP 4 digit
     * 2. Store it in DB
     * 3. Send it on email
     */

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res
            .status(400)
            .json({
                success: false,
                message: "User not registered"
            });
    }

    const otp = Math.floor(Math.random() * 10000);
    console.log(otp);

    const otpExpiresAt = dayjs().add("5", "minutes").toDate();
    console.log(otpExpiresAt)
    await UserModel.findByIdAndUpdate(user._id, {
        $set: {
            passwordOtp: otp,
            otpExpiresAt
        }
    });

    // Send the otp email 
    res.json({
        succes: true,
        message: "OTP sent on mail"
    })
};

const resetPassword = async (req, res) => {
    /**
     * 1. Find if the user is valid with otp and email
     * 2. If the otp is not expired
     * 3. Change the password
     */

    const user = await UserModel.findOne({
        email: req.body.email,
        passwordOtp: req.body.otp
    });

    const currentTime = dayjs();
    const otpExpiry = dayjs(user.otpExpiresAt);
    if (currentTime.isAfter(otpExpiry)) {
        return res
            .json({
                success: false,
                message: "OTP Expired"
            })
    }

    if (!user) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Invalid user"
            });
    }

    
    const arePassSame = bcrypt.compareSync(req.body.newPassword, user.password);
    if(arePassSame) {
        return res
        .status(400)
        .json({
            succes: false,
            message: "Old password and new password can't be the same"
        })
    }
    // Todo: Hash the new password and $set in password field, DELETE THE OTP FROM DB
    res.json({
        succes: true,
        message: "Dummy reset password API"
    })
};

const changePassword = async (req, res) => {
    //Todo: Hash the password and $set it in password field
    res.json({
        success: false,
        message: "Change password"
    })
};

const userController = {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword
};

module.exports = userController;