let body = document.getElementsByTagName("BODY")[0];

function keydown(event) {
  switch(event.code) {
    case 'KeyW':
      decreaseCssVariable('--transform-y');
      break;
    case 'KeyS':
      increaseCssVariable('--transform-y');
      break;
    case 'KeyD':
      increaseCssVariable('--transform-x');
      break;
    case 'KeyA':
      decreaseCssVariable('--transform-x');
      break;
    case 'KeyE':
      increaseCssVariable('--transform-r');
      break;
    case 'KeyQ':
      decreaseCssVariable('--transform-r');
      break;
   }
}

function touchmove(event) {
  console.log(event);
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    setCssVariable('--transform-x',touch.pageX);
    setCssVariable('--transform-y',touch.pageY);
  }
}

function increaseCssVariable(variable) {
  let value = getCssVariable(variable)+1;
  setCssVariableAndUpdateUrl(variable,value);
}

function decreaseCssVariable(variable) {
  let value = getCssVariable(variable)-1;
  setCssVariableAndUpdateUrl(variable,value);
}

function setCssVariableAndUpdateUrl(variable, value) {
  setCssVariable(variable,value);
  let newUrl =
    location.href.replace(/\?.*/,"")+
    '?x='+getCssVariable('--transform-x')+
    '?y='+getCssVariable('--transform-y')+
    '?r='+getCssVariable('--transform-r');
  window.history.replaceState({},document.title,newUrl);
}

function getCssVariable(variable) {
  return parseInt(getComputedStyle(body).getPropertyValue(variable));
}

function setCssVariable(variable, value) {
  body.style.setProperty(variable,value);
}

function processParameters() {
  setCssVariable('--transform-x', parseInt(getUrlParameter('x')))
  setCssVariable('--transform-y', parseInt(getUrlParameter('y')))
  setCssVariable('--transform-r', parseInt(getUrlParameter('r')))
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let matches = regex.exec(location.search);
  let text = matches === null ? '' : decodeURIComponent(matches[1].replace(/\+/g, ' '));
  let value = parseInt(text) || 0;
  return value;
}

function main() {
  processParameters();
  document.onkeydown = keydown;
  document.ontouchmove = touchmove;
}

main();
