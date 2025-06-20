const authorizer = (roles) => {
    return function (req, res, next) {
        /**
         * 1. Check if the user's role is present in the roles array
         * 2. If user's role has access then, forward the control to next block else throw error
         */
        const hasAccess = roles.includes(req.user.role);
        if (hasAccess) {
            next();
        } else {
            res
                .status(403)
                .json({
                    success: false,
                    message: "Forbidden"
                })
        }
    };
}

module.exports = authorizer;