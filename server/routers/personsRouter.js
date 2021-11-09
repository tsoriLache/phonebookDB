const express = require('express');
const router = express.Router();
const {getAll,getSingle,deleteSingle} = require('../lib/dummyDB');
// const {isNumberValid} = require('../helpers/validation');
const Contact = require('../models/contact');

router.get('/', (request, response) => {
    response.json(getAll())
})

router.get('/:id', (request, response) => {
    const id = (request.params.id);
    if(getSingle(id)){
        response.json(getSingle(id))
    }else{
        response.status(400);
        response.send('id is not found');
    }
})

router.delete('/:id', (request, response) => {
    const id = (request.params.id);
    if(getSingle(id)){
        deleteSingle(id)
        response.status(204).end()
    }else{
        response.status(400);
        response.send('id is not found');
    }
})

router.post('/', (request, response) => {
    const {name,number} = request.body;
    if(name&&number){   //add number validation
        if(!isNameExist(name)){
            const newContact = addContact(name,number);
            response.json(newContact);
        }else{
            response.status(400);
            response.send('The name already exists in the phonebook');
        }
    }else{
        response.status(400);
        response.send('The name or number is missing');
    }
})


module.exports = router;
