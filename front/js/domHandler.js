import axios from 'axios';

const toggleForm = ()=>{
    document.getElementById('add-contact-form').classList.toggle('hide');
    document.getElementById('main').classList.toggle('hide');
}

const HandleShowNumber = async({target})=>{
  const contactElem = target.closest('button');
  const contactData = (await axios.get(`/api/persons/${contactElem.getAttribute('data-id')}`)).data;
  contactElem.innerText +=(`\t${contactData.number}`)
}

const renderAllContacts = async()=>{
    const contacts = (await axios.get("/api/persons")).data;
    console.log(contacts);
    contacts.forEach(({name,id})=> {
        const imgElem = createElement('img' ,[],["contact-img"],{src:"./img/contacts-icon.jpeg" ,alt:"🙎‍♂️"})
        const nameElem = createElement('p' ,[`${name}`],['h4' ,'contact-name'])
        const contactElem = createElement('button',[imgElem,nameElem],['list-group-item', 'list-group-item-action'],{type:'button','data-id':`${id}`},{'click':HandleShowNumber})
        document.getElementById('add-contact-btn').after(contactElem)
    });
}
renderAllContacts();

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

  export {toggleForm,renderAllContacts}

