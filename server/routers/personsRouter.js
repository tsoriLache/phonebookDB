const express = require('express');
const router = express.Router();
// const {isNumberValid} = require('../helpers/validation');
const Contact = require('../models/contact');

router.get('/', async (request, response) => {
  response.json(await Contact.find({}));
});

router.get('/:id', async (request, response) => {
  const _id = request.params.id;
  try {
    response.json((await Contact.find({ _id }))[0]);
  } catch {
    response.status(400);
    response.send('id is not found');
  }
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  try {
    await Contact.findOneAndRemove({ id });
    response.status(204).end();
  } catch {
    response.status(400);
    response.send('id is not found');
  }
});

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
  } else {
    response.status(400);
    response.send('The name or number is missing');
  }
});

module.exports = router;
