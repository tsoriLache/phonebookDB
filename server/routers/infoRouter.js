const express = require('express');
const router = express.Router();

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${getLength()} people\n ${new Date().toString()}`)
})


module.exports = router;
