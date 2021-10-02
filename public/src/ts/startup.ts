import {generatePlayerName, isASCII} from './modules/helpers';
import {startGame, sendChat} from './index';

export const loginOverlay = document.getElementById('login-overlay')!;
const startButton = document.getElementById('start-game')!;
const generateNameButton = document.getElementById('generate-name')!;
const username = document.getElementById('username') as HTMLInputElement;
const nameContainer = document.getElementById('name-list')!;

const gameChatContainer = document.getElementById('game-chat')!;
const gameChatMessage = document.getElementById('message') as HTMLTextAreaElement;
const sendMessageButton = document.getElementById('send-message')!;

const errorDisplayContainer = document.getElementById('error-display')!;
let errorList = [];

export function prepareStartForm() {
    startButton?.addEventListener('click', handleStart);
    generateNameButton?.addEventListener('click', generateNameButton_Click);
    loginOverlay.style.display = "flex";
    gameChatContainer.style.display = "unset";
}

async function generateNameButton_Click() {
    generateName();
    setTimeout(function(){
        generateNameButton.removeAttribute('disabled');
        startButton.removeAttribute('disabled');
    }, 1000);
}

async function generateName() {
    generateNameButton.setAttribute('disabled', 'disabled');
    startButton.setAttribute('disabled', 'disabled');

    let curValue = username.value;
    let newValue = generatePlayerName();
    nameContainer.innerHTML = `<p>${newValue}</p>`;
    loadNames();
    nameContainer.innerHTML += `<p>${curValue}</p>`

    username.classList.remove();
    username.value = "";

    nameContainer.classList.add('scrolling');
    nameContainer.classList.remove('hidden');
    setTimeout(function(){
        username.value = newValue;
        nameContainer.classList.add('hidden');
        nameContainer.classList.remove('scrolling');
    }, 1000);
}

function loadNames() {
    for (let i = 0; i < 18; i++) {
        nameContainer.innerHTML += `<p>${generatePlayerName()}</p>`
    }
}

function hideStartForm() {
    loginOverlay.classList.add('hidden');
}
function showGameChat() {
    gameChatContainer.classList.remove('hidden');
    sendMessageButton.addEventListener('click', sendMessage);
}

function sendMessage() {
    if (!gameChatMessage.value.trim().length) {
        return
    }
    sendChat(gameChatMessage.value.trim());

    gameChatMessage.value = "";
}

function handleStart() {
    username.classList.remove();
    let isGeneratedName:Boolean = false;

    if (!username.value.trim().length) {
        username.value = generatePlayerName();
        isGeneratedName = true;
    } else if (username.value.trim().length > 20) {
        username.classList.add("error");
        return;
    } else if (!isASCII(username.value.trim())) {
        username.classList.add("error");
        return;
    }

    startButton.setAttribute('disabled', 'disabled');
    generateNameButton.setAttribute('disabled', 'disabled');

    if(isGeneratedName) {
        generateName();
        setTimeout(function(){
            startGame(username.value);
            hideStartForm();
            showGameChat();
        }, 1500);
        return;
    }
    startGame(username.value);
    hideStartForm();
    showGameChat();
    
}