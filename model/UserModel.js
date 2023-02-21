const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            requried: [true, "Name is requried"],
            trim: true,
            minLength: [4, "Name is too short"],
            maxLength: [20, "Name is too long"],
        },
        email: {
            type: String,
            requried: [true, "Email is requried"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password must required"],
            trim: true,
        },
        terms: {
            type: Boolean,
            required: [true, "Accepet all the terms and conditions"],
        },
        avatar: {
            type: String,
            default: "",
            trim: true,
        },
        contact: {
            type: String,
            default: "",
            trim: true,
        },
        location: {
            type: String,
            default: "",
            trim: true,
        },
        role: {
            type: String,
            default: "user",
            trim: true,
        },
    },
    { timestamps: true }
);

// Hashing Password
UserSchema.pre("save", async function (next) {
    const password = this.password;
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = bcrypt.hashSync(password, salt);
    this.password = hashedPassword;
    next();
});

// Creating Model
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
