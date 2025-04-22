const canvas = document.getElementById('skeleton_draw');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('pencil');
const Redobnt = document.getElementById('redo');
//constantes de cada função

let drawing = false;
//para poder desenhar na imagem
function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startDrawing(e) {
  drawing = true;
  const { x, y } = getCanvasCoords(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  const { x, y } = getCanvasCoords(e);

  ctx.lineWidth = 2;
  ctx.strokeStyle = colorPicker.value;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

//  mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// celular
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); 
  startDrawing(e.touches[0]);
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); 
  draw(e.touches[0]);
}, { passive: false });

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

Redobnt.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

