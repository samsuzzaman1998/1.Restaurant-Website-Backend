const FoodModel = require("../model/FoodModel");

exports.demoHandler = async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ status: true, message: "successfull" });
};

// POST Handlers =================================
exports.addFoodHandler = async (req, res, next) => {
    try {
        const { title } = req.body;
        const isFoodExist = await FoodModel.findOne({ title });
        if (isFoodExist) {
            res.status(500).json({
                status: false,
                message: "Food already exist (same title)",
            });
        } else {
            const newFoodData = new FoodModel(req.body);
            const result = await newFoodData.save();

            res.status(200).json({
                status: true,
                message: "Food Added",
                result,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
