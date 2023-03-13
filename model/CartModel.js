const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
    {
        user: { type: String, required: [true, "User requierd"] },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },
                quantity: { type: Number, default: 1 },
                price: {
                    type: Number,
                    required: [true, "Food price required"],
                },
            },
        ],
    },
    { timestamps: true }
);

// Creating Model
const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
