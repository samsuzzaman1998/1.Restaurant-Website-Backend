const UserModel = require("../model/UserModel");
const createError = require("http-errors");
const JWTGenerator = require("../utils/JWTGenerator");

// Get Controllers ====================================
exports.getUser = async (req, res) => {
    res.send("done");
};
//  POST Controllers ==================================
exports.userCreatingHandler = async (req, res, next) => {
    try {
        const { name, email, password, terms } = req.body;
        const isPeopleExist = await UserModel.findOne({ email });

        if (isPeopleExist) {
            res.status(500).json({
                status: false,
                message: "Email already exists",
            });
        } else {
            if (name && email && password && terms) {
                const newUser = new UserModel(req.body);
                const result = await newUser.save();
                const tokenObj = { ID: result._id, email: result.email };
                const TOKEN = JWTGenerator(tokenObj, "1d");
                res.status(200).json({
                    status: true,
                    message: "User Added Successfully",
                    TOKEN,
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "Enter valid information",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};