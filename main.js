onload = init;

let canvas;
let ctx;

let oldTimeStamp;

const cnvWidth = 800;
const cnvHeight = 500;

function init() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  ctx.canvas.width = cnvWidth;
  ctx.canvas.height = cnvHeight;

  load();

  requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
  if (oldTimeStamp != null) {
    let dt = (timeStamp - oldTimeStamp) / 1000;

    update(dt);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw();
  }

  oldTimeStamp = timeStamp;

  requestAnimationFrame(gameLoop);
}
