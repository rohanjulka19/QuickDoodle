"use strict";
let drawWindow = new DrawWindow('canvas');
let penColorOptions = getElementByIdOrThrowError('pen-color-options');
let penWidthOptions = getElementByIdOrThrowError('pen-width-options');
let eraserOptions = getElementByIdOrThrowError('erase-options');
let eraserElement = getElementByIdOrThrowError('eraser');
let penElement = getElementByIdOrThrowError('pen');
let getElemHeight = (e) => parseInt(e.currentTarget.children[0].style.height.replace('px', ''));
let getElemBackground = (e) => e.target.style.background;
function getElementByIdOrThrowError(id) {
    if (!id) {
        throw new Error("ID of the element is required Inside function - getElementByIdOrThrowError");
    }
    let element = document.getElementById(id);
    if (!element) {
        throw new Error("");
    }
    return element;
}
function setEventListenerForClassName(className, event, callback) {
    let elems = document.getElementsByClassName(className);
    for (let elem of elems) {
        elem.addEventListener(event, callback);
    }
}
eraserElement.addEventListener('click', (e) => {
    drawWindow.color = "white";
    drawWindow.ctx.lineWidth = 50;
    penColorOptions.style.display = "none";
    penWidthOptions.style.display = "none";
    eraserOptions.style.display = "grid";
});
penElement.addEventListener('click', (e) => {
    drawWindow.color = "black";
    drawWindow.ctx.lineWidth = 1;
    penColorOptions.style.display = "grid";
    penWidthOptions.style.display = "grid";
    eraserOptions.style.display = "none";
});
setEventListenerForClassName('color', 'click', (e) => drawWindow.color = getElemBackground(e));
setEventListenerForClassName('line-width', 'click', (e) => drawWindow.lineWidth = getElemHeight(e));
setEventListenerForClassName('eraser-radius', 'click', (e) => drawWindow.lineWidth = getElemHeight(e));
