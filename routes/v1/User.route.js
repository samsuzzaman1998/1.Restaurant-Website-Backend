const express = require("express");
const userRouter = express.Router(); // create a router

// controllers
const UserController = require("../../controller/UserController");

// Middlewares
const userAuthenticationMiddleware = require("../../middlewares/userAuthenticationMiddleware");

// Private Routes
userRouter.get(
    "/get-user",
    userAuthenticationMiddleware,
    UserController.userGettingHandler
);
userRouter.put(
    "/update-user",
    userAuthenticationMiddleware,
    UserController.userUpdatingHandler
);

// Public Routes
userRouter.post("/create-user", UserController.userCreatingHandler);
userRouter.post("/login-user", UserController.userLoginHandler);

module.exports = userRouter; // exporting that router
