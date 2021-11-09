const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Contact', contactSchema);
