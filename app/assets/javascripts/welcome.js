// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
jQuery(document).ready(function($) {
  $('#player').on('click',function(e) {
    playRugby();
  });
  $('#player-active').on('click',function(e) {
    eventRugby();
  });
  $('#player-win').on('click',function(e) {
    initRugby();
  });
  $('#stadium').mousemove(function( event ) {
    if($('#player-active').length != 0){
      rugbyInGame($('#around-player-active'), event);
    }
  });
/*
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    initMobileMovement();
  }
*/

});

var lastScrollTop = 0;
var scrollLevel = 1;
$(window).scroll(function(event){
  var y_scroll_pos = window.pageYOffset;
  var st = $(this).scrollTop();
  var scroll_down_dashboard = 40;             // set to whatever you want it to be
  var scroll_up_dashboard = 300;
  var scroll_down_cube = $('#slide2').offset().top - 200;
  var scroll_down_sport = $('#slide3').offset().top - 200;
  if(y_scroll_pos > scroll_down_dashboard && st > lastScrollTop) {
    moveDashboard();
  } else if(y_scroll_pos < scroll_up_dashboard && scrollLevel == 1){
    initDashboard() 
  } if(y_scroll_pos > scroll_down_cube && scrollLevel == 2) {
    moveCube();
  } else if(y_scroll_pos < scroll_down_cube && scrollLevel == 1) {
    initCube();
  } if (y_scroll_pos > scroll_down_sport && scrollLevel == 3) {
    initRugby();
  }
   lastScrollTop = st;
});

function scrolling(el) {
    elem = $(el);
    var target = $('#slide'+elem.data('page'));
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      window.scrollLevel = elem.data('page');
      return false;
    }
}

function moveDashboard() {
  $('.line').css('visibility', 'hidden');
  var topLeft = $('#top-left');
  var topMiddle = $('#top-middle');
  var topRight = $('#top-right');
  animations(topLeft, 'dashboardTopLeft', '0.5s', '1', 'linear', 'forwards');
  topLeft.css('position', 'fixed');
  animations(topMiddle, 'dashboardTopMiddle', '0.5s', '1', 'linear', 'forwards');
  topMiddle.css('position', 'fixed');
  animations(topRight, 'dashboardTopRight', '0.5s', '1', 'linear', 'forwards');
  topRight.css('position', 'fixed');
  $('#home').css('visibility', 'visible');
}
function initDashboard() {
  var elems = $('#pres-top').children('div');
  for(var i = 0; i<elems.length; ++i)
  {
    $(elems[i]).attr('style', '');
  }
  $('.line').css('visibility', 'visible');
  $('#home').css('visibility', 'hidden');
  
}

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

function moveCube()
{
  var cube = $('#rubicks');
  var horizontalTop = [$('#rub-red-top'), $('#rub-blue-top'), $('#rub-orange-top'), $('#rub-green-top')];
  var hTop = $('#rub-white');
  var horizontalMiddle = [$('#rub-red-middle'), $('#rub-blue-middle'), $('#rub-orange-middle'), $('#rub-green-middle')];
  var horizontalBottom = [$('#rub-red-bottom'), $('#rub-blue-bottom'), $('#rub-orange-bottom'), $('#rub-green-bottom')];
  var hBot = $('#rub-yellow');
  var index;
  for( index =0; index <4; index++)
  {
    animations(horizontalMiddle[index], 'rotateMiddle', '9s', '1', 'linear', 'forwards');
  }
  for( index =0; index <4; index++)
  {
    animations(horizontalBottom[index], 'rotateBottom', '9s', '1', 'linear', 'forwards');
  }
  //animations(hBot, 'rotateB', '8s', '1', 'linear', 'forwards');
  for( index =0; index <4; index++)
  {
    animations(horizontalTop[index], 'rotateTop', '9s', '1', 'linear', 'forwards');
  }
  //animations(hTop, 'rotateT', '8s', '1', 'linear', 'forwards');
  animations(cube, 'rotateCube', '9s', '1', 'linear', 'forwards');
  var text = $('#rub-red p');
  var borderCube = $('#rubicks > div > div > div');
  setTimeout(function(){
    animations(text, 'iluminateCubeText', '2s', '1', 'linear');
    animations(borderCube, 'transparantCube', '2s', '1', 'linear');
      setTimeout(function(){
        text.css('color', 'ghostwhite');
         borderCube.css('border', '2px solid rgba(255, 0, 0, 0.35)');
      }, 2000);

  }, 9000);
}
function initCube()
{
  $('.rub-top, .rub-mid, .rub-bot').attr('style', '');
  $('.ruby-cube').attr('style', '');
  $('#rub-red p').attr('style', '');
  $('#rubicks').attr('style', '');
  $('#rub-red p').css('color', '#333333');
}

