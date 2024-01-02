class DrawWindow {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    prevX: number;
    prevY: number;
    penDown: boolean;
    frame: DOMRect;
    canvasData: string;
    eventMap: Record<string, any[]>

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
        this.lineWidth = 1 
        this.frame = this.canvas.getBoundingClientRect()
        this.canvasData = this.canvas.toDataURL()
        this.eventMap = {
            "draw": []
        }
        this.initializeCanvasEvents()
    }

    set color(strokeColor: string) {
        this.ctx.strokeStyle = strokeColor
    }

    set lineWidth(lineWidth: number) {
        this.ctx.lineWidth = lineWidth
    }

    get height(): number {
        return this.frame.height
    }

    get width(): number {
        return this.frame.width
    }

    get top(): number {
        console.log("this .top called ", this.frame)
        return this.frame.top
    }
    
    get left(): number {
        return this.frame.left
    }

    on(event: any, callback: any) {
        this.eventMap[event].push(callback)
    }

    initializeCanvasEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing.call(this, e.x, e.y)
         })
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
                    })
                })
                this.draw(e.x, e.y)
            }
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
        this.prevX = -1
        this.prevY = -1
    }

    draw(x: number, y: number) {
        if (this.prevX === -1 || this.prevY === -1) {
            this.prevX = x 
            this.prevY = y
            return
        }
        this.drawLine(this.prevX, this.prevY, x, y)
        this.prevX = x
        this.prevY = y
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color?: string, lineWidth?: number) {
        console.log(x1, y1, x2, y2, lineWidth, color)
        color = color || this.ctx.strokeStyle as string
        lineWidth = lineWidth || this.ctx.lineWidth
        let currentColor = this.ctx.strokeStyle
        let currentLineWidth = this.ctx.lineWidth
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = lineWidth
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        console.log(this.canvas.width, this.canvas.height, this.ctx.lineWidth, this.ctx.strokeStyle)
        this.ctx.stroke()
        this.ctx.strokeStyle = currentColor
        this.ctx.lineWidth = currentLineWidth
        
    }

}
