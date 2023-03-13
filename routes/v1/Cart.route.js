const express = require("express");
const cartRouter = express.Router(); // create a router

// Middlewares
const userAuthenticationMiddleware = require("../../middlewares/userAuthenticationMiddleware");
const userAuthorizationMiddleware = require("../../middlewares/userAuthorizationMiddleware");

// controller
const cartController = require("../../controller/CartController");

// Routes =======
cartRouter.post("/add-to-cart", cartController.addToCartHandler);

module.exports = cartRouter;
