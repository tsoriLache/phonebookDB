const handleAddContact = ()=>{
    document.getElementById('add-contact-form').classList.toggle('hide');
    document.getElementById('main').classList.toggle('hide');
}

document.getElementById('add-contact-btn').addEventListener('click',handleAddContact)