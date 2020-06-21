const mongoose = require('mongoose');

const datapointSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _device_id: String,
    _raw: String,
    _time: String,
    _field1: String,
    _field2: String
});

module.exports = mongoose.model('Datapoint', datapointSchema);