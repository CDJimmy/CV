// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var lastScrollTop = 0;
var scrollLevel = 1;
$(window).scroll(function(event){
  var y_scroll_pos = window.pageYOffset;
  var st = $(this).scrollTop();
  var scroll_down_dashboard = 40;             // set to whatever you want it to be
  var scroll_up_dashboard = 300;
  var scroll_down_cube = $('#slide2').offset().top - 200;
  if(y_scroll_pos > scroll_down_dashboard && st > lastScrollTop) {
    moveDashboard();
  } else if(y_scroll_pos < scroll_up_dashboard && scrollLevel == 1){
    initDashboard() 
  } if(y_scroll_pos > scroll_down_cube && scrollLevel == 2) {
    moveCube();
  } else if(y_scroll_pos < scroll_down_cube && scrollLevel == 1) {
    initCube();
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
