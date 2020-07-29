const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Datapoint = require("../models/Datapoint");
const defaultFields = "_id device_id light temperature time ";
const allFields = defaultFields + "battery event raw field1 field2";

router.get("/", (request, response, next) => {
  const includeAllFields = request.header("include_all_fields");

  const from = request.header("from");
  const to = request.header("to");
  const timeFilter = TimeFilterGenerator(from, to);

  Datapoint.find({
    time: timeFilter,
  })
    .select(includeAllFields ? allFields : defaultFields)
    .exec()
    .then((documents) => {
      console.log("Returning all datapoints.");
      const res = ResponseFromDocuments(documents);
      response.status(200).json(res);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

router.get("/:device_id", (request, response) => {
  const id = request.params.device_id;
  const includeAllFields = request.header("include_all_fields");

  const from = request.header("from");
  const to = request.header("to");
  const timeFilter = TimeFilterGenerator(from, to);

  Datapoint.find({
    device_id: id,
    time: timeFilter,
  })
    .select(includeAllFields ? allFields : defaultFields)
    .exec()
    .then((documents) => {
      console.log("Returning all datapoints for", id);
      const res = ResponseFromDocuments(documents);
      response.status(200).json(res);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

router.post("/", (request, response, next) => {
  const id = request.body.dev_id;
  const datapoint = new Datapoint({
    _id: new mongoose.Types.ObjectId(),
    battery: request.body.payload_fields.battery,
    device_id: id,
    event: request.body.payload_fields.event,
    light: request.body.payload_fields.light,
    raw: request.body.payload_raw,
    temperature: request.body.payload_fields.temperature,
    time: request.body.metadata.time,
  });

  datapoint
    .save()
    .then((result) => {
      console.log(result);
      response.status(201).json({
        device_id: id,
        message: "Created device entries " + id,
        result: result,
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

const ResponseFromDocuments = (documents) => {
  return {
    count: documents.length,
    datapoints: documents.map((document) => {
      return {
        id: document.id,
        battery: document.battery,
        device_id: document.device_id,
        event: document.event,
        light: document.light,
        raw: document.raw,
        temperature: document.temperature,
        time: document.time,
      };
    }),
  };
};

const TimeFilterGenerator = (from, to) => {
  var time = {};
  if (from) {
    time.$gte = new Date(from);
  }

  if (to) {
    time.$lte = new Date(to);
  }
  return time;
};

module.exports = router;
