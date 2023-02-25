const express = require("express");
const foodRouter = express.Router(); // create a router

// controller
const FoodController = require("../../controller/FoodController");

foodRouter.post("/add-food", FoodController.addFoodHandler);

module.exports = foodRouter;
