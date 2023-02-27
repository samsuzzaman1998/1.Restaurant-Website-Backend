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
userRouter.put(
    "/change-password",
    userAuthenticationMiddleware,
    UserController.changePasswordHandler
);
// to get all user list
userRouter.get(
    "/get-all-user",
    userAuthenticationMiddleware,
    UserController.getAllUserHandler
);

// Put route
userRouter.put(
    "/make-admin/:email",
    userAuthenticationMiddleware,
    UserController.makeUserAdminHandler
);

// Public Routes
userRouter.post("/create-user", UserController.userCreatingHandler);
userRouter.post("/login-user", UserController.userLoginHandler);

module.exports = userRouter; // exporting that router
