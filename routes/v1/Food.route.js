const express = require("express");
const foodRouter = express.Router(); // create a router

// controller
const FoodController = require("../../controller/FoodController");

foodRouter.post("/add-food", FoodController.addFoodHandler);
foodRouter.get("/get-foods", FoodController.getFoodsHandler);

module.exports = foodRouter;
