const mongoose = require("mongoose");

const datapointSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  device_id: String,
  raw: String,
  time: String,
  field1: String,
  field2: String,
});

module.exports = mongoose.model("Datapoint", datapointSchema);
