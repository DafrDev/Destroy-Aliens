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
let bigStar = false;
const universeSizeX = 8000;

/////////////////
///// LOAD /////
///////////////

function load() {
  createRandomStars();
}

///////////////////
///// UPDATE /////
/////////////////

function update(dt) {
  // BACKGROUND MOVEMENT \\
  if (backgroundMovement) {
    for (let i = 0; i < arrOfStars.length; i++) {
      arrOfStars[i].pos.x -= dt * 50;

      if (arrOfStars[i].radius >= 0.7) {
        arrOfStars[i].pos.x -= dt * 50;
      }

      if (arrOfStars[i].radius >= 0.9) {
        arrOfStars[i].pos.x -= dt * 50;
      }
    }
    counterUniverseSize += dt * 100;
  }

  if (counterUniverseSize >= universeSizeX - cnvWidth) {
    backgroundMovement = false;
  }

  addEventListener("keydown", e => getKeysDown(e, dt));
  addEventListener("keyup", e => getKeysUp(e, dt));

  ship.pos.x += ship.velocity.x;
  ship.pos.y += ship.velocity.y;
}

/////////////////
///// DRAW /////
///////////////

function draw() {
  // DRAW STARS RANDOMLY \\
  for (let i = 0; i < arrOfStars.length; i++) {
    arrOfStars[i].draw();
  }

  // DRAW SHIP \\
  ship.draw();
}

////////////////////////////////
///// OBJECT CONSTRUCTORS /////
//////////////////////////////

function SpaceShip(name, size, position, weapons) {
  this.name = name;
  this.size = size;
  this.pos = position;
  this.weapons = weapons;
  this.velocity = {
    x: 0,
    y: 0,
  };

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

//////////////////////
///// FUNCTIONS /////
////////////////////

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

//////////////////////////
/// Keyboard AND Mouse///
////////////////////////

function getKeysDown(e, dt) {
  switch (e.key) {
    case "d":
      ship.velocity.x = 1;
      break;
    case "q":
      ship.velocity.x = -1;
      break;
    case "z":
      ship.velocity.y = -1;
      break;
    case "s":
      ship.velocity.y = 1;
      break;
  }
}

function getKeysUp(e) {
  switch (e.key) {
    case "d":
      ship.velocity.x = 0;
      break;
    case "q":
      ship.velocity.x = 0;
      break;
    case "z":
      ship.velocity.y = 0;
      break;
    case "s":
      ship.velocity.y = 0;
      break;
  }
}
