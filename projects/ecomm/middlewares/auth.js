const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const UserModel = require("../models/user.model");

dotenv.config();

const authMiddleware = async (req, res, next) => {
    /**
     * Validate the JWT
     * 1. Check if the JWT is present in request header
     *  1.1 If not, throw error
     *  1.2 If present, proceed to step 2
     * 2. Check if the token is generated through our system via JWT_SECRET_KEY
     * 3. Check if the token is expired or not
     *  3.1 If expired, throw error
     *  3.2 If not expired, allow the user to access the API
     * 4. Check if the token sent in request matches with the token stored in DB (ONLY IF WE WANT SINGLE LOGIN IN SYSTEM)
     */

    const token = req.headers.authorization?.split(" ")?.[1];
    if (!token) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized"
            })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(data); // Data from the token payload/body
        const user = await UserModel.findById(data.id);
        req.user = user; // Pass the user data to further API
        // console.log(user);
        if (user.jwt !== token) {
            throw new Error("Unauthorized"); // Old login
        }
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized"
            });
    }

};

module.exports = authMiddleware;