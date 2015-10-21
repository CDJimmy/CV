// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready(function() {



/*
  nbLemmings=1;
  startLemmings();
  createMapPosition();
  mapCurrentY = parseInt($('#lem1').css('top'));
  createLemming();
  moveLemmings();
  window.onresize = function(event) {
    replaceLemmings();
  };
*/

});

//create position with limit position
function createMapPosition()
{
  mapPosition = [
    {sx: "15.37", sy: "28.23"},{sx: "15.49", sy: "43.30"},{sx: "17.81", sy: "44.80"},{sx: "21.89", sy: "45.63"},
    {sx: "27.26", sy: "47.39"},{sx: "28", sy: "47.60"},{sx: "29.4", sy: "48.42"},{sx: "30", sy: "49.68"},
    {sx: "30.75", sy: "50.94"},{sx: "31.62", sy: "51.45"},{sx: "36.13", sy: "78.30"},{sx: "27.73", sy: "81.17"},
    {sx: "26.47", sy: "82.18"},{sx: "22.68", sy: "82.68"},{sx: "22.18", sy: "82.18"},{sx: "20.58", sy: "81.17"},
    {sx: "17.64", sy: "80.16"},{sx: "19", sy: "78.40"}
  ];
}

//move all lemmings with direction
function moveLemmings()
{
  var lemmings = $('.lemmings'),
    len = lemmings.length;
  //for all lemmings
  for (i = 0; i < len; i++)
  {
    // get lemmings actual position
    var lem = $(lemmings[i]),
     positionX = parseInt($(lem).css('left'), 10);
     positionY = parseInt($(lem).css('top'), 10);
    //if lemings out of map : delete
    if(positionX> mapCurrentX+mapCurrentWidth*0.4 || positionX< mapCurrentX+mapCurrentWidth*0.1 || positionY> mapCurrentY+0.83*mapResize*600 || positionY< mapCurrentY+0.25*mapResize*600)
    {
      lem.remove();
    }
    //if lemmings go at right
    if(lem.data('id') == "right")
    {
    //for all limit position, remove leemings in other direction
      if(lem.data('etape') == '1'){moveLemming(lem, positionX, mapPosition[3].sx, 'right', (mapPosition[2].sy-mapPosition[1].sy), 'left', 'right', positionX, '2', 'top');}
      else if(lem.data('etape') == '2')
      {moveLemming(lem, positionX, mapPosition[4].sx, 'right', (mapPosition[4].sy-mapPosition[3].sy), 'left', 'right', positionX, '3', 'top');}
      else if(lem.data('etape') == '3')
      {moveLemming(lem, positionX, mapPosition[5].sx, 'right', (mapPosition[4].sy-mapPosition[3].sy), 'left', 'right', positionX, '4', 'top');}
      else if(lem.data('etape') == '4')
      {moveLemming(lem, positionX, mapPosition[6].sx, 'right', (mapPosition[6].sy-mapPosition[5].sy), 'left', 'right', positionX, '5', 'top');}
      else if(lem.data('etape') == '5')
      {moveLemming(lem, positionX, mapPosition[8].sx, 'right', (mapPosition[8].sy-mapPosition[7].sy), 'left', 'right', positionX, '6', 'top');}
      else if(lem.data('etape') == '6')
      {moveLemming(lem, positionX, mapPosition[9].sx, 'right', 10, 'left', 'fall', positionX, '6', 'top');}
      else if(lem.data('etape') == '7')
      {moveLemming(lem, positionX, mapPosition[10].sx, 'right', 0, 'left', 'stop', positionX, '7', 'none');}
      else if(lem.data('etape') == '8')
      {moveLemming(lem, positionX,( mapPosition[10].sx-0.8), 'right', 0, 'left', 'left', positionX, '9', 'none');}
    //and move in same direction
      if(positionX <= limitRight)
      {
        $('.lemmings.right').animate({left: '+=10' + "px"},350);
      }
      else
      {
        lem.finish();
        lem.css('left', positionX+'px');
        lem.data('id' , 'left');
        lem.attr('class', 'lemmings left');
      }
    }
    //if lemmings go at left
    else if(lem.data('id') == "left")
    {
    //for all limit position, remove leemings in other direction
      if(lem.data('etape') == '9')
      {moveLemming(lem, positionX, mapPosition[11].sx, 'left', (mapPosition[12].sy - mapPosition[11].sy ), 'left', 'left', positionX, '10', 'top');}
      else if(lem.data('etape') == '10')
      {moveLemming(lem, positionX, mapPosition[14].sx, 'left', (mapPosition[15].sy - mapPosition[13].sy ), 'left', 'left', positionX, '11', 'top');}
      else if(lem.data('etape') == '11')
      {moveLemming(lem, positionX, mapPosition[15].sx, 'left', (mapPosition[14].sy - mapPosition[13].sy ), 'left', 'left', positionX, '12', 'top');}
      //for last position stop lemming, turn it and remove it
      else if(lem.data('etape') == '12')
      {
        if(positionX <= (mapPosition[17].sx * mapCurrentWidth)/100+mapCurrentX)
        {
          var topo = (mapPosition[14].sy - mapPosition[13].sy )* mapResize * 600/100;
          lem.finish();
          lem.css('left', positionX+'px');
          lem.attr('class', 'finish');
          lem.css({
            'position' : 'absolute',
            'width' : '100px',
            'height' : '100px',
            'background' : 'url(/assets/lemmings_finish.png)',
            'transform-origin' : '0 0',
            '-webkit-transform' : 'scale(0.2)',
            '-moz-transform'    : 'scale(0.2)',
            '-ms-transform'     : 'scale(0.2)',
            '-o-transform'      : 'scale(0.2)',
            'transform'         : 'scale(0.2)' 
         });
          $('.finish').animate({top: '-=5' + "px"},450);
         setTimeout(function(){
           $('.finish').remove();
         }, 1000);
        }
      }
      if(positionX >= limitLeft)
      {
         $('.lemmings.left').animate({left: '-=10' + "px"},350);
      }
      else
      {
        lem.finish();
        lem.css('left', positionX+'px');
        lem.data('id' , 'right');
        lem.attr('class', 'lemmings right');
      }
    }
    //if lemmings falling
    else if(lem.data('id') == "fall")
    {
      if(lem.data('etape') == '0')
      {moveLemming(lem, positionY, mapPosition[1].sy, 'fall', 0, 'top', 'right', positionY, '1', 'none');}
      else if(lem.data('etape') == '6')
      {moveLemming(lem, positionY, mapPosition[10].sy, 'fall', 0, 'top', 'right', positionY, '8', 'none');}

    }
  }
  setTimeout(function(){
    moveLemmings();
  }, 300);
}