/*
function initMobileMovement()
{
  window.addEventListener('devicemotion', function(event) {
    x = event.acceleration.x;
    y = event.acceleration.y;
    z = event.acceleration.z;
 
    ralpha = event.rotationRate.alpha;
    rbeta = event.rotationRate.beta;
    rgamma = event.rotationRate.gamma;
 
    interval = event.interval;
  });
}
*/

function initRugby()
{
  if($('#player-active').length != 0)
  {
    $('#player-active').attr('id', 'player');
  } else if($('#player-inactive').length != 0)
  {
    $('#player-inactive').attr('id', 'player');
  } else if($('#player-win').length != 0)
  {
    $('#player-win').attr('id', 'player');
  }
  $('#player-circle').css('visibility', 'visible');
  if ($('#around-player-active').length != 0)
  {
    $('#around-player-active').attr('id', 'around-player');
  }

  lineGoal = 0;
  $('#stadium').scrollTop($('#stadium')[0].scrollHeight);
  var player = $('#around-player');
  var positionLeft = $('#stadium').width()/2 - player.width()/2;
  var positionTop = $('#stadium').height()/2 - player.height()/2;
  player.css('left', positionLeft+'px');
  player.css('top', positionTop+'px');
}
function initRugbyEnemies()
{
  lines = getRandomArbitrary(3, 5);
  //terrain : 543px large // joueur : 20px large
  // entre 5 et 12 mecs
  
  for(var i = 0; i< lines; i++)
  {
    
  }
  
}
function playRugby()
{
  if($('#player').length != 0)
  {
    $('#player').attr('id', 'player-active');
    $('#around-player').attr('id', 'around-player-active');
    $('#player-circle').css('visibility', 'hidden');
    playStadium();    
  }
}
function replayRugby()
{
  if ($('#player-inactive').length != 0)
  {
    $('#player-inactive').attr('id', 'player');
  }
}
function pauseRugby()
{
  if ($('#player-active').length != 0)
  {
    $('#player-active').attr('id', 'player-inactive');
    $('#around-player-active').attr('id', 'around-player');
    $('#player-circle').css('visibility', 'visible');

  }
}
function stopRugby()
{
  $('#player-active').attr('id', 'player');
}
function eventRugby()
{

}
function winRugby()
{
  $('#player-active').attr('id', 'player-win'); 
  setTimeout(function(){
    initRugby();
  }, 1000);
}

var lineGoal = 0;
var enemies = new Array();
function rugbyInGame(el, e)
{
    var mouseLeft = Math.round(e.pageX - $(e.currentTarget).offset().left);
    var mouseTop = (e.pageY - $(e.currentTarget).offset().top);
    var limitRight = $('#stadium').width() - el.width();
    var limitBottom = $('#stadium').height() - el.height()*0.4;

    if (mouseLeft<limitRight && mouseLeft > el.width()/2)
    {
      el.css('left', mouseLeft + 'px');
    }
    if (mouseTop<limitBottom && mouseTop > el.height()/2)
    {
      el.css('top', mouseTop + 'px');
    }
    if( $('#enemy').length !=0)
    {
      var player = new Array();
      player[0] = el.position().left + 11;
      player[1] = player[0] + el.first().width()-22;
      player[2] = el.position().top +11;
      player[3] = player[2] + el.first().height()-22;
      //var enemies = $('#enemy-rugby');
      if( (player[2] <= enemy.position().top + enemy.height() && player[3] >= enemy.position().top)
     && (player[0] <= enemy.position().left + enemy.width() && player[1] >= enemy.position().left) )
      {
        enemy.css('background-color', 'red');
      }
    }
    if (mouseTop< lineGoal -el.height())
    {
      winRugby();
    }
}

function playStadium()
{
  if($('#player-active').length != 0 && $('#stade').scrollTop().top != $('#stadium').offset().top)
  {
    var place =  $('#stadium').scrollTop();
    $('#stadium').scrollTop(place - 2)
    setTimeout(function(){
      if ( $('#stadium').offset().top <  $('#stade').offset().top + 270)
      {
        lineGoal += 2;
      }
      playStadium();
    }, 30);
  }

}



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

