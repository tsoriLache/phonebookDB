import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";
import "./js/domHandler.js"
import axios from 'axios';
import {toggleForm,renderAllContacts} from "./js/domHandler.js";

const HandleAddContacts = (e)=>{
    e.preventDefault();
    axios.post('/api/persons', {
        name: document.getElementById('contact-name').value,
        number: document.getElementById('contact-number').value,
        // img:document.getElementById('contact-img').value
    })
    renderAllContacts();
    toggleForm();
}

document.getElementById('add-contact-btn').addEventListener('click',toggleForm)
document.getElementById('add-contact-submit').addEventListener('click',HandleAddContacts)