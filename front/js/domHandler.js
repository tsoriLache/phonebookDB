import axios from 'axios';

const handleAddContact = ()=>{
    document.getElementById('add-contact-form').classList.toggle('hide');
    document.getElementById('main').classList.toggle('hide');
}

document.getElementById('add-contact-btn').addEventListener('click',handleAddContact)

const renderAllContacts = async()=>{
    const contacts = await axios.get("/api/persons")
    console.log(contacts);
    contacts.forEach(({name})=> {
        const imgElem = createElement('img' ,[], classes = [contact-img],attributes = {src:"./img/contacts-icon.jpeg" ,alt:"🙎‍♂️"})
        const nameElem = createElement('p' ,[`${name}`], classes = [h4 ,contact-name],attributes = {})
        const contactElem = createElement('button',[imgElem,nameElem],[list-group-item, list-group-item-action],{type:'button'})
        document.getElementById('add-contact-btn').after(contactElem)
    });
}
renderAllContacts();

function createElement(tagName ,children = [], classes = [],attributes = {}) {
    const el = document.createElement(tagName);
    // Children
    for(const child of children) {
      el.append(child);
    }
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
    return el;
  }