//move one lemmoins with argument:::
 //lem : one lemming
 //elem1 : position X of lemming
 //elem2 : limit position X lemming can go --OR-- limit position Y if lemming fall
 //sens : direction lemming go : none/left/right/fall
 //subElem1 : number of pixel moving
 //replace : direction for replace lemming
 //nextSens : new direction lemming go
 //position : position X for replace lemming
 //etape : number of etape
 //move : margin needing to move : top/none
function moveLemming(lem, elem1, elem2, sens, subElem1, replace, nextSens, position, etape, move)
{
  //if lemming fall, update elem2 with proportion of actual map
  elem2 = ((sens == "fall") ? (elem2*mapResize*600/100+mapCurrentY) : ((sens == "none") ? 0 : (elem2*mapCurrentWidth/100+mapCurrentX)));
  //if direction is left, change position X lemming and limit position X for next test
  if(sens == "left")
  {
    var el = elem1;
    elem1 = elem2;
    elem2 = el;
  }
  //if lemming is after limit, upadate it
  if(elem1 >= elem2)
  {
    //number of pixel to move with good proportion
    var topo = ((subElem1 == 10 ) ? 10 : ((subElem1 == 0) ? 0 : (subElem1)* mapResize * 600/100));
    var obj = {};
    //use move value for update top/none property of object
    obj[move] = '+=' + topo + 'px';
    //stop actual animation and replace lemming at same place
    lem.finish();
    lem.css(replace, position+'px');
    //stop first lemings for 'block' position
    if(etape == '8' && lem.attr('id') == "lem3") {etape = '7';}
    lem.data('etape', etape);
    lem.data('id', nextSens);
    lem.attr('class', 'lemmings ' + nextSens);
    if(move != 'none'){lem.animate(obj,350);}
  }
  //if lemming falling, just move it
  else if (elem1 < elem2 && sens == "fall")
  {
    $('.lemmings.fall').animate({top: '+=5' + "px"},300);
  }
}

