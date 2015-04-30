// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$( document ).ready(function() {




});
function animLine(e) {
  lineAnim = getLines(e);
  circleAnim = getCircle(e);
  circleAnim.css('visibility', 'visible')
  animations(lineAnim, 'dash', '8s', 'infinite', 'linear');
  animations(circleAnim, 'circleAnimation', '0.5s', '1', 'linear', 'forwards');
}
function inanimeLine(e) {
  lineAnim = getLines(e);
  circleAnim = getCircle(e);
  animations(lineAnim, 'undash', '2s', '1', 'ease-in-out');
  animations(circleAnim, 'circleInanimation', '2s', '1', 'linear', 'forwards');
}
function getLines(elem) {
  el = $(elem);
  id = el.data('id');
  div = $('#line-'+id);
  return div.find('path');
}
function getCircle(elem) {
  el = $(elem);
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
