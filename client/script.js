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