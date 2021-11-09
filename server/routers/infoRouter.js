const express = require('express');
const router = express.Router();
const app = express();
const {getLength} = require('../lib/dummyDB');


app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${getLength()} people\n ${new Date().toString()}`)
})


module.exports = router;
