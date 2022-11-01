//AVION

let plane;
var planeWidth;
var planeHeight;
let planeX = 0;
let planeY = 0;
let speedPlane = 4;
let score = 0;

let obstacles = [];
let nbObstacles;

let boutonsEcranTactile = [];

let locked = false;
let direction;

let end = false;

let gameHeight = 600;
let gameWidth;

let boutonJouer;
let boutonRecommencer;
let boutonAccueil;

let gameIsStart = false;

// OBSTACLES

let img_tuyau_bas;
let img_tuyau_haut;

var TuyauxBas = [];
var TuyauxHaut = [];
var nbrPairesTuyauxTotal = 15;
var espaceHorizontalEntreTuyaux = 1250;
var espaceVerticalEntreTuyaux = 100;
var compteurPairesTuyauxAjoutes = 0;
var nbrPairesTuyauxMaxAtteint = false;
var vitesseDeplacementTuyaux = 5;
let timer = 0;

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
  createCanvas(gameWidth, gameHeight);

  var ratio = plane.height / plane.width;
  planeWidth = 100;
  planeHeight = planeWidth * ratio;
  planeY = gameHeight / 2 - (planeHeight / 2);

  // let obstacle1 = new Map();
  // obstacle1.set("x", 200);
  // obstacle1.set("y", 0);
  // obstacle1.set("width", 100);
  // obstacle1.set("height", 150);
  // obstacle1.set("check", false);
  // obstacles[0] = obstacle1;

  // let obstacle2 = new Map();
  // obstacle2.set("x", 200);
  // obstacle2.set("y", 250);
  // obstacle2.set("width", 100);
  // obstacle2.set("height", 350);
  // obstacle2.set("check", false);
  // obstacles[1] = obstacle2;

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

  nbObstacles = createSlider(10, 100, 20, 5);
  nbObstacles.position(gameWidth / 2 + 60,gameHeight / 2 + 117);
  nbObstacles.hide();

  boutonJouer = createButton("Jouer");
  boutonJouer.position(gameWidth / 2 - 40, gameHeight / 2 + 200);
  boutonJouer.mousePressed(function() {
    gameIsStart = true;
    initialisation();
  });
  boutonJouer.size(100,20);
  boutonJouer.hide();

  boutonAccueil = createButton("Accueil");
  boutonAccueil.position(gameWidth / 2 - 170, gameHeight / 2 + 200);
  boutonAccueil.mousePressed(function() { 
    boutonAccueil.hide();
    gameIsStart = false; 
    initialisation();
  });
  boutonAccueil.size(100,20);
  boutonAccueil.hide();

  boutonRecommencer = createButton("Recommencer");
  boutonRecommencer.position(gameWidth / 2 + 90, gameHeight / 2 + 200);
  boutonRecommencer.mousePressed(function() {
    boutonAccueil.hide();
    gameIsStart = true;
    initialisation();
  });
  boutonRecommencer.size(100,20);
  boutonRecommencer.hide();
}

function preload() {
  plane = loadImage("assets/img/avion.png");

  //Tuyaux skins
  img_tuyau_bas = loadImage('assets/img/tuyau_bas.png');
  img_tuyau_haut = loadImage('assets/img/tuyau_haut.png');
}

