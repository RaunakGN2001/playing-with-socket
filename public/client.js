const socket = io()
const messageArea = document.querySelector(".message-area");

let username;

do {
    username = prompt("Please enter your name").trim();
} while(!username)



const textarea = document.querySelector("#textarea");
textarea.placeholder = `Chatting as ${username}...`;


var message;
textarea.addEventListener('keyup', (e) => {   
    if(e.key === "Enter") {
        sendMessage(e.target.value);
        e.target.value = ""
    }
    else {
        message = textarea.value.trim();
    }
})


const sendMessage = (message) => {
    let messageData = {
        user: username,
        msg: message, 
    }


    appendMessage(messageData, 'outgoing');
    scrollToBottom(); // so that the view always sticks to the latest message


    socket.emit('message', messageData);
}   


const appendMessage = (messageData, type) => {
    let mainDiv = document.createElement('div')
    mainDiv.innerHTML = `<h4 class="username">${messageData.user}</h4>
    <p class="message">${messageData.msg}</p>`

    const className = type + "-message";

    mainDiv.classList.add(className);
    
    messageArea.appendChild(mainDiv);


}


// Receive messages

socket.on('message', (messageData) => {
    // console.log(messageData); // this is the message data the client receives when other users connected to the same socket send messages

    appendMessage(messageData, 'incoming');
    scrollToBottom();
})


const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}