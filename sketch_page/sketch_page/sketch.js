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

  genererTuyaux();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Tuyau {
  position_y_tuyau = random(windowHeight - 200, windowHeight - 300);

  constructor(image_tuyau, position_x_tuyau, position_y_tuyau, largeur_tuyau, hauteur_tuyau) {
    this.image_tuyau = image_tuyau;
    this.position_x_tuyau = position_x_tuyau;
    this.position_y_tuyau = position_y_tuyau;
    this.largeur_tuyau = largeur_tuyau;
    this.hauteur_tuyau = hauteur_tuyau;
  }

  afficherTuyau() {
    image(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  }

}

function genererTuyaux() {
  var tuyaux = [];
  var nbr_tuyaux = 5;
  var decalage_tuyaux_x = 0;
  let espacement_tuyaux_x = 200
  var position_x_premier_tuyau = 300;
  var ratio_taille_tuyaux = 4;
  // ne pas changer les dimensions des images pour ne pas les déformer. Utiliser plutot le RATIO
  let largeur_tuyau = 244;
  let hauteur_tuyau = 1499;

  for(i = 0; i <= nbr_tuyaux; i++) {
    tuyaux[i] = new Tuyau(img_tuyau, position_x_premier_tuyau + decalage_tuyaux_x, random(400,500), largeur_tuyau / ratio_taille_tuyaux, hauteur_tuyau / ratio_taille_tuyaux);
    decalage_tuyaux_x += espacement_tuyaux_x;
    tuyaux[i].afficherTuyau();
  }
  noLoop();
}