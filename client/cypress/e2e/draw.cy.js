
describe('Test draw and erase capabilities', () => {
   
  beforeEach(() => {
    cy.visit("/index.html")
    cy.getBySel('canvas').as('canvas')
  })  
  
  it('draw a line', () => {
      let img1_name = 'draw-line-before'
      let img2_name = 'draw-line-after'
      captureScreenshot(img1_name)
      drawLine()
      captureScreenshot(img2_name)
      verifyScreenshotsAreDifferent(img1_name, img2_name)
  })

  it('draw a colored line line', () => {
      let img1_name = 'draw-colored-line-before'
      let img2_name = 'draw-colored-line-after'
      drawLine(560, 560)
      captureScreenshot(img1_name, 560, 560)
      cy.getBySel('color-btn-section').children().first().click()
      drawLine(580, 580)
      captureScreenshot(img2_name, 580, 580)
      verifyScreenshotsAreDifferent(img1_name, img2_name)
  })

  it('draw line with greater line width', () => {
      let img1_name = 'line-wdith-before'
      let img2_name = 'line-width-after'
      drawLine(560, 560)
      captureScreenshot(img1_name, 560, 560)
      cy.getBySel('line-width-section').children().last().click()
      drawLine(580, 580)
      captureScreenshot(img2_name, 580, 580)
      verifyScreenshotsAreDifferent(img1_name, img2_name)
  })

  it('erase a line', () => {
    let img1_name = 'erase-line-before'
    let img2_name = 'erase-line-after'
    drawLine(560, 560)
    captureScreenshot(img1_name, 560, 560)
    cy.getBySel('eraser-btn').click()
    drawLine(560, 560)
    captureScreenshot(img2_name, 560, 560)
    verifyScreenshotsAreDifferent(img1_name, img2_name)
  })

  it('erase a line using larger radius eraser', () => {
    let img1_name = 'erase-line-width-before'
    let img2_name = 'erase-line-width-after'
    cy.getBySel('line-width-section').children().last().click()
    drawLine(560, 560)
    captureScreenshot(img1_name, 560, 560)
    cy.getBySel('eraser-btn').click()
    cy.getBySel('eraser-width-section').children().last().click()
    drawLine(560, 560)
    captureScreenshot(img2_name, 560, 560)
    verifyScreenshotsAreDifferent(img1_name, img2_name)
  })

  it('draw erase draw', () => {
      let img1_name = 'draw-erase-draw-before'
      let img2_name = 'draw-erase-draw-after'
      drawLine(560, 560)
      cy.getBySel('eraser-btn').click()
      drawLine(560, 560)
      captureScreenshot(img1_name, 560, 560)
      cy.getBySel('pen-btn').click()
      drawLine(560, 560)
      captureScreenshot(img2_name)
      verifyScreenshotsAreDifferent(img1_name, img2_name)  
  })

})

// 560 is just a arbitrary value I chose
function drawLine(x=560, y=560 ) {
  let canvas = cy.get('@canvas')
  let x1 = x + 10
  let y1 = y + 10
  canvas.trigger('mousedown', x, y, {eventConstructor: 'MouseEvent'})
  canvas.trigger('mousemove', x1, y1, {eventConstructor: 'MouseEvent'})
  canvas.trigger('mouseup', x1, y1, {eventConstructor: 'MouseEvent'})
}

function captureScreenshot(image_name, x_coord=560, y_coord=560) {
    cy.screenshot(image_name, {overwrite: true, clip: {x: x_coord, y: y_coord, width: 10, height: 10}})
}

function verifyScreenshotsAreDifferent(img1_name, img2_name) {
  getPixelsChanged(getRelPathForScreenshot(img1_name), getRelPathForScreenshot(img2_name))
  .then((pixelsChanged) => {
      expect(pixelsChanged).to.be.greaterThan(0)
  })
}

function getPixelsChanged(image1, image2) {
    return readFiles(image1, image2)
    .then(([image1_data, image2_data]) => {
      const pixelmatch = require('pixelmatch')
      const PNG = require('pngjs').PNG  
      let image1_png = PNG.sync.read(image1_data)
      let image2_png = PNG.sync.read(image2_data)
      const {width, height} = image1_png
      const diff = new PNG({width, height})
      const pixelsChanged = pixelmatch(image1_png.data, image2_png.data, diff.data, width, height, {threshold: 0.1})
      return pixelsChanged

    })
}

function readFiles(image1, image2) {
  return cy.readFile(image1, null)   // readFile will return a buffer only if encoding is null
  .then((image1_data) => {
    cy.readFile(image2, null)
    .then((image2_data) => {
        return [image1_data, image2_data]
    })
  })
}

function getRelPathForScreenshot(image) {
    return './cypress/screenshots/draw.cy.js/' + image + '.png'
}