const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FoodSchema = mongoose.Schema(
    {
        title: {
            type: String,
            requried: [true, "Food title is requried"],
            trim: true,
            minLength: [5, "Name is too short"],
            maxLength: [30, "Name is too long"],
        },
        description: {
            type: String,
            requried: [true, "A description is requried"],
            trim: true,
            minLength: [50, "Description is too short"],
            maxLength: [150, "Description is too long"],
        },

        thumbnail: {
            type: String,
            default:
                "https://res.cloudinary.com/ddaum19rz/image/upload/v1676975473/FoodFun/avatar_yj7ndh.png",
            trim: true,
            requried: [true, "Food thumbnail is requried"],
        },
        price: {
            type: Number,
            required: [true, "Food must have a Price"],
            trim: true,
        },
    },
    { timestamps: true }
);

// Creating Model
const FoodModel = mongoose.model("Food", FoodSchema);

module.exports = FoodModel;
