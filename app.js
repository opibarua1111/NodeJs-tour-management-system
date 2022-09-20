const express = require("express");
const app = express();
const cors = require("cors");
const { mongoose } = require("mongoose");

app.use(express.json());
app.use(cors());

const tourRoute = require("./routes/tour.route");

app.get("/", (req, res) => {
  res.send("Route is working!");
});

app.use("/api/v1", tourRoute);

module.exports = app;
