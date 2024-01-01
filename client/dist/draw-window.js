"use strict";
class DrawWindow {
    constructor(canvasId) {
        this.canvas = this.getCanvasElement(canvasId);
        this.ctx = this.getCanvasContext(this.canvas);
        this.prevX = this.prevY = -1;
        this.penDown = false;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.color = "black";
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.color;
        this.lineWidth = 1;
        this.frame = this.canvas.getBoundingClientRect();
        this.canvasData = this.canvas.toDataURL();
        this.eventMap = {};
        this.initializeCanvasEvents();
    }
    set color(strokeColor) {
        this.ctx.strokeStyle = strokeColor;
    }
    set lineWidth(lineWidth) {
        this.ctx.lineWidth = lineWidth;
    }
    get height() {
        return this.frame.height;
    }
    get width() {
        return this.frame.width;
    }
    get top() {
        console.log("this .top called ", this.frame);
        return this.frame.top;
    }
    get left() {
        return this.frame.left;
    }
    on(event, callback) {
        this.eventMap[event] = this.eventMap[event] || [];
        this.eventMap[event].push(callback);
    }
    canvasIsChanged() {
        const currentCanvasData = this.canvas.toDataURL();
        if (currentCanvasData !== this.canvasData) {
            this.canvasData = currentCanvasData;
            return true;
        }
        return false;
    }
    getCursorLocation() {
        return [this.prevX, this.prevY];
    }
    initializeCanvasEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing.call(this, e.x, e.y);
        });
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.penDown) {
                this.eventMap['draw'].map((callback) => {
                    callback({
                        x1: this.prevX / this.canvas.width,
                        y1: this.prevY / this.canvas.height,
                        x2: e.x / this.canvas.width,
                        y2: e.y / this.canvas.height,
                        lineWidth: this.ctx.lineWidth,
                        color: this.ctx.strokeStyle
                    });
                });
                this.draw(e.x, e.y);
            }
        });
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    }
    getCanvasElement(elementId) {
        const canvas = document.getElementById(elementId);
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`Unable to find canvas element found - ${canvas}`);
        }
        return canvas;
    }
    getCanvasContext(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error("Browser does not support 2d Context");
        }
        return ctx;
    }
    togglePen() {
        this.penDown = !this.penDown;
    }
    startDrawing(x, y) {
        this.togglePen();
        this.draw(x, y);
    }
    stopDrawing() {
        this.togglePen();
        this.prevX = -1;
        this.prevY = -1;
    }
    draw(x, y) {
        if (this.prevX === -1 || this.prevY === -1) {
            this.prevX = x;
            this.prevY = y;
            return;
        }
        this.drawLine(this.prevX, this.prevY, x, y);
        this.prevX = x;
        this.prevY = y;
    }
    drawLine(x1, y1, x2, y2, color, lineWidth) {
        console.log(x1, y1, x2, y2, lineWidth, color);
        color = color || this.ctx.strokeStyle;
        lineWidth = lineWidth || this.ctx.lineWidth;
        let currentColor = this.ctx.strokeStyle;
        let currentLineWidth = this.ctx.lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        console.log(this.canvas.width, this.canvas.height, this.ctx.lineWidth, this.ctx.strokeStyle);
        this.ctx.stroke();
        this.ctx.strokeStyle = currentColor;
        this.ctx.lineWidth = currentLineWidth;
    }
}
