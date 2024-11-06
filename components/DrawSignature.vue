<template>
  <div class="sign">
    <div ref="container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import p5 from 'p5'

const UNDERLINE_WIDTH = 2
const PEN_WIDTH = 4

const container = ref(null)
const svgOutput = ref('')
const hasPoints = ref(false)

let p5Instance = null
let points = []
let currentStroke = []
let isDrawing = false
let lastSampleTime = 0
const SAMPLE_INTERVAL = 20; // Minimum time between points in ms

const sketch = (p) => {
  p.reset = () => {
    p.background(0)
    p.strokeWeight(UNDERLINE_WIDTH)
    p.stroke(28)
    p.line(80, 280, 432, 280)
    p.stroke(255)
    p.strokeWeight(PEN_WIDTH)
    p.noFill()
  }

  p.setup = () => {
    p.createCanvas(512, 512)

    // Prevent scrolling on touch devices
    p.canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false })
    p.reset()
  }

  p.draw = () => {
    const lastPoint = currentStroke[currentStroke.length - 1]
    const sufficientDistance = !lastPoint || p.dist(p.mouseX, p.mouseY, lastPoint.x, lastPoint.y) > 5
    const sufficientTimeElapsed = p.millis() - lastSampleTime > SAMPLE_INTERVAL

    if (isDrawing && (sufficientDistance || sufficientTimeElapsed)) {
      hasPoints.value = true
      currentStroke.push({ x: p.mouseX, y: p.mouseY })
      lastSampleTime = p.millis()

      // Redraw everything
      p.background(0)
      p.stroke(28)
      p.strokeWeight(UNDERLINE_WIDTH)
      p.line(80, 280, 432, 280)
      p.stroke(255)
      p.strokeWeight(PEN_WIDTH)

      // Draw completed strokes
      points.forEach(stroke => {
        drawCurvedLine(p, stroke)
      })

      // Draw current stroke
      if (currentStroke.length > 1) {
        drawCurvedLine(p, currentStroke)
      }
    }
  }

  p.mousePressed = () => {
    if (isMouseOverCanvas(p)) {
      isDrawing = true
      currentStroke = [{ x: p.mouseX, y: p.mouseY }]
      lastSampleTime = p.millis()
    }
  }

  p.mouseReleased = () => {
    if (isDrawing) {
      isDrawing = false
      if (currentStroke.length > 1) {
        points.push(currentStroke)
      }
      currentStroke = []
    }
  }

  // Add touch handlers that mirror mouse handlers
  p.touchStarted = p.mousePressed
  p.touchEnded = p.mouseReleased
}

const drawCurvedLine = (p, points) => {
  if (points.length < 2) return

  p.beginShape()
  // Start with the first point
  p.curveVertex(points[0].x, points[0].y)

  // Add all points as curve vertices
  points.forEach(point => {
    p.curveVertex(point.x, point.y)
  })

  // End with the last point
  p.curveVertex(points[points.length - 1].x, points[points.length - 1].y)
  p.endShape()
}

const isMouseOverCanvas = (p) => {
  return p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height
}

const clearCanvas = () => {
  if (p5Instance) {
    p5Instance.reset()
    points = []
    currentStroke = []
    svgOutput.value = ''
    hasPoints.value = false
  }
}

const exportPath = () => {
  if (points.length === 0) {
    alert('Please draw something first!')
    return
  }

  let pathData = ''
  points.forEach(stroke => {
    if (stroke.length > 0) {
      // Move to first point
      pathData += `M${stroke[0].x} ${stroke[0].y}`

      // If we have enough points, create smooth curves
      for (let i = 1; i < stroke.length - 1; i++) {
        const p0 = stroke[i - 1]
        const p1 = stroke[i]
        const p2 = stroke[i + 1]

        // Calculate the midpoint between p1 and p2
        const mpX = (p1.x + p2.x) / 2
        const mpY = (p1.y + p2.y) / 2

        // Use quadratic curve command (Q)
        // Control point is the current point (p1)
        // End point is the midpoint between p1 and p2
        pathData += ` Q${p1.x} ${p1.y}, ${mpX} ${mpY}`
      }

      // Add a line to the last point if we have points left
      if (stroke.length > 1) {
        pathData += ` L${stroke[stroke.length - 1].x} ${stroke[stroke.length - 1].y}`
      }
    }
  })

  return pathData
}

onMounted(() => {
  p5Instance = new p5(sketch, container.value)
})

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove()
  }
})

defineExpose({
  clear: clearCanvas,
  export: exportPath,
  hasPoints,
})
</script>

<style scoped>
.sign {
  border: var(--border-dark);
  height: 512px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    overflow: hidden;
    height: 510px;
    width: 510px;
    max-width: calc(100% - 2px);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
