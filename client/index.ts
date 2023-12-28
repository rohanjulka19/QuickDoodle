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
        this.lineWidth = 1
        this.initializeCanvasEvents()
    }

    set color(strokeColor: string) {
        this.ctx.strokeStyle = strokeColor
    }

    set lineWidth(lineWidth: number) {
        this.ctx.lineWidth = lineWidth
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
let penColorOptions: HTMLElement  = getElementByIdOrThrowError('pen-color-options')
let penWidthOptions: HTMLElement  =  getElementByIdOrThrowError('pen-width-options')
let eraserOptions: HTMLElement =  getElementByIdOrThrowError('erase-options')
let eraserElement: HTMLElement =  getElementByIdOrThrowError('eraser')
let penElement: HTMLElement = getElementByIdOrThrowError('pen')

let getElemHeight = (e: Event) => parseInt(((e.currentTarget as HTMLAnchorElement).children[0] as HTMLHRElement).style.height.replace('px', ''))
let getElemBackground =  (e: Event) => drawWindow.color = (e.target as HTMLAnchorElement).style.background

function getElementByIdOrThrowError(id: string): HTMLElement {
    if(!id) {
        throw new Error("ID of the element is required Inside function - getElementByIdOrThrowError")
    }
    let element: HTMLElement | null = document.getElementById(id)
    if (!element) {
        throw new Error("")
    }
    return element
}

function setEventListenerForClassName(className: string, event: string, callback: (e: Event) => {}) {
    let elems = document.getElementsByClassName(className)
    for (let elem of elems) {
        elem.addEventListener(event, callback)
    }
}

eraserElement.addEventListener('click', (e) => {
    drawWindow.color = "white"
    drawWindow.ctx.lineWidth = 50
    penColorOptions.style.display = "none" 
    penWidthOptions.style.display = "none"
    eraserOptions.style.display = "grid"
})

penElement.addEventListener('click', (e) => {
    drawWindow.color = "black"
    drawWindow.ctx.lineWidth = 1
    penColorOptions.style.display = "grid" 
    penWidthOptions.style.display = "grid"
    eraserOptions.style.display = "none"
})

setEventListenerForClassName('color', 'click', getElemHeight)
setEventListenerForClassName('line-width', 'click', getElemBackground)
setEventListenerForClassName('eraser-radius', 'click', getElemBackground)
