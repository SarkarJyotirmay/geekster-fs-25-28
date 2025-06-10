const UserModel = require("../models/user.model");

const register = async (req, res) => {
    // Todo:  Write validation for req body
    await UserModel.create(req.body);
    res.json({
        succes: true,
        message: "Dummy resgister API"
    })
};

const login = async (req, res) => {
    res.json({
        succes: true,
        message: "Dummy login API"
    })
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