//replace lemmings with actual widows width
function replaceLemmings()
{
  var nScreenSize = parseInt($('body').css('width'), 10)-50,
    nReferentSize = parseInt($('#map').css('width'), 10),
    nLimitLeft = (nScreenSize - nReferentSize) /2,
    nLimitRight = nLimitLeft + nReferentSize - lemSize,
    lemmings = $('.lemmings'),
    len = lemmings.length;
  for (i = 0; i < len; i++)
  {
    var lem = $(lemmings[i]),
     position = parseInt($(lem).css('left'), 10),
     positionRelatif = (position - limitLeft) / (mapCurrentWidth - lemSize / 100),
     nPosition = (positionRelatif * (nReferentSize - lemSize / 100)) + nLimitLeft;
   lem.finish();
   lem.css('left', nPosition);
  }
  screenSize = nScreenSize;
  lemSize = parseInt($(lemmings[0]).css('width'), 10) * 0.5;
  mapCurrentWidth = nReferentSize;
  limitLeft = nLimitLeft;
  limitRight = nLimitRight;
}

//create new div limming at trap position every 8s
function createLemming()
{
  var lemX,
   lemY,
   lem = document.createElement("div");
  nbLemmings +=1;
  lem.id = "lem" + (nbLemmings+1);
  lem.className = "lemmings fall";
  $(lem).data('id', 'fall');
  trap = $('#trap');
  map.append(lem);
  lemX = trapCurrentX+(parseInt(trap.css('width'))/2) - (parseInt($(lem).css('width'))/2 * 0.2);
  lemY = trapCurrentY+(parseInt(trap.css('height'))/2) - (parseInt($(lem).css('height'))/2 * 0.2);
  $(lem).css({
    'left': lemX,
    'top' : lemY
  });
  $(lem).data('etape', '0');
  setTimeout(function(){
    createLemming();
  }, 8000);
}

//begin lemmings animation
function startLemmings()
{ 
  var trap,
   mapOriginWidth = 1800,
   mapOriginHeight = 600;
  //add background 
  map = $('#map');
  screenSize = parseInt($('body').css('width'), 10);
  lemSize = parseInt($($('.lemmings')[0]).css('width'), 10) * 0.5;
  mapCurrentWidth = parseInt(map.css('width'), 10);
  mapCurrentHeight = parseInt(mapCurrentWidth/3, 10);
  mapCurrentX = (screenSize - mapCurrentWidth) /2 ;
  mapResize = Math.round((100 / mapOriginWidth * mapCurrentWidth) * 100) /100 / 100;
  limitLeft = (screenSize - mapCurrentWidth) /2 ;
  limitRight = limitLeft + mapCurrentWidth - lemSize;

  //add trap of lemmings
  var trapOriginX,
   trapOriginX = 280,
   trapOriginY = 150;

  trap = document.createElement("div");
  trap.id = "trap";
  map.append(trap);
  $(trap).css({
    'width': '82px', 
    'height' : '44px',
    'background': 'url(/assets/lemmings_trape.png) no-repeat',
    'position' : 'absolute'
  });
  trapCurrentX = parseInt(mapCurrentX+(trapOriginX / mapOriginWidth * mapCurrentWidth), 10);
  trapCurrentY = parseInt(parseInt($(trap).css('top'))+(trapOriginY / mapOriginHeight * mapCurrentHeight), 10);
  $(trap).css({
    'left' : trapCurrentX,
    'top' : trapCurrentY,
    '-webkit-transform' : 'scale(' + mapResize + ')',
    '-moz-transform'    : 'scale(' + mapResize + ')',
    '-ms-transform'     : 'scale(' + mapResize + ')',
    '-o-transform'      : 'scale(' + mapResize + ')',
    'transform'         : 'scale(' + mapResize + ')' 
  });

  //add exit door
  var exitOriginX,
   exitCurrentY,
   exitCurrentX,
   exitOriginX = 300,
   exitOriginY = 432,
   exitWidth = 68,
   exitHeight = 51;
  exit = document.createElement("div");
  exit.id = "exit";
  map.append(exit);
  $(exit).css({
    'width': '70px', 
    'height' : '51px',
    'background': 'url(/assets/lemmings_exit.png) no-repeat',
    'position' : 'absolute',
    '-webkit-animation' : 'spriteExit 0.8s infinite steps(6)',
    '-moz-animation' : 'spriteExit 0.8s infinite steps(6)',
    '-ms-animation' : 'spriteExit 0.8s infinite steps(6)',
    '-o-animation' : 'spriteExit 0.8s infinite steps(6)',
    'animation' : 'spriteExit 0.8s infinite steps(6)'
  });
  exitCurrentX = parseInt(mapCurrentX+(exitOriginX / mapOriginWidth * mapCurrentWidth), 10);
  exitCurrentY = parseInt(parseInt($(exit).css('top'))+(exitOriginY / mapOriginHeight * mapCurrentHeight), 10);
  $(exit).css({
    'left' : exitCurrentX,
    'top' : exitCurrentY,
    '-webkit-transform' : 'scale(' + mapResize + ')',
    '-moz-transform'    : 'scale(' + mapResize + ')',
    '-ms-transform'     : 'scale(' + mapResize + ')',
    '-o-transform'      : 'scale(' + mapResize + ')',
    'transform'         : 'scale(' + mapResize + ')' 
  });
}




