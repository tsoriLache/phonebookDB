import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";
import "./js/domHandler.js"
import axios from 'axios';
import {toggleForm,renderAllContacts,clearInputs} from "./js/domHandler.js";

renderAllContacts();

const HandleAddContacts = (e)=>{
    e.preventDefault();
    axios.post('/api/persons', {
        name: document.getElementById('contact-name').value,
        number: document.getElementById('contact-number').value,
        // img:document.getElementById('contact-img').value
    })
    clearInputs();
    renderAllContacts();
    toggleForm();
}

const deleteContacts = async(e)=>{
    e.stopPropagation();
    const id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    await axios.delete(`/api/persons/${id}`);
    renderAllContacts();
}

document.getElementById('add-contact-btn').addEventListener('click',toggleForm)
document.getElementById('add-contact-submit').addEventListener('click',HandleAddContacts)

export {deleteContacts}