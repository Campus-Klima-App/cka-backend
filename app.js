const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/devices");
const datapointRoutes = require("./api/routes/datapoint");
//const { request, response } = require('express');

mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGO_ATLAS_USER +
    ":" +
    process.env.MONGO_ATLAS_PW +
    "@campus-climate-db-qsbnr.mongodb.net/campus-climate-db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "*");
  if (request.method === "OPTIONS") {
    response.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, GET, DELETE"
    );
    return response.status(200).json({});
  }
  next();
});

app.use("/devices", productRoutes);
app.use("/datapoint", datapointRoutes);

app.use((request, respone, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message,
  });
  return;
});

module.exports = app;
