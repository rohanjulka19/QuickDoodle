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
        this.initializeCanvasEvents()
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

new DrawWindow('canvas')
