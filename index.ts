function getCanvasElement(): HTMLCanvasElement {
    const canvas = document.getElementById('canvas') 
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Unable to find canvas element");
    }
    return canvas
}

const canvas = getCanvasElement()
const ctx = canvas.getContext('2d');

