let plane;
var planeWidth;
var planeHeight;
let planeX = 0;
let planeY = 0;
let speedPlane = 2;
let score = 0;

let obstacles = [];

let boutonsEcranTactile = [];

let locked = false;
let direction;

let end = false;

let gameHeight = 600;
let gameWidth;

let boutonRecommencer;

/* full screening will change the size of the canvas */
function windowResized() {
  gameWidth = windowWidth - 10;
  resizeCanvas(gameWidth, gameHeight);
}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the
page. */
document.ontouchmove = function(event) {
    event.preventDefault();
};

function setup() {
  gameWidth = windowWidth - 10;
  createCanvas(gameWidth, 600);
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
  obstacle2.set("height", 350);
  obstacle2.set("check", false);
  obstacles[1] = obstacle2;
  
  /*let buttonPlay = createButton('Play');
  buttonPlay.position(300,200);
  buttonPlay.mousePressed(function() {
    fullscreen(true);
  });*/

  boutonsEcranTactile.push(createButton('◀︎'));
  boutonsEcranTactile[0].position(gameWidth - 140, gameHeight + 80);

  boutonsEcranTactile.push(createButton('▲'));
  boutonsEcranTactile[1].position(gameWidth - 90, gameHeight + 30);

  boutonsEcranTactile.push(createButton('▶︎'));
  boutonsEcranTactile[2].position(gameWidth - 40, gameHeight + 80);

  boutonsEcranTactile.push(createButton('▼'));
  boutonsEcranTactile[3].position(gameWidth - 90, gameHeight + 80);

  for(let i = 0; i < boutonsEcranTactile.length; i++) {
    boutonsEcranTactile[i].size(40,40);
    boutonsEcranTactile[i].mousePressed(function() { locked = true; direction = i + LEFT_ARROW; });
    boutonsEcranTactile[i].mouseReleased(function() { locked = false; });
  }

  boutonRecommencer = createButton("Recommencer");
  boutonRecommencer.position(gameWidth / 2 + 100, gameHeight / 2 + 200);
  boutonRecommencer.mousePressed(initialisation);
  boutonRecommencer.hide();
}

function preload() {
  plane = loadImage("avion.png");
  fullscreen(true);
}

function draw() {
  background(200);
  fill(0);
  fill(255,0,0);
  rect(obstacles[0].get("x"), obstacles[0].get("y"), obstacles[0].get("width"), obstacles[0].get("height"));
  rect(obstacles[1].get("x"), obstacles[1].get("y"), obstacles[1].get("width"), obstacles[1].get("height"));
  if(locked) {
    move(direction);
  }

  if(!detectCollision()) {
    if(keyIsDown(LEFT_ARROW)) {
      move(LEFT_ARROW);
    }
    if(keyIsDown(UP_ARROW)) {
      move(UP_ARROW);
    }
    if(keyIsDown(RIGHT_ARROW)) {
      move(RIGHT_ARROW);
    }
    if(keyIsDown(DOWN_ARROW)) {
      move(DOWN_ARROW);
    }
  } else {
    end = true;
    fill(0);
    rect(gameWidth / 2 - 200, gameHeight / 2 - 100, 400, 200);
    fill(255);
    textSize(32);
    text("Perdu ! Score final : " + score, gameWidth / 2 - 150,gameHeight / 2 + 8);
    boutonRecommencer.show();
  }
  // Ratio afin de ne pas déformer l'image
  var ratio = plane.height / plane.width;
  planeWidth = 100;
  planeHeight = planeWidth * ratio;
  image(plane, planeX, planeY, planeWidth, planeHeight);
  countScore();
  fill(0);
  textSize(32);
  text("Score : " + score, windowWidth - 180, 30);
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

function move(direction) {
  if(!end) {
    switch(direction) {
      case LEFT_ARROW:
        if(planeX > 0) {
          planeX -= speedPlane;
        }
        break;
      case UP_ARROW:
        if(planeY > 0) {
          planeY -= speedPlane;
        }
        break;
      case RIGHT_ARROW:
        if(planeX < windowWidth - planeWidth) {
          planeX += speedPlane;
        }
        break;
      case DOWN_ARROW:
        if(planeY < gameHeight - planeHeight) {
          planeY += speedPlane; 
        }
        break;
    }
  }
}

function initialisation() {
  planeX = 0;
  planeY = 0;
  score = 0;
  end = false;
  boutonRecommencer.hide();
}