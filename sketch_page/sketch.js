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

let angle = 0;

let isInLoop = false;

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

// FOND

let backgroundImage;


// FONT

let font;

/* full screening will change the size of the canvas */
function windowResized() {
  gameWidth = windowWidth;
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

  // BACKGROUND
  backgroundImage = loadImage('assets/img/fond.png');

  // FONT

  font = loadFont('assets/font/Apple II Pro.otf');
}

function setup() {
  gameWidth = windowWidth;
  myCanvas = createCanvas(gameWidth, gameHeight);

  //LINK TO 'sketch-div' DIV
  myCanvas.parent('sketch-div');

  var ratio = plane.height / plane.width;
  planeWidth = 100;
  planeHeight = planeWidth * ratio;
  planeY = gameHeight / 2 - (planeHeight / 2);

  var ratio = planeCrash.height / planeCrash.width;
  planeCrashWidth = 100;
  planeCrashHeight = planeCrashWidth * ratio;
  planeCrashY = gameHeight / 2 - (planeCrashHeight / 2);

  // Buttons to play with a touch screen

  boutonsEcranTactile.push(createButton('◀︎'));
  boutonsEcranTactile.push(createButton('▲'));
  boutonsEcranTactile.push(createButton('▶︎'));
  boutonsEcranTactile.push(createButton('▼'));

  for(let i = 0; i < boutonsEcranTactile.length; i++) {
    boutonsEcranTactile[i].size(40,40);
    boutonsEcranTactile[i].mousePressed(function() { locked = true; direction = i + LEFT_ARROW; });
    boutonsEcranTactile[i].mouseReleased(function() { locked = false; });
  }

  nbObstacles = createSlider(10, 100, 20, 5);
  nbObstacles.size(120,20);
  nbObstacles.hide();

  //LINK TO 'sketch-div' DIV
  nbObstacles.parent('sketch-div');

  boutonJouer = createButton("JOUER");
  boutonJouer.mousePressed(function() {
    jouerMusiqueNiveau();
    gameIsStart = true;
    initialisation();
  });
  boutonJouer.size(100,20);
  boutonJouer.hide();

  //LINK TO 'sketch-div' DIV
  boutonJouer.parent('sketch-div');
  
  boutonAccueil = createButton("Accueil");
  boutonAccueil.mousePressed(function() { 
    boutonAccueil.hide();
    gameIsStart = false;
    jouerMusiqueMenu(); 
    initialisation();
  });
  boutonAccueil.size(100,20);
  boutonAccueil.hide();

  //LINK TO 'sketch-div' DIV
  boutonAccueil.parent('sketch-div');

  boutonRecommencer = createButton("Recommencer");
  boutonRecommencer.mousePressed(function() {
    boutonAccueil.hide();
    gameIsStart = true;
    jouerMusiqueNiveau();
    initialisation();
  });
  boutonRecommencer.size(100,20);
  boutonRecommencer.hide();

  //LINK TO 'sketch-div' DIV
  boutonRecommencer.parent('sketch-div');

  positionsBoutons();

  musiqueMenu.play();
  musiqueMenu.loop();
  musiqueMenu.setVolume(0.10);
  userStartAudio();
  angleMode(DEGREES);

  boutonJouer.style("font-family", 'font');
  //boutonJouer.style("margin", auto);
}

function positionsBoutons() {
  let heightText = document.getElementById("game-text").offsetHeight;

  // Repositionnement des boutons tactiles
  boutonsEcranTactile[0].position(gameWidth - 230, gameHeight + heightText - 80);
  boutonsEcranTactile[1].position(gameWidth - 180, gameHeight + heightText - 130);
  boutonsEcranTactile[2].position(gameWidth - 130, gameHeight + heightText - 80);
  boutonsEcranTactile[3].position(gameWidth - 180, gameHeight + heightText - 80);

  //LINK TO 'sketch-div' DIV
  boutonsEcranTactile[0].parent('sketch-div');
  boutonsEcranTactile[1].parent('sketch-div');
  boutonsEcranTactile[2].parent('sketch-div');
  boutonsEcranTactile[3].parent('sketch-div');

  // Slider choix du nombre d'obstacles
  nbObstacles.position(gameWidth / 2 + 110, gameHeight / 2 + heightText - 20);

  // Repositionnement des différents boutons
  boutonJouer.position(gameWidth / 2 - 40, gameHeight / 2 + heightText + 150);
  boutonAccueil.position(gameWidth / 2 - 170, gameHeight / 2 + heightText + 60);
  boutonRecommencer.position(gameWidth / 2 + 70, gameHeight / 2 + heightText + 60);
}

function draw() {
  background(backgroundImage);
  // Animation de fin (looping)
  if(isInLoop) {
    push();
    translate(planeX, planeY - 100);
    rotate(angle);
    imageMode(CORNER);
    image(plane, 0, 100, planeWidth, planeHeight);
    angle-=3;
    pop();
    if(angle == -360) {
      isInLoop = false;
    }
  } else {
    image(plane, planeX, planeY, planeWidth, planeHeight);
  }
  // image(planeCrash, planeCrashX, planeCrashY, planeCrashWidth, planeCrashHeight);
  if(!gameIsStart) {
    noStroke();
    strokeWeight(2);
    fill(0);
    rect(0, 0, gameWidth, gameHeight);
    fill(255);
    textSize(50);
    textFont(font);
    textAlign(CENTER);
    text("NOM DU JEU", gameWidth / 2, gameHeight / 4);
    textSize(20);
    text("Nombre de tuyaux : " + nbObstacles.value(), gameWidth / 2 - 80,gameHeight / 2);
    nbObstacles.show();
    textSize(26);
    text("Cliquez ci-dessous pour jouer :", gameWidth / 2,gameHeight / 2 + 40);
    boutonJouer.show();
    cacherBoutonsDirections();
  } else {
    afficherBoutonsDirections();
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
      // Endroit de l'écran où se produit l'animation de fin
      if(planeX > gameWidth  * 0.75 - 10 && planeX < gameWidth * 0.75 + 10 && angle == 0) {
        isInLoop = true;
      }
      if(planeX < gameWidth + planeWidth) {
        if(!isInLoop) {
          planeX += 9;
        }
      }
      fill(0);
      rect(gameWidth / 2 - 200, gameHeight / 2 - 100, 400, 200);
      fill(255);
      textSize(32);
      textAlign(CENTER);
      text("VICTORY", gameWidth / 2,gameHeight / 2- 25);
      textSize(22);
      text("Score : " + score, gameWidth / 2,gameHeight / 2 + 25);
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
      textAlign(CENTER);
      text("GAME OVER", gameWidth / 2,gameHeight / 2 - 25);
      textSize(22);
      text("Score : " + score, gameWidth / 2,gameHeight / 2 + 25);
      boutonAccueil.show();
      boutonRecommencer.show();
      jouerSonPartiePerdue();
    }
    countScore();
    fill(0,126);
    textSize(22);
    textAlign(LEFT);
    if(end != true){
      text("Score : " + score, 0 + 15, 30 + 5);
    }
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
  angle = 0;
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

function cacherBoutonsDirections() {
  boutonsEcranTactile[0].hide();
  boutonsEcranTactile[1].hide();
  boutonsEcranTactile[2].hide();
  boutonsEcranTactile[3].hide();
}

function afficherBoutonsDirections() {
  boutonsEcranTactile[0].show();
  boutonsEcranTactile[1].show();
  boutonsEcranTactile[2].show();
  boutonsEcranTactile[3].show();
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