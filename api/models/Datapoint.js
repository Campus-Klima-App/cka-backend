const mongoose = require("mongoose");

const datapointSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  battery: Number,
  device_id: String,
  event: String,
  light: Number,
  raw: String,
  temperature: Number,
  time: String,
});

module.exports = mongoose.model("Datapoint", datapointSchema);
