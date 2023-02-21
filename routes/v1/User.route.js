const express = require("express");
const userRouter = express.Router(); // create a router

// controllers
const UserController = require("../../controller/UserController");

// Middlewares
const userAuthenticationMiddleware = require("../../middlewares/userAuthenticationMiddleware");

// Private Routes
// Public Routes
userRouter.post("/create-user", UserController.userCreatingHandler);
userRouter.get(
    "/get-user",
    userAuthenticationMiddleware,
    UserController.userGettingHandler
);

module.exports = userRouter; // exporting that router
