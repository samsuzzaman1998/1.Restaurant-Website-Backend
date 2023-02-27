const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const userAuthenticatioMiddleware = async (req, res, next) => {
    let token;

    const { authorization } = req.headers;
    console.log("FIREST", req.headers);
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            console.log("ok", token);

            const { email, ID } = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await UserModel.findOne({ email, _id: ID }).select(
                "-password"
            );
            next();
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    } else {
        res.status(500).json({ status: false, message: "Unauthorized User" });
    }
};

module.exports = userAuthenticatioMiddleware;
