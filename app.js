const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const tourRoute = require("./routes/v1/tour.route");

app.get("/", (req, res) => {
  res.send("Route is working!");
});

app.use("/api/v1", tourRoute);

module.exports = app;
