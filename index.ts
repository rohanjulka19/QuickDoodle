function getCanvasElement(elementId: string): HTMLCanvasElement {
    const canvas = document.getElementById(elementId) 
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Unable to find canvas element");
    }
    return canvas
}

function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        throw new Error("Browser does not support 2d Context")
    }
    return ctx
}

const ctx = getCanvasContext(getCanvasElement('canvas'))
