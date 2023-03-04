const express = require("express");
const foodRouter = express.Router(); // create a router

// Middlewares
const userAuthenticationMiddleware = require("../../middlewares/userAuthenticationMiddleware");
const userAuthorizationMiddleware = require("../../middlewares/userAuthorizationMiddleware");

// controller
const FoodController = require("../../controller/FoodController");

foodRouter.post("/add-food", FoodController.addFoodHandler);
foodRouter.get("/get-foods", FoodController.getFoodsHandler);
foodRouter.put(
    "/update-food/:ID",
    userAuthenticationMiddleware,
    userAuthorizationMiddleware("ADMIN"),
    FoodController.updateFoodsHandler
);
foodRouter.delete(
    "/delete-food/:ID",
    userAuthenticationMiddleware,
    FoodController.foodDeleteHandler
);

module.exports = foodRouter;
