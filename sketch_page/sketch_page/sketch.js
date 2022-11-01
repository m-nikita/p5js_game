var TuyauxBas = [];
var TuyauxHaut = [];
var nbrPairesTuyauxTotal = 15;
var espaceHorizontalEntreTuyaux = 1250;
var espaceVerticalEntreTuyaux = 200;
var compteurPairesTuyauxAjoutes = 0;
var nbrPairesTuyauxMaxAtteint = false;
var vitesseDeplacementTuyaux = 5;
var gameIsPlaying = true;
let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Tuyaux skins
  img_tuyau_bas = loadImage('assets/img/tuyau_bas.png');
  img_tuyau_haut = loadImage('assets/img/tuyau_haut.png');

}

function draw() {

  if(gameIsPlaying == true) {
    //Game is Playing

    background(240);

    //Condition d'arrêt pour stopper la génération des tuyaux
    if(compteurPairesTuyauxAjoutes == nbrPairesTuyauxTotal) {
      nbrPairesTuyauxMaxAtteint = true;
    }

    if (TuyauxBas[0] != undefined) {
      for (i = 0; i < TuyauxBas.length; i++) {
        ///Condition de suppresion des tuyaux du bas lorsque ces derniers dépassent le côté gauche de l'écran
        if (TuyauxBas[i].position_x_tuyau <= 0 - TuyauxBas[i].largeur_tuyau) {
          TuyauxBas.shift();
          console.log("Suppresion d'un tuyau bas de l'écran")
          console.log("Nombre de tuyaux bas à l'écran : " + TuyauxBas.length)
        }
        //Condition d'affichage et de déplacement des tuyaux du bas
        if(TuyauxBas.length != 0) {
          TuyauxBas[i].afficherTuyau();
          TuyauxBas[i].deplacerTuyau();
        }
      }
    }

    if (TuyauxHaut[0] != undefined) {
      for (i = 0; i < TuyauxHaut.length; i++) {
        //Condition de suppresion des tuyaux du haut lorsque ces derniers dépassent le côté gauche de l'écran
        if (TuyauxHaut[i].position_x_tuyau <= 0 - TuyauxHaut[i].largeur_tuyau) {
          TuyauxHaut.shift();
          console.log("Suppresion d'un tuyau haut de l'écran")
          console.log("Nombre de tuyaux haut à l'écran : " + TuyauxHaut.length)
        }
        //Condition d'affichage et de déplacement des tuyaux du haut
        if(TuyauxHaut.length != 0) {
          TuyauxHaut[i].afficherTuyau();
          TuyauxHaut[i].deplacerTuyau();
        }
      }
    }

    //Conidition de génération des tuyaux
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

  } else {
    // Game is not playing
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
    this.etat = false;
  }

  getPositionX() {
    return this.position_x_tuyau;
  }

  getPositionY() {
    return this.position_y_tuyau;
  }

  getLargeurTuyau() {
    return this.largeur_tuyau;
  }

  getHauteurTuyau() {
    return this.hauteur_tuyau;
  }

  afficherTuyau() {
    image(this.image_tuyau, this.position_x_tuyau, this.position_y_tuyau, this.largeur_tuyau, this.hauteur_tuyau);
  }

  deplacerTuyau() {
    if (this.position_x_tuyau > this.position_x_tuyau - 1) {
      this.position_x_tuyau = this.position_x_tuyau - vitesseDeplacementTuyaux;
    }
  }

}