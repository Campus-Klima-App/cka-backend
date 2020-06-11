const express = require('express');
const app = express();

const productRoutes = require('./api/routes/devices');
const queryRoutes = require('./api/routes/query');

app.use('/devices', productRoutes);
app.use('/query', queryRoutes);

module.exports = app;