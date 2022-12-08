const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")

const socket = new WebSocket(`ws://${window.location.host}`);


function handleOpen() {
    console.log("Connected to Server ✅");
}
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
    console.log("New message:", message.data, "from the server")
});

socket.addEventListener("close", () => {
    console.log("connected to server x");
});

setTimeout(() => {
    socket.send("hello from thd browser")
}, 10000);