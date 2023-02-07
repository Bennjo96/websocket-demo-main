var conn;
var messCounter = 0;

function connect() {
    conn = new WebSocket("ws://localhost:8080/websocket-demo/broadcast");
    conn.onmessage = (msg) => {
        let cValue = document.getElementById("out").value;
        document.getElementById("out").value = cValue + msg.data + "\n";
    }
    document.getElementById("status").innerText="Verbindung wurde aufgebaut";
    document.getElementById("connect").setAttribute("disabled", "disabled");
    document.getElementById("connect").setAttribute("style", "color:grey");
    document.getElementById("disconnect").removeAttribute("disabled");
    document.getElementById("disconnect").setAttribute("style", "color:red");
}

function disconnect() {
    conn.close();
    document.getElementById("status").innerText="Verbindung wurde getrennt";
    document.getElementById("out").value = "";
    document.getElementById("disconnect").setAttribute("disabled", "disabled");
    document.getElementById("disconnect").setAttribute("style", "color:grey");
    document.getElementById("connect").removeAttribute("disabled");
    document.getElementById("connect").setAttribute("style", "color:green");
}

function sendMessage() {
    conn.send(document.getElementById("msg").value);
    document.getElementById("status").innerText="Nachricht " + (++messCounter) + " wurde verschickt";
}