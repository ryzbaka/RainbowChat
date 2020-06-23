let someIndex = 1;
const messageContainer = document.querySelector(".transcript-container");
const bottomButton = document.querySelector(".bottom-scroll");
const sendButton = document.querySelector('.send-button')
const typingBox=document.querySelector('.typing-box')
const clientName=document.querySelector('.client-name').innerText.split("\'")[0]
messageContainer.scrollTop = messageContainer.scrollHeight;

function addToTranscript(messageText){
    const message=document.createElement("p")
    message.innerText=messageText
    messageContainer.appendChild(message)
}

//this area for event listeners

bottomButton.addEventListener("click", () => {
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

sendButton.addEventListener("click",()=>{
    console.log('clicked')
    console.log(typingBox.value)
    socket.emit("client-message",{
        data:typingBox.value,
        username:clientName
    })
})
/* this code is for autopoulating transcipt when scroll up
messageContainer.addEventListener("scroll", () => {
  //console.log(messageContainer.scrollTop)
  if (messageContainer.scrollTop === 0) {
    //alert('querying next 10 messages')
    for (let i = 10; i > 0; i--) {
      const message = document.createElement("p");
      message.innerText = "set-" + someIndex + " message" + i;
      message.className = "message";
      messageContainer.insertBefore(message, messageContainer.children[0]);
    }
    someIndex += 1;
  }?
});
*/


/*
This section is for socket code
*/
let clientStatus = document.querySelector(".client-status");
const clientHeader = document.querySelector(".client-header");
const socket = io.connect("http://" + document.domain + ":" + location.port);

socket.on("connect", () => {
  const clientName = document
    .querySelector(".client-name")
    .innerText.split("'")[0];
  socket.emit("client-connected", {
    data: clientName, //json object being fed into 'my event'
  });
  clientStatus.innerText = "ONLINE";
  clientStatus.style.color = "lightgreen";
  clientStatus.style.backgroundColor = "green";
  /*
  for (let i = 10; i > 0; i--) {
    const message = document.createElement("p");
    message.innerText = "set-" + someIndex + " message" + i;
    message.className = "message";
    messageContainer.insertBefore(message, messageContainer.children[0]);
  }*/

}); //triggered "my event", terminal should show 'User Connected.'



socket.on("disconnect", () => {
  clientStatus.innerText = "OFFLINE";
  clientStatus.style.color = "hotpink";
  clientStatus.style.backgroundColor = "red";
});

socket.on('message-to-transcript',(message)=>{
    messageContainer.scrollTop=messageContainer.scrollHeight;
    messageString=message.username+" : "+message.data
    console.log(messageString)
    addToTranscript(messageString)
})