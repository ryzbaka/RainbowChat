let someIndex = 1;
const messageContainer = document.querySelector(".transcript-container");
const bottomButton = document.querySelector(".bottom-scroll");
messageContainer.scrollTop = messageContainer.scrollHeight;
bottomButton.addEventListener("click", () => {
  messageContainer.scrollTop = messageContainer.scrollHeight;
});
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
  }
});
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
}); //triggered "my event", terminal should show 'User Connected.'
socket.on("disconnect", () => {
  clientStatus.innerText = "OFFLINE";
  clientStatus.style.color = "hotpink";
  clientStatus.style.backgroundColor = "red";
});
