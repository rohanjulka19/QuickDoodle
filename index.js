"use strict";
class DrawWindow {
    constructor(canvasId) {
        this.canvas = this.getCanvasElement(canvasId);
        this.ctx = this.getCanvasContext(this.canvas);
        this.prevX = this.prevY = -1;
        this.penDown = false;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.initializeCanvasEvents();
    }
    initializeCanvasEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing.call(this, e.x, e.y);
        });
        this.canvas.addEventListener('mousemove', (e) => {
            this.draw(e.x, e.y);
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
    }
    draw(x, y) {
        if (!this.penDown || this.prevX === -1 || this.prevY === -1) {
            this.prevX = x;
            this.prevY = y;
            return;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.prevX = x;
        this.prevY = y;
    }
}
new DrawWindow('canvas');
