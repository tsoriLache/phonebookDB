const express = require('express');
const router = express.Router();
const app = express();
const Contact = require('../models/contact');



app.get('/info', async (request, response) => {
    response.send(`Phonebook has info for ${await Contact.count({})} people\n ${new Date().toString()}`)
})


module.exports = router;
