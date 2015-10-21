// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

	
(function(){
"use strict";
    /** Contenu du script **/

$(document).ready(function() {
  init();
});
 
this.init = function() {
  prepareStage(); // initialiser le stage
  addRoundRects(); // dessiner les rectangles
  addCircles(); // dessiner les cercles
};
 
// Préparer le stage et instancier EaselJsUtils
this.prepareStage = function() {
  this.canvas = $('#map').get(0);
  this.stage = new createjs.Stage(this.canvas);
  easelJsUtils = new EaselJsUtils(this.stage);
};

// Ajouter les formes "rectangles coins arrondis"
this.addRoundRects = function() {
    easelJsUtils.createRoundRect(750, 100, 100, 400, [65, 136, 178], {opacity: 0.2});
    easelJsUtils.createRoundRect(-20, 210, 100, 290, [106, 10, 171], {opacity: 0.1, radius: 30});
};
     
// Ajouter les formes "cercles"
this.addCircles = function() {
    easelJsUtils.createCircle(750, 550, 180, [65, 136, 178], {opacity: 0.4});
    easelJsUtils.createCircle(550, 550, 100, [106, 10, 171], {opacity: 0.2});
    easelJsUtils.createCircle(50, 500, 200, [65, 136, 178], {opacity: 0.5});
};

})();











/*
$( document ).ready(function() {
  window.onload = init();

});
*/
/*
$(function(){
  var canvas = $('#map')[0];
  var stage;
  var circle;
 
this.init = function()
{

  stage = new createjs.Stage(canvas);
  circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(canvas.width/2, canvas.height/2, 20);

  stage.addChild(circle);
  stage.update();

  createjs.Ticker.setFPS(24);
  createjs.Ticker.addEventListener("tick", handleTick);
}

this.handleTick = function() {
//function tick() {

  //L'objet Ticker() tente d'appeller cette méthode 24 fois par secondes;
  circle.x += 4;
  circle.rotation +=6;
  if ( circle.x >900)  circle.x =-100;
  stage.tick();

/*
  // On teste si le personnage n’arrive pas en bout d’écran à droite avant qu’il ne disparaisse à jamais!
  if (bmpAnimation.x >= screen_width - 16) {
    // Nous avons atteint le côté droit de notre écran
    // Nous devons maintenant marcher vers la gauche pour retourner à la positon initiale
    bmpAnimation.direction = -90;
  }
  if (bmpAnimation.x < 16) {
    // Nous avons atteint le côté gauche de notre écran
    // Nous devons maintenant marcher vers la droite
    bmpAnimation.direction = 90;
  }

  // On bouge le sprite en fonction de la dirength;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct(aection et de la vitesse demandée
  if (bmpAnimation.direction == 90) {
    bmpAnimation.x += bmpAnimation.vX;
  }
  else {
    bmpAnimation.x -= bmpAnimation.vX;
  }
  // mise à jour de la scène de jeu
  stage.update();


}


window.onload= init();
});
*/