/*window.requestAnimationFrame = function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(f) {
    window.setTimeout(f,1e3/60);
  }
}();
*/

/*
function canvas()
{
  var can,
    context,
    canvaWidth,
    bgHeight,
    bgWidth,
    canvaOriginX,
    screenWidth = window.innerWidth,
    imageBG = new Image(),
    now = new Date();


  var fps = 60;
  var interval = 1000/fps;
  var delta;
    delta = now - time;
if(delta > interval) {
  imageBG.src = '/assets/lemmings_map2.png';
  can = $('#my-canvas');
  context = can[0].getContext('2d');
  context.canvas.width = (screenWidth * 80 / 100);
  canvaWidth = context.canvas.width;
  bgHeight = parseInt((imageBG.height / imageBG.width * canvaWidth), 10);
  bgWidth = parseInt(canvaWidth*0.85, 10);

  //context.clearRect(0,0,canvaWidth,450);
  canvaOriginX = parseInt((screenWidth - canvaWidth) / 2, 10);
  can.css('margin-left', canvaOriginX);
  can.css('margin-top', '70px');
  imageBG.onload = function() {
    // Cette fonction est appelée lorsque l'image a été chargée
    context.drawImage(this,canvaOriginX,0, bgWidth,bgHeight); // this fait référence à l'objet courant (=image)
  };
  //context.save();
//show trap image
  var trapOriginX,
    trapOriginY,
    trapWidth,
    trapHeight,
    imageTrap = new Image();
  imageTrap.src = '/assets/lemmings_trape.png';
  trapOriginX = parseInt(canvaOriginX+(280/ imageBG.width * bgWidth), 10);
  trapOriginY = parseInt(150 / imageBG.height * bgHeight);
  trapWidth = parseInt(imageTrap.width / imageBG.width * bgWidth, 10);
  trapHeight = parseInt(imageTrap.height / imageBG.height * bgHeight, 10);

  imageTrap.onload = function() {
    // Cette fonction est appelée lorsque l'image a été chargée
    context.drawImage(this,trapOriginX,trapOriginY,trapWidth,trapHeight); // this fait référence à l'objet courant (=image)
  };
//show exit image
  var exitOriginX,
    exitOriginY,
    exitWidth,
    exitOriginX,
    exitOriginY,
    exitHeight,
    spriteExit,
    imageExit = new Image();
  spriteExit = parseInt((now.getUTCMilliseconds()/100)/10*6, 10)
  imageExit.src = '/assets/lemmings_exit.png';
  exitOriginX = parseInt(canvaOriginX+(300/ imageBG.width * bgWidth), 10);
  exitOriginY = parseInt(442 / imageBG.height * bgHeight);
  exitWidth = parseInt((imageExit.width / imageBG.width * bgWidth)/6, 10);
  exitHeight = parseInt(imageExit.height / imageBG.height * bgHeight, 10);

  imageExit.onload = function() {
    // Cette fonction est appelée lorsque l'image a été chargée
    context.drawImage(this,parseInt(0+(70*spriteExit), 10),0,70,51,exitOriginX,exitOriginY,exitWidth,exitHeight); // this fait référence à l'objet courant (=image)
  };
  //context.save();
  time = now - (delta % interval);
}
  //canvas();
  setTimeout(function() {
    requestAnimationFrame(canvas);
  }, 350);
  //requestAnimationFrame(canvas);

}
*/

