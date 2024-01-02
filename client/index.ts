let drawWindow: DrawWindow = new DrawWindow('canvas')
let penColorOptions: HTMLElement  = getElementByIdOrThrowError('pen-color-options')
let penWidthOptions: HTMLElement  =  getElementByIdOrThrowError('pen-width-options')
let eraserOptions: HTMLElement =  getElementByIdOrThrowError('erase-options')
let eraserElement: HTMLElement =  getElementByIdOrThrowError('eraser')
let penElement: HTMLElement = getElementByIdOrThrowError('pen')

let getElemHeight = (e: Event) => parseInt(((e.currentTarget as HTMLAnchorElement).children[0] as HTMLElement).style.height.replace('px', ''))
let getElemBackground =  (e: Event) => (e.target as HTMLAnchorElement).style.background

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
    drawWindow.ctx.lineWidth = 10
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

setEventListenerForClassName('color', 'click', (e) => drawWindow.color = getElemBackground(e))
setEventListenerForClassName('line-width', 'click', (e)=> drawWindow.lineWidth = getElemHeight(e))
setEventListenerForClassName('eraser-radius', 'click', (e) => drawWindow.lineWidth = getElemHeight(e))

