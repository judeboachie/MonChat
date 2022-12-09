const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get username and room from the URL in order to create separate rooms
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true // This ignores symbols like ampersands and question marks
});

const socket = io();


// Upon joining the chatroom, send the user's name and room selection to the server
socket.emit('joinRoom', { username, room });

// Listening for the room and the list of users from the server
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});


// Listening for messages from the server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // Automatically scroll down when new messages are added to the chatbox
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



// Sumbitting a message
chatForm.addEventListener('submit', (e) => {
    // Prevent the page from refreshing
    e.preventDefault();

    // Get the message text
    const msg = e.target.elements.msg.value;

    // Emit the message up to the server
    socket.emit('chatMessage', msg);

    // Clear the input and focus on input field
    e.target.elements.msg.value ='';
    e.target.elements.msg.focus();
});



// Render the message onto the DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
};

// Render the room name onto the DOM
function outputRoomName(room) {
    roomName.innerText = room;
};

// Render the names of the users onto the DOM
function outputUsers(users){
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')} `;
    // .join() concatenates elements of an array and returns a string. By default, the elements will be separated with commas, unless you specify otherwise by passing something in
};



// Change the colour scheme of the chat room

const r = document.querySelector(':root');
switch(room){
    case "Red":
        r.style.setProperty('--dark-color-a', '#f51111'); // Colour for: The app name banner, the text for the Leave Room button, the input bar container, and the text for the Send button
        r.style.setProperty('--dark-color-b', '#f25a5a'); // Colour for: The sidebar, Room name background (slightly darker), and  username/chat bot text in the message bubbles
        r.style.setProperty('--light-color', '#f7b2b2'); // Background colour for: the overall page, message bubbles, Send button, and Leave Room button
        break;

    case "Green":
        r.style.setProperty('--dark-color-a', '#148514');
        r.style.setProperty('--dark-color-b', '#4c8c4c');
        r.style.setProperty('--light-color', '#c3dec3');
        break;

    case "Gold":
        r.style.setProperty('--dark-color-a', '#b09227');
        r.style.setProperty('--dark-color-b', '#d4b02f');
        r.style.setProperty('--light-color', '#f5eac4');
        break;

    case "Silver":
        r.style.setProperty('--dark-color-a', '#adacc2');
        r.style.setProperty('--dark-color-b', '#9291b5');
        r.style.setProperty('--light-color', '#e2e1f0');
        break;

    case "Crystal":
        r.style.setProperty('--dark-color-a', '#a58be0');
        r.style.setProperty('--dark-color-b', '#7a9cc2');
        r.style.setProperty('--light-color', '#b9d7fa');
        break;

    case "Ruby":
        r.style.setProperty('--dark-color-a', '#d61834');
        r.style.setProperty('--dark-color-b', '#0f0f0f');
        r.style.setProperty('--light-color', '#e3b1b5');
        break;

    case "Sapphire":
        r.style.setProperty('--dark-color-a', '#2d58c4');
        r.style.setProperty('--dark-color-b', '#c42d50');
        r.style.setProperty('--light-color', '#e6e9ff');
        break;

    case "Emerald":
        r.style.setProperty('--dark-color-a', '#258040');
        r.style.setProperty('--dark-color-b', '#cf280a');
        r.style.setProperty('--light-color', '#f3f59d');
        break;

    case "Diamond":
        r.style.setProperty('--dark-color-a', '#0c4685');
        r.style.setProperty('--dark-color-b', '#63c8eb');
        r.style.setProperty('--light-color', '#e8f0fa');
        break;

    case "Pearl":
        r.style.setProperty('--dark-color-a', '#9b4cba');
        r.style.setProperty('--dark-color-b', '#f26dab');
        r.style.setProperty('--light-color', '#ebd8f2');
        break;

    case "Platinum":
        r.style.setProperty('--dark-color-a', '#cc3f57');
        r.style.setProperty('--dark-color-b', '#2e2b2c');
        r.style.setProperty('--light-color', '#e6e9ff');
        break;

    default:
        r.style.setProperty('--dark-color-a', '#667aff');
        r.style.setProperty('--dark-color-b', '#7386ff');
        r.style.setProperty('--light-color', '#e6e9ff');
        break
};