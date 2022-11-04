// AVION

let planeHidden;

let plane;
var planeWidth;
var planeHeight;
let planeX = (-planeWidth);
let planeY = 0;
let speedPlane = 10;
let score = 0;

let planeCrash;
var planeCrashWidth;
var planeCrashHeight;
let planeCrashX = 0;
let planeCrashY = 0;

//let obstacles = [];
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

let scoreMultiplicateur = 2;

// OBSTACLES

let img_tuyau_bas;
let img_tuyau_haut;

var TuyauxBas = [];
var TuyauxHaut = [];
var espaceHorizontalEntreTuyaux = 950;
var espaceVerticalEntreTuyaux = 100;
var compteurPairesTuyauxAjoutes = 0;
var nbrPairesTuyauxMaxAtteint = false;
var vitesseDeplacementTuyaux = 7;
let timer = 0;

// SONS

let musiqueNiveau;
let musiqueMenu;
let sonExplosion;
let sonExplosionAEteJoue = false;
let sonCheckpointPasse;
let sonCheckpointPasseCompteur = 0;
let sonPartiePerdue;
let sonPartiePerdueAEteJoue = false;
let sonPartieGagnee;
let sonPartieGagneeAEteJoue = false;


/* full screening will change the size of the canvas */
function windowResized() {
  gameWidth = windowWidth - 10;
  resizeCanvas(gameWidth, gameHeight);

  positionsBoutons();
}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the
page. */
document.ontouchmove = function(event) {
    event.preventDefault();
};

// PRELOAD must be before SETUP
function preload() {
  plane = loadImage("assets/gif/helicopter.gif");
  planeCrash = loadImage("assets/gif/helicopter_crash.gif");
  planeHidden = loadImage("assets/img/no_helicopter.png");
  planeCrash.pause();

  //Tuyaux skins
  img_tuyau_bas = loadImage('assets/img/tuyau_bas.png');
  img_tuyau_haut = loadImage('assets/img/tuyau_haut.png');

  // SOUND
  soundFormats("mp3");
  musiqueNiveau = loadSound('assets/sound/musiqueNiveau.mp3');
  musiqueMenu = loadSound('assets/sound/musiqueMenu.mp3');
  sonExplosion = loadSound('assets/sound/sonExplosion.wav');
  sonCheckpointPasse = loadSound('assets/sound/sonCheckpointPasse.mp3');
  sonPartiePerdue = loadSound('assets/sound/sonPartiePerdue.mp3');
  sonPartieGagnee = loadSound('assets/sound/sonPartieGagnee.mp3');
}

function setup() {
  gameWidth = windowWidth - 10;
  var myCanvas = createCanvas(gameWidth, gameHeight);
  myCanvas.parent('sketch-div');

  var ratio = plane.height / plane.width;
  planeWidth = 100;
  planeHeight = planeWidth * ratio;
  planeY = gameHeight / 2 - (planeHeight / 2);

  var ratio = planeCrash.height / planeCrash.width;
  planeCrashWidth = 100;
  planeCrashHeight = planeCrashWidth * ratio;
  planeCrashY = gameHeight / 2 - (planeCrashHeight / 2);

  boutonsEcranTactile.push(createButton('◀︎'));
  boutonsEcranTactile.push(createButton('▲'));
  boutonsEcranTactile.push(createButton('▶︎'));
  boutonsEcranTactile.push(createButton('▼'));

  for(let i = 0; i < boutonsEcranTactile.length; i++) {
    boutonsEcranTactile[i].parent('sketch-div');
    boutonsEcranTactile[i].size(40,40);
    boutonsEcranTactile[i].mousePressed(function() { locked = true; direction = i + LEFT_ARROW; });
    boutonsEcranTactile[i].mouseReleased(function() { locked = false; });
  }

  nbObstacles = createSlider(10, 100, 1, 5);
  nbObstacles.parent('sketch-div');
  nbObstacles.size(120,20);
  nbObstacles.hide();

  boutonJouer = createButton("Jouer");
  boutonJouer.mousePressed(function() {
    jouerMusiqueNiveau();
    gameIsStart = true;
    initialisation();
  });
  boutonJouer.size(100,20);
  boutonJouer.hide();

  boutonAccueil = createButton("Accueil");
  boutonAccueil.mousePressed(function() { 
    boutonAccueil.hide();
    gameIsStart = false;
    jouerMusiqueMenu(); 
    initialisation();
  });
  boutonAccueil.size(100,20);
  boutonAccueil.hide();

  boutonRecommencer = createButton("Recommencer");
  boutonRecommencer.mousePressed(function() {
    boutonAccueil.hide();
    gameIsStart = true;
    jouerMusiqueNiveau();
    initialisation();
  });
  boutonRecommencer.size(100,20);
  boutonRecommencer.hide();

  positionsBoutons();

  musiqueMenu.play();
  musiqueMenu.loop();
  musiqueMenu.setVolume(0.10);
  userStartAudio();
}

