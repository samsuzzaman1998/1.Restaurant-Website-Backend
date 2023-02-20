const UserModel = require("../model/UserModel");
const createError = require("http-errors");
const JWTGenerator = require("../utils/JWTGenerator");

//  POST Controllers ==================================
exports.userCreatingHandlerr = async (req, res, next) => {
    try {
        const { name, email, password, terms } = req.body;
        const isPeopleExist = await UserModel.findOne({ email });

        if (isPeopleExist) {
            next(createError(500, "Email Already exists"));
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
                next(createError(500, "Enter valid information"));
            }
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};
