const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Datapoint = require('../models/Datapoint');

router.get('/', (request, response, next) => {
    response.status(201).json({
        message: 'Handling GET requests to /datapoint with all devices'
    })
})

router.get('/:device_id', (request, response, next) => {
    const device_id = request.params.device_id;
    const datapoint = Datapoint.find({_device_id: device_id})
    if(datapoint){
        response.status(201).json({
            id: device_id,
            datapoint: datapoint,
            message: 'This is the datapoint for the device-id ' + device_id
        });
    } else {
        response.status(400).json({
            id:device_id,
            message: 'A invalid id was requested'
        })
    }
});

router.post('/:device_id', (request, response, next) => {
    const id = request.params.device_id;
    const datapoint = new Datapoint ({
        _id: new mongoose.Types.ObjectId(),
        _device_id: request.body.device_id,
        _raw: request.body.raw,
        _time: request.body.time,
        _field1: request.body.field1,
        _field2: request.body.field2
    });

    if(id){
        datapoint.save().then(result => {
            console.log(result);
        })
        .catch(error => console.log(error));

        response.status(201).json({
            id: id,
            message: 'Created device entries ' + id,
            datapoint: datapoint
        });
    } else {
        response.status(400).json({
            id:id,
            message: 'A invalid id was posted'
        })
    }
});

module.exports = router;