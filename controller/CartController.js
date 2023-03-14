const CartModel = require("../model/CartModel");

// GET Handlers =====
exports.getCartHandler = async (req, res, next) => {
    const user = req.params.email;
    try {
        const result = await CartModel.find({ user })
            .populate("cartItems.product", "-updatedAt -__v -createdAt")
            .select({ _v: 0, date: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        res.status(200).json({
            status: true,
            result,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// POST Handlers====
exports.addToCartHandler = async (req, res, next) => {
    const cartData = req.body;
    try {
        const isUserCartExist = await CartModel.findOne({
            user: cartData.user,
        });
        if (isUserCartExist) {
            // is the item exist in the cart
            const isFoodExistInCart = isUserCartExist.cartItems.find(
                (item) => item.product == cartData.cartItems.product
            );

            if (isFoodExistInCart) {
                // const newCart = await CartModel.findOneAndUpdate(
                //     {
                //         user: cartData.user,
                //         "cartItems.product": cartData.cartItems.product,
                //     },
                //     {
                //         $set: {
                //             "cartItems.$": {
                //                 ...cartData.cartItems,
                //                 quantity:
                //                     isFoodExistInCart.quantity +
                //                     cartData.cartItems.quantity,
                //             },
                //         },
                //     }
                // );
                res.status(400).json({
                    status: false,
                    message: "Food already in Cart",
                });
            } else {
                const newCart = await CartModel.findOneAndUpdate(
                    { user: cartData.user },
                    {
                        $push: {
                            cartItems: [cartData.cartItems],
                        },
                    }
                );
                res.status(200).json({ status: true, cart: newCart });
            }
        } else {
            const cart = new CartModel({
                user: cartData.user,
                cartItems: [cartData.cartItems],
            });
            await cart.save();
            res.status(200).json({ status: true, cart });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
