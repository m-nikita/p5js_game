var Tuyaux = [];
var nbrTuyauxTotal = 5;
var espaceEntreTuyaux = 200;
var compteurTuyauxAjoutes = 0;

let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  img_tuyau = loadImage('assets/img/tuyau.png')

  // création des tuyaux
  // for (t = 0; t < nbrTuyauxTotal; t++) {
  //   Tuyaux[t] = new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  // }

}

function draw() {

  background(240);

  //ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);

  if (Tuyaux.length < nbrTuyauxTotal) {
    if (millis() >= 1000 + timer) {
      Tuyaux.push(new Tuyau(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau));
      compteurTuyauxAjoutes += 1;
      timer = millis();
    }
  }

  if (Tuyaux[0] != undefined) {
    for (i = 0; i < Tuyaux.length; i++) {
      Tuyaux[i].afficherTuyau();
      Tuyaux[i].deplacerTuyau();
      if (Tuyaux[i].position_x_tuyau <= 0 - Tuyaux[i].largeur_tuyau) {
        Tuyaux.shift();
      }
    }
  }



  // if(Tuyaux[compteurTuyauxAjoutes].position_x_tuyau == 0 - Tuyaux[compteurTuyauxAjoutes].largeur_tuyau) {
  //   console.log("Le tuyaux "[compteurTuyauxAjoutes] + " ")
  //   Tuyaux[compteurTuyauxAjoutes].pop();
  // }





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