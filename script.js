const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearBtn = document.getElementById('clearBtn');

let drawing = false;

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Mouse events
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);

// Touch events
canvas.addEventListener('touchstart', (e) => startDraw(e.touches[0]));
canvas.addEventListener('touchend', endDraw);
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e.touches[0]);
});

// Draw functions
function startDraw(e) {
  drawing = true;
  draw(e);
}
function endDraw() {
  drawing = false;
  ctx.beginPath();
}
function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Clear button
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