function draw() {
  background(200);
  if(!gameIsStart) {
    stroke(0);
    strokeWeight(2);
    fill(29,184,0);
    rect(gameWidth / 2 - 200, gameHeight / 2 - 100, 400, 200);
    fill(255);
    textSize(32);
    text("Bienvenue !", gameWidth / 2 - 80,gameHeight / 2 - 60);
    textSize(20);
    text("Nombres de tuyaux : " + nbObstacles.value(), gameWidth / 2 - 175,gameHeight / 2);
    nbObstacles.show();
    textSize(26);
    text("Cliquez ci-dessous pour jouer :", gameWidth / 2 - 175,gameHeight / 2 + 40);
    boutonJouer.show();
  } else {
    noStroke();
    // fill(255,0,0);
    // rect(obstacles[0].get("x"), obstacles[0].get("y"), obstacles[0].get("width"), obstacles[0].get("height"));
    // rect(obstacles[1].get("x"), obstacles[1].get("y"), obstacles[1].get("width"), obstacles[1].get("height"));
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
      boutonAccueil.show();
      boutonRecommencer.show();
    }
    countScore();
    fill(0);
    textSize(32);
    text("Score : " + score, windowWidth - 180, 30);

    //Condition d'arrêt pour stopper la génération des tuyaux si nombre de paires de tuyaux max est atteint
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

    //Condition de génération des tuyaux
    if (nbrPairesTuyauxMaxAtteint == false && end != true) {
      if (millis() >= espaceHorizontalEntreTuyaux + timer) {
        valeurAleatoire = random(-(gameHeight/3.75),(gameHeight/3.75))
        TuyauxBas.push(new Tuyau(img_tuyau_bas, this.position_x_tuyau, ((gameHeight/2) + espaceVerticalEntreTuyaux)+valeurAleatoire, this.largeur_tuyau, this.hauteur_tuyau));
        TuyauxHaut.push(new Tuyau(img_tuyau_haut, this.position_x_tuyau, (-(gameHeight/2) - espaceVerticalEntreTuyaux)+valeurAleatoire, this.largeur_tuyau, this.hauteur_tuyau));
        compteurPairesTuyauxAjoutes++;
        console.log("Ajout d'une paire de tuyaux à l'écran")
        console.log("Nombre de paires de tuyaux à l'écran : " + TuyauxBas.length)
        console.log("Nombre de paires de tuyaux ajoutés depuis le début : " + compteurPairesTuyauxAjoutes + "/" + nbrPairesTuyauxTotal);
        timer = millis();
      }
    }


  }
  image(plane, planeX, planeY, planeWidth, planeHeight);
}

function detectCollision() {
  var collision = false;
  var index = 0;
  while(!collision && index < nbrPairesTuyauxTotal) {
    if (TuyauxBas[index] != undefined && planeX < TuyauxBas[index].getPositionX() + TuyauxBas[index].getLargeurTuyau() &&
      planeX + planeWidth > TuyauxBas[index].getPositionX() &&
      planeY < TuyauxBas[index].getPositionY() + TuyauxBas[index].getHauteurTuyau() &&
      planeHeight + planeY > TuyauxBas[index].getPositionY()) {
        collision = true;
        vitesseDeplacementTuyaux = 0;
    }
    if (TuyauxHaut[index] != undefined && planeX < TuyauxHaut[index].getPositionX() + TuyauxHaut[index].getLargeurTuyau() &&
      planeX + planeWidth > TuyauxHaut[index].getPositionX() &&
      planeY < TuyauxHaut[index].getPositionY() + TuyauxHaut[index].getHauteurTuyau() &&
      planeHeight + planeY > TuyauxHaut[index].getPositionY()) {
        collision = true;
        vitesseDeplacementTuyaux = 0;
    }
    index++;
  }
  return collision;
}

function countScore() {
  for(var i = 0; i < nbrPairesTuyauxTotal; i += 1) {
    if (TuyauxBas[i] != undefined && planeX > TuyauxBas[i].getPositionX() + TuyauxBas[i].getLargeurTuyau()) {
      if(!TuyauxBas[i].getEtatTuyau()) {
        TuyauxBas[i].setEtatTuyau(true);
        score += 2;
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
  //console.clear();
  planeX = 0;
  planeY = gameHeight / 2 - (planeHeight / 2);
  score = 0;
  end = false;
  nbObstacles.hide();
  boutonJouer.hide();
  boutonRecommencer.hide();
  TuyauxBas = [];
  TuyauxHaut = [];
  vitesseDeplacementTuyaux = 5;
  compteurPairesTuyauxAjoutes = 0;
  timer = 0;
  nbrPairesTuyauxMaxAtteint = false;
}

class Tuyau {

  constructor(image_tuyau, position_x_tuyau = gameWidth, position_y_tuyau, largeur_tuyau = 244 / 2.5, hauteur_tuyau = 1499 / 2.5) {
    this.image_tuyau = image_tuyau;
    this.position_x_tuyau = position_x_tuyau;
    this.position_y_tuyau = position_y_tuyau;
    this.largeur_tuyau = largeur_tuyau;
    this.hauteur_tuyau = hauteur_tuyau;
    this.etatTuyau = false;
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

  getEtatTuyau() {
    return this.etatTuyau;
  }

  setEtatTuyau(etatTuyau) {
    if (typeof etatTuyau === 'boolean'){
      this.etatTuyau = etatTuyau;
      return this.etatTuyau;
    }
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