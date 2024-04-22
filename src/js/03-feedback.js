import throttle from "lodash.throttle";

const form = document.querySelector('form.feedback-form');
const emailEL = document.querySelector('label [name="email"]');
const messageEL = document.querySelector('label [name="message"]');


const STORAGE_KEY = 'feedback-form-state';


function onPageReload(){
    const saveMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(saveMessage){
emailEL.value = saveMessage.email;
messageEL.value = saveMessage.message;

    }
}

onPageReload();

function onFormInput(){ 
    const email = emailEL.value;
    const message = messageEL.value;

    const formData = {
        email,
        message,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e){
e.preventDefault();
const email = emailEL.value;
const message = messageEL.value;

if ( email == '' || message == ''){
    alert('Enter both input parameters');
    form.reset();
    return;
}

form.reset();
localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('submit', onFormSubmit);