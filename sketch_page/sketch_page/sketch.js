var TuyauxBas = [];
var TuyauxHaut = [];
var nbrPairesTuyauxTotal = 15;
var espaceHorizontalEntreTuyaux = 1250;
var espaceVerticalEntreTuyaux = 200;
var compteurPairesTuyauxAjoutes = 0;
var nbrPairesTuyauxMaxAtteint = false;
let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  img_tuyau_bas = loadImage('assets/img/tuyau_bas.png');
  img_tuyau_haut = loadImage('assets/img/tuyau_haut.png');

}

function draw() {

  background(240);

  if(compteurPairesTuyauxAjoutes == nbrPairesTuyauxTotal) {
    nbrPairesTuyauxMaxAtteint = true;
  }

  if (TuyauxBas[0] != undefined) {
    for (i = 0; i < TuyauxBas.length; i++) {
      TuyauxBas[i].afficherTuyau();
      TuyauxBas[i].deplacerTuyau();
      if (TuyauxBas[i].position_x_tuyau <= 0 - TuyauxBas[i].largeur_tuyau) {
        TuyauxBas.shift();
        console.log("Suppresion d'un tuyau bas de l'écran")
        console.log("Nombre de tuyaux bas à l'écran : " + TuyauxBas.length)
      }
    }
  }

  if (TuyauxHaut[0] != undefined) {
    for (i = 0; i < TuyauxHaut.length; i++) {
      TuyauxHaut[i].afficherTuyau();
      TuyauxHaut[i].deplacerTuyau();
      if (TuyauxHaut[i].position_x_tuyau <= 0 - TuyauxHaut[i].largeur_tuyau) {
        TuyauxHaut.shift();
        console.log("Suppresion d'un tuyau haut de l'écran")
        console.log("Nombre de tuyaux haut à l'écran : " + TuyauxHaut.length)
      }
    }
  }

  if (nbrPairesTuyauxMaxAtteint == false) {
    if (millis() >= espaceHorizontalEntreTuyaux + timer) {
      valeurAleatoire = random(-200,200)
      TuyauxBas.push(new Tuyau(img_tuyau_bas, this.position_x_tuyau, (windowHeight - windowHeight/2)+valeurAleatoire+espaceVerticalEntreTuyaux, this.largeur_tuyau, this.hauteur_tuyau));
      TuyauxHaut.push(new Tuyau(img_tuyau_haut, this.position_x_tuyau, 0 + valeurAleatoire - espaceVerticalEntreTuyaux, this.largeur_tuyau, this.hauteur_tuyau));
      compteurPairesTuyauxAjoutes++;
      console.log("Ajout d'une paire de tuyaux à l'écran")
      console.log("Nombre de paires de tuyaux à l'écran : " + TuyauxBas.length)
      console.log("Nombre de paires de tuyaux ajoutés depuis le début : " + compteurPairesTuyauxAjoutes + "/" + nbrPairesTuyauxTotal);
      timer = millis();
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Tuyau {

  constructor(image_tuyau, position_x_tuyau = windowWidth, position_y_tuyau, largeur_tuyau = 244 / 2.5, hauteur_tuyau = 1499 / 2.5) {
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
    }
  }

}