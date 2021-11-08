const express = require("express");
const app = express();
const personsRouter = require('./routers/personsRouter.js')
const infoRouter = require('./routers/infoRouter.js')
const {getLength} = require('./lib/dummyDB');
const morgan = require('morgan')

app.use(express.json());

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  
app.use(morgan(':method :url :status - :response-time ms :body'))

app.use('/api/persons',personsRouter)
app.use('/info',infoRouter)



module.exports = app;
