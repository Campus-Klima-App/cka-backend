const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Datapoint = require("../models/datapoint");

router.get("/", (request, response, next) => {
  Datapoint.find()
    .exec()
    .then((documents) => {
      console.log(documents);
      response.status(200).json(documents);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

router.get("/:device_id", (request, response) => {
  const id = request.params.device_id;
  Datapoint.findById(id)
    .exec()
    .then((document) => {
      console.log(document);
      if (document) {
        return response.status(201).json({ document });
      } else {
        return response
          .status(404)
          .json({ message: "No valid entry found for id " + id });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

router.post("/", (request, response, next) => {
  const id = request.body.device_id;
  const datapoint = new Datapoint({
    _id: new mongoose.Types.ObjectId(),
    device_id: request.body.device_id,
    raw: request.body.raw,
    time: request.body.time,
    field1: request.body.field1,
    field2: request.body.field2,
  });

  console.log("--------");
  console.log("Datapoint: " + datapoint);

  datapoint
    .save()
    .then((result) => {
      console.log(result);
      response.status(201).json({
        id: id,
        message: "Created device entries " + id,
        datapoint: datapoint,
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

module.exports = router;