function positionsBoutons() {
  // Repositionnement des boutons tactiles
  boutonsEcranTactile[0].position(gameWidth - 140, gameHeight + 80);
  boutonsEcranTactile[1].position(gameWidth - 90, gameHeight + 30);
  boutonsEcranTactile[2].position(gameWidth - 40, gameHeight + 80);
  boutonsEcranTactile[3].position(gameWidth - 90, gameHeight + 80);

  // Slider choix du nombre d'obstacles
  nbObstacles.position(gameWidth / 2 + 60,gameHeight / 2 + 110);

  // Repositionnement des différents boutons
  boutonJouer.position(gameWidth / 2 - 40, gameHeight / 2 + 200);
  boutonAccueil.position(gameWidth / 2 - 170, gameHeight / 2 + 200);
  boutonRecommencer.position(gameWidth / 2 + 90, gameHeight / 2 + 200);
}

function draw() {
  background(250);
  afficherAvion = image(plane, planeX, planeY, planeWidth, planeHeight);
  // image(planeCrash, planeCrashX, planeCrashY, planeCrashWidth, planeCrashHeight);
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
    // Animation d'apparition de l'avion au début de la partie
    if(planeX < 0) {
      planeX += 2;
    }
    // Condition d'arrêt pour stopper la génération des tuyaux si nombre de paires de tuyaux max est atteint
    if(compteurPairesTuyauxAjoutes == nbObstacles.value()) {
      nbrPairesTuyauxMaxAtteint = true;
    }

    if (TuyauxBas[0] != undefined) {
      for (i = 0; i < TuyauxBas.length; i++) {
        // Condition de suppresion des tuyaux du bas lorsque ces derniers dépassent le côté gauche de l'écran
        if (TuyauxBas[i].position_x_tuyau <= 0 - TuyauxBas[i].largeur_tuyau) {
          TuyauxBas.shift();
          console.log("Suppresion d'un tuyau bas de l'écran")
          console.log("Nombre de tuyaux bas à l'écran : " + TuyauxBas.length)
        }
        // Condition d'affichage et de déplacement des tuyaux du bas
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
        console.log("Nombre de paires de tuyaux ajoutés depuis le début : " + compteurPairesTuyauxAjoutes + "/" + nbObstacles.value());
        timer = millis();
      }
    }

    noStroke();

    // Blocage de la direction en cas d'appui sur un bouton sur l'écran
    if(locked) {
      move(direction);
    }

    // Condition de victoire
    if((score/scoreMultiplicateur) == nbObstacles.value()) {
      musiqueNiveau.stop();
      jouerSonPartieGagnee();
      if(planeX < gameWidth + planeWidth) {
        planeX += 9;
      }
      fill(0);
      rect(gameWidth / 2 - 200, gameHeight / 2 - 100, 400, 200);
      fill(255);
      textSize(32);
      text("Gagné ! Score final : " + score, gameWidth / 2 - 165,gameHeight / 2 + 8);
      boutonAccueil.show();
      boutonRecommencer.show();
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

      musiqueNiveau.stop();
      jouerSonExplosion();
      plane = planeHidden;
      planeCrash.play();

      if (planeCrash.gifProperties.displayIndex % planeCrash.numFrames() >= 39) {
        planeCrash.pause();
      }

      planeCrashX = planeX;
      planeCrashY = planeY;
      image(planeCrash, planeCrashX, planeCrashY, planeCrashWidth, planeCrashHeight);
      end = true;
      
      fill(0);
      rect(gameWidth / 2 - 200, gameHeight / 2 - 100, 400, 200);
      fill(255);
      textSize(32);
      text("Perdu ! Score final : " + score, gameWidth / 2 - 150,gameHeight / 2 + 8);
      boutonAccueil.show();
      boutonRecommencer.show();
      jouerSonPartiePerdue();
    }
    countScore();
    fill(0);
    textSize(32);
    text("Score : " + score, windowWidth - 180, 30);
  }
  
}

