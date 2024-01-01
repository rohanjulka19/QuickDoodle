import { IncomingMessage, ServerResponse } from "http";
import { Message, connection, request } from "websocket";

const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.write("Hello")
    res.end()
})

server.listen(9000, () => {
    console.log("Server is listening on port - 9000")
})

const wServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
    maxReceivedFrameSize: 131072,
    maxReceivedMessageSize: 10 * 1024 * 1024
})

function originIsAllowed(origin: string): boolean{
    // put logic here to detect whether the specified origin is allowed.
    return true
}

const connections: connection[] = []

wServer.on('request', (request: request) => {
    if(!originIsAllowed(request.origin)) {
        request.reject()
        console.log(`Connection From Origin - ${request.origin} Rejected`)
        return
    }
   const connection = request.accept(null, request.origin)
    connections.push(connection)
    console.log("Connection Open")
    connection.on('message', (message: Message) => {
        console.log("recieved message")
        let message_obj = (message.type == "utf8" && message.utf8Data) || ""
        connections.map((c) =>connection !== c ? c.send(message_obj): "")
    })

    connection.on('close', (reasonCode: number, desc: string)=> {

    })
})