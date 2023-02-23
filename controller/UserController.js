const UserModel = require("../model/UserModel");
const createError = require("http-errors");
const JWTGenerator = require("../utils/JWTGenerator");
const bcrypt = require("bcrypt");

// =========================== Get Controllers ====================================

// to get user info using token
exports.userGettingHandler = async (req, res) => {
    try {
        const result = req.user;
        if (!result) {
            res.status(500).json({ status: false, message: "User not found" });
        } else {
            res.status(200).json({
                status: true,
                message: "Data get Successfully",
                result,
            });
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};

// to get all user list
exports.getAllUserHandler = async (req, res, next) => {
    try {
        const result = await UserModel.find({}).select(
            "name email role avatar -_id"
        );
        res.status(200).json({
            status: true,
            message: "User get Successfully",
            result,
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
        });
    }
};

// ========================== POST Controllers ==================================
// sign up user handler
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

// Login user handler
exports.userLoginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const isPeopleExist = await UserModel.findOne({ email });
            if (isPeopleExist) {
                const isPasswordMatched = await bcrypt.compare(
                    password,
                    isPeopleExist.password
                );
                if (isPasswordMatched) {
                    const tokenObj = {
                        ID: isPeopleExist._id,
                        email: isPeopleExist.email,
                    };
                    const TOKEN = JWTGenerator(tokenObj, "1d");
                    res.status(200).json({
                        status: true,
                        message: "Login Successfully",
                        TOKEN,
                    });
                } else {
                    // next(createError(500, "Email or Password not matched"));
                    res.status(500).json({
                        status: false,
                        message: "Email or Password not matched",
                    });
                }
            } else {
                // next(createError(500, "User not found!!!"));
                res.status(500).json({
                    status: false,
                    message: "User not found!!!",
                });
            }
        } else {
            // next(createError(500, "All fields are required"));
            res.status(500).json({
                status: false,
                message: "All fields are required",
            });
        }
    } catch (error) {
        // next(createError(500, error.message));
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// ======================== PUT Controller ===============================
exports.userUpdatingHandler = async (req, res, next) => {
    try {
        let result = await UserModel.updateOne(
            // { email: req.body.email },
            req.user,
            { $set: req.body },
            { runValidators: true }
        );
        res.status(200).json({
            status: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// Change user password
exports.changePasswordHandler = async (req, res, next) => {
    const { newPassword } = req.body;
    if (newPassword) {
        try {
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            const { _id, email } = req.user;
            const result = await UserModel.findOneAndUpdate(
                { _id, email },
                { password: newHashedPassword },
                { new: true }
            );
            res.status(200).send({
                status: true,
                message: "Password Changed Successfully",
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    } else {
        res.status(500).json({
            status: false,
            message: "Old password is not correct",
        });
    }
};
