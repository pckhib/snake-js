window.onload = () => init();

let canvas;
let context;

let vx = 1;
let vy = 0;

const gameWidth = 20;
const gameHeight = 20;

let px, py;

let line = [];
let lineLength = 3;

let segWidth = 10;
let setHeight = 10;

function init() {
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");

  document.addEventListener("keydown", onKeyDown);

  segWidth = canvas.width / gameWidth;
  segHeight = canvas.height / gameHeight;

  px = Math.floor(gameWidth / 2);
  py = Math.floor(gameHeight / 2);

  for (let i = lineLength - 1; i >= 0; i--) {
    line.push({ x: px - i, y: py });
  }

  setInterval(gameLoop, 1000 / 5);
}

function gameLoop() {
  px += vx;
  py += vy;

  if (px < 0) {
    px = gameWidth - 1;
  }
  if (px > gameWidth - 1) {
    px = 0;
  }
  if (py < 0) {
    py = gameHeight - 1;
  }
  if (py > gameHeight - 1) {
    py = 0;
  }

  line.push({ x: px, y: py });
  line = line.slice(line.length - lineLength);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "lime";
  line.forEach((point) => {
    context.fillRect(
      point.x * segWidth + 1,
      point.y * segHeight + 1,
      segWidth - 2,
      segHeight - 2
    );
  });
}

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      vx = -1;
      vy = 0;
      break;
    case "ArrowUp":
      vx = 0;
      vy = -1;
      break;
    case "ArrowRight":
      vx = 1;
      vy = 0;
      break;
    case "ArrowDown":
      vx = 0;
      vy = 1;
      break;
    default:
    // do nothing
  }
}
