const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/devices');
const queryRoutes = require('./api/routes/query');

app.use(morgan('dev'));

app.use('/devices', productRoutes);
app.use('/query', queryRoutes);

module.exports = app;