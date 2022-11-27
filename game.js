const ship = new SpaceShip(
  "ship1",
  { x: 30, y: 30 },
  { x: 20, y: cnvHeight / 2 - 15 },
  "normal"
);

const arrOfStars = [];
let counterUniverseSize = 0;

let randomStars = Math.floor(Math.random() * (5000 - 1600) + 1600);
let randomStarsPosX;
let randomStarsPosY;
let randomStarsRadius;
let backgroundMovement = true;
const universeSizeX = 8000;

function load() {
  createRandomStars();
}

function update(dt) {
  // BACKGROUND MOVEMENT \\
  if (backgroundMovement) {
    for (let i = 0; i < arrOfStars.length; i++) {
      arrOfStars[i].pos.x -= dt * 100;
    }
    counterUniverseSize += dt * 100;
  }

  if (counterUniverseSize >= universeSizeX - cnvWidth) {
    for (let i = 0; i < arrOfStars.length; i++) {
      backgroundMovement = false;
    }
  }
}

function draw() {
  // DRAW STARS RANDOMLY \\
  for (let i = 0; i < arrOfStars.length; i++) {
    arrOfStars[i].draw();
  }

  // DRAW SHIP \\
  ship.draw();
}

function SpaceShip(name, size, position, weapons) {
  this.name = name;
  this.size = size;
  this.pos = position;
  this.weapons = weapons;

  this.draw = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, size.x, size.y);
  };
}

function Stars(position, radius, velocity, color) {
  this.pos = position;
  this.radius = radius;
  this.velocity = velocity;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };
}

function createRandomStars() {
  for (let nbStars = 0; nbStars < randomStars; nbStars++) {
    randomStarsPosX = Math.floor(Math.random() * (universeSizeX - 1 + 1) + 1);
    randomStarsPosY = Math.floor(Math.random() * (500 - 1 + 1) + 1);
    randomStarsRadius = Math.random();

    arrOfStars[nbStars] = new Stars(
      { x: randomStarsPosX, y: randomStarsPosY },
      randomStarsRadius,
      null,
      "white"
    );
  }
}
