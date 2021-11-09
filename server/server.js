const express = require("express");
const app = require("./app");
const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.DATABASE
mongoose.connect(url)
.then(() => {console.log('mongoDB connected');})
.catch((err) => {console.log(err);})

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
