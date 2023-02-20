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

// Connecting routes
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
    res.send("yeah!!! server is running");
});

module.exports = app;
