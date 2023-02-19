import bot from './assets/bot.svg';
import user from './assets/user.svg';
import send from './assets/send.svg';

const form = document.getElementById('form');
const chatContainer = document.getElementById('chat-container');

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent.length === 4){
      element.textContent = '';
    }
  },300);
}


function typeText(element, text){
  let i = 0;
  const interval = setInterval(() => {
    

    if(i === text.length){
      element.textContent += text.charAt(i);
    i++;
      
    } else{
      clearInterval(interval);
    }
  },20);
}

function generateUniqueId(){
  // return Math.floor(Math.random() * 100000000);
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000000);
  const hexdecimalString = randomNumber.toString(16);

  return `${timestamp}-${hexdecimalString}`;
}

function chatStripe  (isAi, value, uniqueId){
  return (
    `
    <div class="wrapper ${isAi && 'ai'}" id="${uniqueId}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="user">
        </div>
        <div class="message" id=${uniqueId}> 
          <p>${value}</p>
        </div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  //generate the user chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  //generate the ai chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true,  " ", uniqueId);

  //scroll to the bottom and put new message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  //get the message from the ai
  const messageDiv = document.getElementById(uniqueId);

  //loader
  loader(messageDiv);

}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  
  if(e.keyCode === 13){
    handleSubmit(e);
  }
});