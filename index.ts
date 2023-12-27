class DrawWindow {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    prevX: number;
    prevY: number;
    penDown: boolean;

    constructor(canvasId: string) {
        this.canvas = this.getCanvasElement(canvasId) as HTMLCanvasElement
        this.ctx = this.getCanvasContext(this.canvas)
        this.prevX = this.prevY = -1
        this.penDown = false
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.color = "black"
        this.ctx.lineCap = "round"
        this.ctx.strokeStyle = this.color 
        this.initializeCanvasEvents()
    }

    set color(strokeColor: string) {
        this.ctx.strokeStyle = strokeColor
    }

    initializeCanvasEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing.call(this, e.x, e.y)
         })
         this.canvas.addEventListener('mousemove', (e) => {
            this.draw(e.x, e.y)
        })
         this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this))    
    }


    getCanvasElement(elementId: string): HTMLCanvasElement {
        const canvas = document.getElementById(elementId) 
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`Unable to find canvas element found - ${canvas}`);
        }
        return canvas
    }

    getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error("Browser does not support 2d Context")
        }
        return ctx
    }

    togglePen() {
        this.penDown = !this.penDown
    }

    startDrawing(x: number, y: number) {
        this.togglePen()
        this.draw(x, y)
    }
    
    stopDrawing() {
        this.togglePen()
    }

    draw(x: number, y: number) {
        if (!this.penDown || this.prevX === -1 || this.prevY === -1) {
            this.prevX = x 
            this.prevY = y
            return
        }
        this.ctx.beginPath()
        this.ctx.moveTo(this.prevX, this.prevY)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        this.prevX = x
        this.prevY = y
    }
}

let drawWindow: DrawWindow = new DrawWindow('canvas')

let eraserElement: HTMLElement| null = document.getElementById('eraser')
if (! eraserElement) {
    throw new Error("No eraser element found")
}

eraserElement.addEventListener('click', (e) => {
    drawWindow.color = "white"
    drawWindow.ctx.lineWidth = 50
})

let penElement: HTMLElement| null = document.getElementById('pen')
if (! penElement) {
    throw new Error("No eraser element found")
}


penElement.addEventListener('click', (e) => {
    drawWindow.color = "black"
    drawWindow.ctx.lineWidth = 1
})