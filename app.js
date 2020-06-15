const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/devices');
const queryRoutes = require('./api/routes/query');
const { request, response } = require('express');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');
    if(request.method === 'OPTIONS'){
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return response.status(200).json({})
    }
    next();
});

app.use('/devices', productRoutes);
app.use('/query', queryRoutes);

app.use((request, respone, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        message: error.message
    })
});

module.exports = app;