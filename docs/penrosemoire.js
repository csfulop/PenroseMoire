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

function increaseCssVariable(variable) {
  let body = document.getElementsByTagName("BODY")[0];
  body.style.setProperty(
    variable,
    parseInt(getComputedStyle(body).getPropertyValue(variable))+1
  );
}

function decreaseCssVariable(variable) {
  let body = document.getElementsByTagName("BODY")[0];
  body.style.setProperty(
    variable,
    parseInt(getComputedStyle(body).getPropertyValue(variable))-1
  );
}

function main() {
  document.onkeydown = keydown;
}

main();
