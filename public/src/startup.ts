import {generatePlayerName} from './helpers';
import {startGame, sendChat} from './index';

export const loginOverlay = document.getElementById('login-overlay')!;
const startButton = document.getElementById('start-game')!;
const generateNameButton = document.getElementById('generate-name')!;
const username = document.getElementById('username') as HTMLInputElement;

const gameChatContainer = document.getElementById('game-chat')!;
const gameChatMessage = document.getElementById('message') as HTMLTextAreaElement;
const sendMessageButton = document.getElementById('send-message')!;

const errorDisplayContainer = document.getElementById('error-display')!;
let errorList = [];

export function prepareStartForm() {
    startButton?.addEventListener('click', handleStart);
    generateNameButton?.addEventListener('click', generateName);
}

function generateName() {
    username.value = generatePlayerName();
    username.classList.remove();
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
    if (!username.value.trim().length) {
        username.value = generatePlayerName();
    } else if (username.value.trim().length > 20) {
        username.classList.add("error");
        return;
    }
    console.log(username.value);
    startGame(username.value);
    hideStartForm();
    showGameChat();
    
}