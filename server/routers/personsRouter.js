const express = require('express');
const router = express.Router();
const {getSingle} = require('../lib/dummyDB');
// const {isNumberValid} = require('../helpers/validation');
const Contact = require('../models/contact');

router.get('/', async(request, response) => {
    response.json(await Contact.find({}))
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

router.post('/', async (request, response) => {
    const {name,number} = request.body;
    if(name&&number){   //add number validation
        if(await Contact.count({name})===0){
            const contact = new Contact({name,number});
            await contact.save();
            response.json(`contact added!`);
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
