// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$( document ).ready(function() {

   startLemmings();
  deplace();
  window.onresize = function(event) {
    replaceLemmings();
  };

});
function animLine(e) {
  var lineAnim = getLines(e),
    circleAnim = getCircle(e);
  circleAnim.css('visibility', 'visible')
  animations(lineAnim, 'dash', '8s', 'infinite', 'linear');
  animations(circleAnim, 'circleAnimation', '0.5s', '1', 'linear', 'forwards');
}
function inanimeLine(e) {
  var lineAnim = getLines(e),
    circleAnim = getCircle(e);
  animations(lineAnim, 'undash', '2s', '1', 'ease-in-out');
  animations(circleAnim, 'circleInanimation', '2s', '1', 'linear', 'forwards');
}
function getLines(elem) {
  var el = $(elem),
    id = el.data('id'),
    div = $('#line-'+id);
  return div.find('path');
}
function getCircle(elem) {
  var el = $(elem),
    id = el.data('id');
  return $('#circle-'+id+'-arrond');
}
function animations(elem, val, duration, count, timing, mode) {
  elem.css('animation-duration', duration);
  elem.css('animation-name', val);
  elem.css('animation-iteration-count', count);
  elem.css('animation-timing-function', timing);
  elem.css('animation-fill-mode', mode);
}


function deplace()
{
  var lemmings = $('.lemmings'),
    len = lemmings.length;
  for (i = 0; i < len; i++)
  {
    var lem = $(lemmings[i]),
     position = parseInt($(lem).css('left'), 10);

    if(lem.data('id') == "right")
    {
      if(position <= limitRight)
      {
        $('.lemmings.right').animate({left: '+=10' + "px"},400);
      }
      else
      {
        lem.finish();
        lem.css('left', position+'px');
        lem.data('id' , 'left');
        lem.attr('class', 'lemmings left');
      }
    }
    else if(lem.data('id') == "left")
    {
      if(position >= limitLeft)
      {
         $('.lemmings.left').animate({left: '-=10' + "px"},400);
      }
      else
      {
        lem.finish();
        lem.css('left', position+'px');
        lem.data('id' , 'right');
        lem.attr('class', 'lemmings right');
      }
    }
  }
  setTimeout(function(){
    deplace();
  }, 400);
}


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
     positionRelatif = (position - limitLeft) / (referentSize - lemSize / 100),
     nPosition = (positionRelatif * (nReferentSize - lemSize / 100)) + nLimitLeft;
   lem.finish();
   lem.css('left', nPosition);
  }
  screenSize = nScreenSize;
  lemSize = parseInt($(lemmings[0]).css('width'), 10) * 0.5;
  referentSize = nReferentSize;
  limitLeft = nLimitLeft;
  limitRight = nLimitRight;
}

function startLemmings()
{
  screenSize = parseInt($('body').css('width'), 10)-50;
  lemSize = parseInt($($('.lemmings')[0]).css('width'), 10) * 0.5;
  referentSize = parseInt($('#map').css('width'), 10);
  limitLeft = (screenSize - referentSize) /2 ;
  limitRight = limitLeft + referentSize - lemSize;
}

