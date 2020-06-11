const express = require('express');
const router = express.Router();

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
    if(id){
        response.status(201).json({
            id: id,
            message: 'Created device entries ' + id
        });
    } else {
        response.status(400).json({
            id:id,
            message: 'A invalid id was posted'
        })
    }
});

module.exports = router;