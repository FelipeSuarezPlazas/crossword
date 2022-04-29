

// -------------------------------------------------------------- ALPHABET SOUP.

new p5();

// -------------------------------------------------------------- VARS.


let CANVAS_SIZE = createVector(500, 800);

let WORDS = {
  'apartment', 'glass', 'keyboard', 'windows', 'mac', 'microsoft',
  'apple', 'pencil', 'tablet', 'light', 'function', 'clothes',
  'screen', 'human', 'portfolio', 'discover', 'fish', 'scissors',
  'room', 'layer', 'crazy', 'sword', 'helmet', 'charger', 'pan',
  'league', 'videogame', 'water', 'gun', 'clock', 'careful',
};



/*

Un reflejo de mi imagición, mis palabras.

Aquello que veo es algo asi como literalmente mi imaginación
pero automatizada, y siguiendo las diferentes reglas ya sabidas.

Es como un reflejo de mis capacidades pero mucho más potente,
con una capacidad de visualización y cambio mucho más rapida
que la mia, pero a fin de cuentas es una version de mi mente
que corre más rapido.

No que piensa, si no que corre lo que ya sé pero más rapido, en menos
tiempo y mucho más eficiente, sin posibles errores.

*/






// -------------------------------------------------------------- FUNCTIONS.


function setup() {
  let CNV = createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
  CNV.parent('canva-game');

  angleMode(DEGREES);
  frameRate(30);
  restartGame();
}

function restartGame() {
  ui = createGraphics(CANVAS_SIZE.x, CANVAS_SIZE.y);
  ui.clear();

  // ----- FUNCTIONS

  drawLines();
}

function drawLines() {
  // line between soup and WORDS.
  let LM = 2;
  ui.line(LM, LM, CANVAS_SIZE.x, LM);
  ui.line(LM, LM, LM, CANVAS_SIZE.y);
  ui.line(CANVAS_SIZE.x-LM, LM, CANVAS_SIZE.x-LM, CANVAS_SIZE.y-LM);
  ui.line(LM, CANVAS_SIZE.y-LM, CANVAS_SIZE.x-LM, CANVAS_SIZE.y-LM);
}

function draw() {
  image(ui, 0, 0);

  // transform mouse positions to vector variable for Math purpouses.
  [mouse.x, mouse.y] = [mouseX, mouseY];
  drawWordSelection();
}

function mousePressed() {
  console.log('PRESSED');
}

function mouseReleased() {
  
}








