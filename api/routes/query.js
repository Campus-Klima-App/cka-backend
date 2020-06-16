const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Query = require('../models/query');

router.get('/', (request, response, next) => {
    response.status(201).json({
        message: 'Handling GET requests to /query with all devices'
    })
})

router.get('/:device_id', (request, response, next) => {
    const id = request.params.device_id;
    if(id){
        response.status(201).json({
            id: id,
            message: 'This is the response data for the id ' + id
        });
    } else {
        response.status(400).json({
            id:id,
            message: 'A invalid id was requested'
        })
    }
});

router.post('/:device_id', (request, response, next) => {
    const id = request.params.device_id;
    const query = new Query ({
        _id: new mongoose.Types.ObjectId(),
        _device_id: request.body.device_id,
        _raw: request.body.raw,
        _time: request.body.time,
        _field1: request.body.field1,
        _field2: request.body.field2
    });

    if(id){
        query.save().then(result => {
            console.log(result);
        })
        .catch(error => console.log(error));

        response.status(201).json({
            id: id,
            message: 'Created device entries ' + id,
            query: query
        });
    } else {
        response.status(400).json({
            id:id,
            message: 'A invalid id was posted'
        })
    }
});

module.exports = router;