// Ratio afin de ne pas déformer l'image
let plane;
var planeWidth;
var planeHeight;
let planeX = 0;
let planeY = 0;
let speedPlane = 2;
let score = 0;

let obstacles = [];

function setup() {
  createCanvas(600, 400);
  let obstacle1 = new Map();
  obstacle1.set("x", 200);
  obstacle1.set("y", 0);
  obstacle1.set("width", 100);
  obstacle1.set("height", 150);
  obstacle1.set("check", false);
  obstacles[0] = obstacle1;
  let obstacle2 = new Map();
  obstacle2.set("x", 200);
  obstacle2.set("y", 250);
  obstacle2.set("width", 100);
  obstacle2.set("height", 150);
  obstacle2.set("check", false);
  obstacles[1] = obstacle2;
}

function preload() {
  plane = loadImage("avion.png");
}

function draw() {
  background(200);
  fill(255,0,0);
  rect(obstacles[0].get("x"), obstacles[0].get("y"), obstacles[0].get("width"), obstacles[0].get("height"));
  rect(obstacles[1].get("x"), obstacles[1].get("y"), obstacles[1].get("width"), obstacles[1].get("height"));
  if(!detectCollision()) {
    if(keyIsDown(LEFT_ARROW)) {
      if(planeX > 0) {
        planeX -= speedPlane;
      }
    }
    if(keyIsDown(RIGHT_ARROW)) {
      if(planeX < 500) {
        planeX += speedPlane;
      }
    }
    if(keyIsDown(UP_ARROW)) {
      if(planeY > -25) {
        planeY -= speedPlane;
      }
    }
    if(keyIsDown(DOWN_ARROW)) {
      if(planeY < 325) {
        planeY += speedPlane; 
      }
    }
  } else {
    fill(0);
    textSize(32);
    text("Perdu ! Score final : " + score, 100,200);
  }
  var ratio = plane.height / plane.width;
  planeWidth = 100;
  planeHeight = planeWidth * ratio;
  image(plane, planeX, planeY, planeWidth, planeHeight);
  countScore();
  fill(0);
  textSize(32);
  text("Score : " + score, 460, 30);
}

function detectCollision() {
  var collision = false;
  var index = 0;
  while(!collision && index < obstacles.length) {
    if (planeX < obstacles[index].get("x") + obstacles[index].get("width") &&
      planeX + planeWidth > obstacles[index].get("x") &&
      planeY < obstacles[index].get("y") + obstacles[index].get("height") &&
      planeHeight + planeY > obstacles[index].get("y")) {
        collision = true;
    }
    index++;
  }
  return collision;
}

function countScore() {
  for(var i = 0; i < obstacles.length; i += 2) {
    if(planeX > obstacles[i].get("x") + obstacles[i].get("width")) {
      if(!obstacles[i].get("check")) {
        obstacles[i].set("check", true);
        score++;
      }
    }
  }
}