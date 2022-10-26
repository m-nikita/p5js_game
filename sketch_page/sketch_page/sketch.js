var Tuyaux = [];
var nbrTuyauxTotal = 5;
var espaceEntreTuyaux = 200;
var j = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  img_tuyau = loadImage('assets/img/tuyau.png')

  //Tuyaux[i] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);

  // création des tuyaux
  for (t = 0; t < nbrTuyauxTotal; t++) {
    Tuyaux[t] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  }

  // Tuyaux[0] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  // Tuyaux[1] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  // Tuyaux[2] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);

}

function draw() {

  background(240);

  //ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);

  for (i = 0; i < Tuyaux.length; i++) {
    Tuyaux[i].afficherTuyau();
  }

  if(Tuyaux[j].position_x_tuyau <= 0 - Tuyaux[j].largeur_tuyau) {
    if(j < nbrTuyauxTotal) {
      j++;
    }
  }

  Tuyaux[j].deplacerTuyau();

  

  // Tuyaux[0].afficherTuyau();
  // Tuyaux[0].deplacerTuyau();

  // if (Tuyaux[0].position_x_tuyau <= windowWidth - espaceEntreTuyaux) {
  //   Tuyaux[1].afficherTuyau();
  //   Tuyaux[1].deplacerTuyau();
  //   console.log("test");
  //   console.log(Tuyaux.length);

  //   if (Tuyaux[1].position_x_tuyau <= windowWidth - espaceEntreTuyaux) {
  //     Tuyaux[2].afficherTuyau();
  //     Tuyaux[2].deplacerTuyau();
  //     console.log("test");
  //     console.log(Tuyaux.length);
  //   }
  // }


  // for (j = 0; j < Tuyaux.length; j++) {
  //   Tuyaux[i].afficherTuyau();
  //   Tuyaux[i].deplacerTuyau();
  //   console.log(Tuyaux.length)
  // }

  // if (Tuyaux[i].position_x_tuyau <= windowWidth - 100) {
  //   Tuyaux[i + 1] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  // }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Tuyau {

  constructor(image_tuyau = loadImage('assets/img/tuyau.png'), position_x_tuyau = windowWidth, position_y_tuyau = random(windowHeight - 200, windowHeight - 300), largeur_tuyau = 244 / 4, hauteur_tuyau = 1499 / 4) {
    this.image_tuyau = image_tuyau;
    this.position_x_tuyau = position_x_tuyau;
    this.position_y_tuyau = position_y_tuyau;
    this.largeur_tuyau = largeur_tuyau;
    this.hauteur_tuyau = hauteur_tuyau;
  }

  afficherTuyau() {
    image(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  }

  deplacerTuyau() {
    if (this.position_x_tuyau >= 0 - this.largeur_tuyau) {
      this.position_x_tuyau = this.position_x_tuyau - 5;
      //console.log(this.position_x_tuyau);
    }
  }

}

// function genererTuyaux() {
//   var tuyaux = [];
//   var nbr_tuyaux = 5;
//   var decalage_tuyaux_x = 0;
//   let espacement_tuyaux_x = 200
//   var position_x_premier_tuyau = 300;
//   var ratio_taille_tuyaux = 4;
//   // ne pas changer les dimensions des images pour ne pas les déformer. Utiliser plutot le RATIO
//   let largeur_tuyau = 244;
//   let hauteur_tuyau = 1499;

//   for(i = 0; i <= nbr_tuyaux; i++) {
//     tuyaux[i] = new Tuyau(img_tuyau, position_x_premier_tuyau + decalage_tuyaux_x, random(400,600), largeur_tuyau / ratio_taille_tuyaux, hauteur_tuyau / ratio_taille_tuyaux);
//     decalage_tuyaux_x += espacement_tuyaux_x;
//     tuyaux[i].afficherTuyau();
//   }
//   noLoop();
// }