const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middlewares
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded());

// Routers
const userRouter = require("./routes/v1/User.route");
const foodRouter = require("./routes/v1/Food.route");

// Connecting routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter);

app.get("/", (req, res) => {
    res.send("yeah!!! server is running");
});

module.exports = app;
