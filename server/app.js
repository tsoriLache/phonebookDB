const express = require("express");
const app = express();
const personsRouter = require('./routers/persons_router')
const {getLength} = require('./lib/dummyDB');
const morgan = require('morgan')

app.use(express.json());

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  
app.use(morgan(':method :url :status - :response-time ms :body'))

app.use('/api/persons',personsRouter)

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${getLength()} people\n ${new Date().toString()}`)
})


module.exports = app;
