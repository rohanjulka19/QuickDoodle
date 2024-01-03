import { drawWindow } from "./index"

let socket = new WebSocket("ws://localhost:9000")
socket.onopen = function(e) {
    drawWindow.on('draw', (drawEvt: any) => {
        socket.send(JSON.stringify(drawEvt))
    })
}
socket.onmessage = function(event) {
    console.log(event.data)
    let drawEvt = JSON.parse(event.data)
    drawWindow.drawLine(drawEvt.x1 * drawWindow.width, 
        drawEvt.y1 * drawWindow.height, 
        drawEvt.x2 * drawWindow.width, 
        drawEvt.y2 * drawWindow.height, 
        drawEvt.color, 
        drawEvt.lineWidth)
}
socket.onclose = function(e) {
    console.log(`Connection Closed`)
}
socket.onerror = function(error) {
    console.log(`Error while establishing connection - ${error}`)
}
