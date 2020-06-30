const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Datapoint = require("../models/datapoint");

router.get("/", (request, response, next) => {
  Datapoint.find()
    .select("_id device_id raw time field1 field2")
    .exec()
    .then((documents) => {
      console.log(documents);

      const res = {
        count: documents.length,
        datapoints: documents.map((document) => {
          return {
            id: document.id,
            device_id: document.device_id,
            raw: document.raw,
            time: document.time,
            field1: document.field1,
            field2: document.field2,
            request: {
              type: "GET",
              url: generateDatapointURL(document),
            },
          };
        }),
      };

      response.status(200).json(res);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

router.get("/:device_id", (request, response) => {
  const id = request.params.device_id;
  Datapoint.find({ device_id: id })
    .exec()
    .then((documents) => {
      console.log(documents);

      const res = {
        count: documents.length,
        datapoints: documents.map((document) => {
          return {
            id: document.id,
            device_id: document.device_id,
            raw: document.raw,
            time: document.time,
            field1: document.field1,
            field2: document.field2,
            request: {
              type: "GET",
              url: generateDatapointURL(document),
            },
          };
        }),
      };

      response.status(200).json(res);
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

  datapoint
    .save()
    .then((result) => {
      console.log(result);
      response.status(201).json({
        id: id,
        message: "Created device entries " + id,
        result: result,
        request: {
          type: "GET",
          url: generateDatapointURL(result),
        },
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error });
    });
});

module.exports = router;

const generateDatapointURL = (document) => {
  const url = process.env.URL || "http://localhost";
  const port = process.env.PORT || 3000;
  return url + ":" + port + "/datapoints/" + document.id;
};
