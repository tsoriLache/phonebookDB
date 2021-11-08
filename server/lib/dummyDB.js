const { v4: uuidv4 } = require('uuid');

let contacts = []

function init(){
  contacts = [{ 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }]
}
init()

function getAll(){
    return contacts;
}

function getLength(){
  return contacts.length;
}

function getSingle(id){
  return contacts.find(contact => contact.id === id)
}

function deleteSingle(id){
  contacts = contacts.filter(contact => contact.id !== id)
}

function addContact(name,number){
  const contact = {id:uuidv4(),
                    name,
                    number
                  };
  contacts.push(contact)
  console.log(contacts);
}

function isNameExist(name){
  return contacts.find(contact => contact.name === name)?true:false;
}

module.exports = {getAll,getLength,getSingle,deleteSingle,addContact,isNameExist,init};