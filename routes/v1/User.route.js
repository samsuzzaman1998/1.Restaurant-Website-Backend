const express = require("express");
const userRouter = express.Router(); // create a router

// controllers
const UserController = require("../../controller/UserController");

// Private Routes
// Public Routes
userRouter.post("/create-user", UserController.userCreatingHandler);
userRouter.get("/get-user", UserController.getUser);

module.exports = userRouter; // exporting that router
