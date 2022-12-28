const socket = io()
const messageArea = document.querySelector(".message-area");

let username;

do {
    username = prompt("Please enter your name").trim();
} while(!username)



const textarea = document.querySelector("#textarea");
var message;
textarea.addEventListener('keyup', (e) => {   
    if(e.key === "Enter") {
        sendMessage(e.target.value);
        e.target.value = ""
    }
    else {
        message = textarea.value;
    }
})


const sendMessage = (message) => {
    let messageData = {
        user: username,
        msg: message, 
    }


    appendMessage(messageData, 'outgoing')
}


const appendMessage = (messageData, type) => {
    let mainDiv = document.createElement('div')
    mainDiv.innerHTML = `<h4 class="username">${messageData.user}</h4>
    <p class="message">${messageData.msg}</p>`

    const className = type + "-message";

    mainDiv.classList.add(className);
    
    messageArea.appendChild(mainDiv);


}


