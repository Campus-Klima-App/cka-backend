const mongoose = require("mongoose");

const datapointSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  battery: Number,
  device_id: String,
  event: String,
  light: Number,
  co: Number,
  humidity: Number,
  raw: String,
  temperature: Number,
  time: Date,
});

module.exports = mongoose.model("datapoint", datapointSchema, "datapoint");