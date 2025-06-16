const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const UserModel = require("../models/user.model");

dotenv.config();

const register = async (req, res) => {
    // Todo:  Write validation for req body
    await UserModel.create(req.body);
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
        email: user.email
    };

    const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    });

    // res.cookie("jwt", token); // To set jwt in browser cookie
    res.json({
        succes: true,
        message: "Logged in successfully",
        token: token// JWT (JSON Web Token)
    });
};

const forgotPassword = async (req, res) => {
    res.json({
        succes: true,
        message: "Dummy forgot password API"
    })
};

const resetPassword = async (req, res) => {
    res.json({
        succes: true,
        message: "Dummy reset password API"
    })
};

const userController = {
    register,
    login,
    forgotPassword,
    resetPassword
};

module.exports = userController;