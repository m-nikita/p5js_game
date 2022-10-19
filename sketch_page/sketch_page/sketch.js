let r = 0;
let g = 0;
let b = 255;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  r = map(mouseX, 0,600, 100, 200);
  b = map(mouseX, 0,600, 200, 100);
  g = map(mouseX, 0, 600, 150, 100);
  background(r,g,b);
  //ellipse
  fill(250,118,222);
  ellipse(mouseX, 200, 64, 64);
}