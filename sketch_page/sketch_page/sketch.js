let r = 0;
let g = 0;
let b = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);

  img_tuyau = loadImage('assets/img/tuyau.png')
}

function draw() {

  r = map(mouseX, 0, 600, 100, 200);
  b = map(mouseX, 0, 600, 200, 100);
  g = map(mouseX, 0, 600, 150, 100);
  background(240);

  //ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);

  //let tuyau = new Tuyau(img_tuyau, 300, 300, 244 / 2, 1499 / 2);
  //tuyau.afficherTuyau();
  genererTuyaux();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Tuyau {

  constructor(image_tuyau, position_x_tuyau, position_y_tuyau, largeur_tuyau, hauteur_tuyau) {
    this.image_tuyau = image_tuyau;
    this.position_x_tuyau = position_x_tuyau;
    this.position_y_tuyau = position_y_tuyau;
    this.largeur_tuyau = largeur_tuyau;
    this.hauteur_tuyau = hauteur_tuyau
  }

  afficherTuyau() {
    image(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  }

}

function genererTuyaux() {
  var tuyaux = [];
  var nbr_tuyaux = 10;
  var decalage_tuyaux_x = 0;
  let espacement_tuyaux_x = 200
  var position_x_premier_tuyau = 300;
  var position_y_premier_tuyau = 300;


  for(i = 0; i <= nbr_tuyaux; i++) {
    tuyaux[i] = new Tuyau(img_tuyau, position_x_premier_tuyau + decalage_tuyaux_x, position_y_premier_tuyau, 244 / 2, 1499 / 2);
    decalage_tuyaux_x += espacement_tuyaux_x;
    tuyaux[i].afficherTuyau();
  }
}