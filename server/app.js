const express = require("express");
const app = express();
const personsRouter = require('./routers/personsRouter.js')
const infoRouter = require('./routers/infoRouter.js')
const {getLength} = require('./lib/dummyDB');
const morgan = require('morgan');
const path = require('path');

app.use(express.json());

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  
app.use(morgan(':method :url :status - :response-time ms :body'))

app.use('/api/persons',personsRouter)
app.use('/info',infoRouter)

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${getLength()} people\n ${new Date().toString()}`)
})
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});
app.use("/", express.static(path.resolve("./dist")));

module.exports = app;