function detectCollision() {
  var collision = false;
  var index = 0;
  while(!collision && index < nbObstacles.value()) {
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
  for(var i = 0; i < nbObstacles.value(); i += 1) {
    if (TuyauxBas[i] != undefined && planeX > TuyauxBas[i].getPositionX() + TuyauxBas[i].getLargeurTuyau()) {
      if(!TuyauxBas[i].getEtatTuyau()) {
        jouerSonCheckpointPasse();
        
        //Difficulté croissante
        if(vitesseDeplacementTuyaux < 20) {
          vitesseDeplacementTuyaux += 0.2;
        }
        if(speedPlane > 5) {
          speedPlane -= 0.03;
        }
        espaceHorizontalEntreTuyaux -= 0.5;
        espaceVerticalEntreTuyaux -= 0.5

        TuyauxBas[i].setEtatTuyau(true);
        score += scoreMultiplicateur;
      }
    }
  }
  if((score/scoreMultiplicateur) == nbObstacles.value()) {
    end = true;
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
  console.clear();
  plane = loadImage("assets/gif/helicopter.gif");
  planeCrash = loadImage("assets/gif/helicopter_crash.gif");
  planeHidden = loadImage("assets/img/no_helicopter.png");
  planeCrash.pause();
  planeX = (-planeWidth);
  planeY = gameHeight / 2 - (planeHeight / 2);
  speedPlane = 10;
  score = 0;
  end = false;
  nbObstacles.hide();
  boutonJouer.hide();
  boutonRecommencer.hide();
  TuyauxBas = [];
  TuyauxHaut = [];
  vitesseDeplacementTuyaux = 7;
  espaceHorizontalEntreTuyaux = 950;
  espaceVerticalEntreTuyaux = 100;
  compteurPairesTuyauxAjoutes = 0;
  timer = 0;
  nbrPairesTuyauxMaxAtteint = false;
  sonExplosionAEteJoue = false;
  sonPartiePerdueAEteJoue = false;
  sonPartieGagneeAEteJoue = false;
  sonCheckpointPasseCompteur = 0;
  eteindreLesSons();
}

function jouerMusiqueNiveau() {
  if(musiqueMenu.isPlaying()) {
    musiqueMenu.stop();
  }
  musiqueNiveau.play();
  musiqueNiveau.setVolume(0.10);
}

function jouerMusiqueMenu() {
  if(musiqueNiveau.isPlaying()) {
    musiqueNiveau.stop();
  }
  musiqueMenu.play();
  musiqueMenu.setVolume(0.10);
}

function jouerSonExplosion() {
  if(sonExplosionAEteJoue == false) {
    sonExplosion.play();
    sonExplosion.setVolume(0.10);
    sonExplosionAEteJoue = true; 
  }
}

function jouerSonCheckpointPasse() {
  if(sonCheckpointPasseCompteur == score) {
    sonCheckpointPasse.play();
    sonCheckpointPasse.setVolume(0.15);
    sonCheckpointPasseCompteur += scoreMultiplicateur; 
  }
}

function jouerSonPartiePerdue() {
  if(sonPartiePerdueAEteJoue == false) {
    sonPartiePerdue.play();
    sonPartiePerdue.setVolume(0.2);
    sonPartiePerdueAEteJoue = true; 
  }
}

function jouerSonPartieGagnee() {
  if(sonPartieGagneeAEteJoue == false) {
    sonPartieGagnee.play();
    sonPartieGagnee.setVolume(0.05);
    sonPartieGagneeAEteJoue = true; 
  }
}

function eteindreLesSons() {
  if(sonPartieGagnee.isPlaying) {
    sonPartieGagnee.stop();
  }
  if(sonPartiePerdue.isPlaying) {
    sonPartiePerdue.stop();
  }
  if(sonExplosion.isPlaying) {
    sonExplosion.stop();
  }
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