const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const deviceRoutes = require("./api/routes/devices");
const datapointRoutes = require("./api/routes/datapoints");
//const { request, response } = require('express');

// just to see the string structure
// mongoose.connect('mongodb://username:password@host:port/database,
// mongodb://username:password@host:port,mongodb:
// username:password@host:port' [, options]);
mongoose
  .connect(
    "mongodb://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PW +
      "@" +
      process.env.MONGO_HOSTS,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connected to mongoDB"));
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

app.use("/devices", deviceRoutes);
app.use("/datapoints", datapointRoutes);

app.use((request, response, next) => {
  const error = new Error("Not found");
  error.status = 404;
  response.status(301).redirect("10.50.50.205:26026");
  //next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message,
  });
  return;
});

module.exports = app;
