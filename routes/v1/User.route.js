const express = require("express");
const userRouter = express.Router(); // create a router

// controllers
const UserController = require("../../controller/UserController");

// Middlewares
const userAuthenticationMiddleware = require("../../middlewares/userAuthenticationMiddleware");
const userAuthorizationMiddleware = require("../../middlewares/userAuthorizationMiddleware");

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
    userAuthorizationMiddleware("ADMIN"),
    UserController.makeUserAdminHandler
);

// To Remove from admin role
userRouter.put(
    "/remove-admin/:email",
    userAuthenticationMiddleware,
    userAuthorizationMiddleware("ADMIN"),
    UserController.removeUserAdminHandler
);

// to check user admin or not
userRouter.get(
    "/check-admin/:email",
    userAuthenticationMiddleware,
    UserController.checkAdminHandler
);

// Public Routes
userRouter.post("/create-user", UserController.userCreatingHandler);
userRouter.post("/login-user", UserController.userLoginHandler);

module.exports = userRouter; // exporting that router
