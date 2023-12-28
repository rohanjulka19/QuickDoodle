"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer((req, res) => {
    res.write("Hello");
    res.end();
});
server.listen(9000, () => {
    console.log("Server is listening on port - 9000");
});
const wServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}
wServer.on('request', (request) => {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log(`Connection From Origin - ${request.origin} Rejected`);
        return;
    }
    const connection = request.accept(null, request.origin); //Chosen Protocol ?
    connection.on('message', (message) => {
    });
    connection.on('close', (reasonCode, desc) => {
    });
});
