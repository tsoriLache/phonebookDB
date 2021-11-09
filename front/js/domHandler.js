import axios from 'axios';
import {deleteContacts} from '../index'

const toggleForm = ()=>{
    document.getElementById('add-contact-form').classList.toggle('hide');
    document.getElementById('main').classList.toggle('hide');
}

const HandleShowNumber = async({target})=>{
  const contactElem = target.closest('button');
  const contactData = (await axios.get(`/api/persons/${contactElem.getAttribute('data-id')}`)).data;
  contactElem.append(createElement( 'button',['X'],['delete-btn','close'],{},{'click':deleteContacts}))
  contactElem.after(createElement('p' ,[contactData.number],['phone-number','h3']))
  contactElem.removeEventListener('click',HandleShowNumber)
  contactElem.addEventListener('click',renderAllContacts)
}

const cleanContactList = ()=>{
  const contactsList = document.getElementById('contact-list');
  while (contactsList.childNodes.length > 2) {
    contactsList.removeChild(contactsList.lastChild);
  }
}
const appendContacts = async()=>{
  const contacts = (await axios.get("/api/persons")).data.sort((a, b) => b.name.localeCompare(a.name));
    contacts.forEach(({name,id})=> {
        const imgElem = createElement('img' ,[],["contact-img"],{src:"./img/contacts-icon.jpeg" ,alt:"🙎‍♂️"})
        const nameElem = createElement('p' ,[`${name}`],['h4' ,'contact-name'])
        const contactElem = createElement('button',[imgElem,nameElem],['list-group-item', 'list-group-item-action'],{type:'button','data-id':id},{'click':HandleShowNumber})
        document.getElementById('add-contact-btn').after(contactElem)
    });
}

const renderAllContacts = ()=>{
    cleanContactList();
    appendContacts();
}

const clearInputs = ()=>{
  document.getElementById('contact-name').value = "";
  document.getElementById('contact-number').value = "";
}


function createElement(tagName ,children = [], classes = [],attributes = {},eventListeners = {}) {
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
    //Event Listener
    for (const listener in eventListeners) {
      el.addEventListener(listener, eventListeners[listener]);
    }
    return el;
  }

  export {toggleForm,renderAllContacts,clearInputs}

