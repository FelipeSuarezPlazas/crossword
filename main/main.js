

// -------------------------------------------------------------- ALPHABET SOUP.

new p5();

// -------------------------------------------------------------- VARS.


let CANVAS_SIZE = createVector(500, 800);

let ALL_WORDS = [
  'apartment', 'glass', 'keyboard', 'windows', 'mac', 'microsoft',
  'apple', 'pencil', 'tablet', 'light', 'function', 'clothes',
  'screen', 'human', 'portfolio', 'discover', 'fish', 'scissors',
  'room', 'layer', 'crazy', 'sword', 'helmet', 'charger', 'pan',
  'league', 'videogame', 'water', 'gun', 'clock', 'careful',
];

ALL_WORDS = ALL_WORDS.map(WORD => {
  return WORD.toUpperCase();
  //console.log(WORD);
})

let words = ALL_WORDS.slice();

let INPUT_INIT_POS = createVector(300,300);
let INP_SIZE_HTML = 20;
let INP_SIZE = (INP_SIZE_HTML/2) + INP_SIZE_HTML;

let INP_DIRECTION_OPTIONS = [0, 1];
let INP_DIRECTIONS = {
  0: createVector(0, INP_SIZE), 
  1: createVector(INP_SIZE, 0)};


let drawed_words = [];
let words_to_extend = [];
let extended_words = [];

// Cada palabra tiene una de dos direcciones.
// cada letra tiene una posicion
// cada letra es un posible conector.
// cada palabra es un grupo de posibles conectores.

let mouse = createVector(0, 0);



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

Dibujemos una palabra.

Cada input solo puede contener un caracter.

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

  drawBorder();
  drawWord();
}


function drawWord() {
  let random_word_index = Math.floor(random(words.lenght));
  let WORD = words.splice(random_word_index, 1)[0];

  console.log(WORD, 'WORD');

  let inp_pos = INPUT_INIT_POS.copy();


  // ** draw an input for each letter
  for (LETTER of WORD) {
    console.log(LETTER, 'LETTER');
    console.log(inp_pos.x, inp_pos.y);
    let inp = createInput(LETTER);
    inp.position(inp_pos.x, inp_pos.y);
    inp.size(INP_SIZE_HTML, INP_SIZE_HTML);
    inp.input(inputManager);

    inp_pos.add(INP_SIZE, 0);
  }

  drawed_words.push(WORD);
  words_to_extend.push(WORD);

  for (WORD of words_to_extend) {
    extendWord(WORD);
  }
}

function extendWord(WORD) {
  // cuantas palabras voy a conectar?
  // debe ser un numero aleatoreo entre 1 y la cantidad maxima.

  // puedo decir que el numero de conexiones aleatoreas se cumplirá
  // pero lo cierto es que por posicionamiento o palabras
  // disponibles simplemente no se cumplan las conexiones.
  let random_possible_connections = Math.floor(
    random(1, 1+wordMaxPossibleConnections(WORD)));
}

function wordMaxPossibleConnections(WORD) {
  let max = 0;

  // la palabra es par o inpar?
  // si divido la palabra por dos y el restante es 0, etnocnes es par
  if (WORD.lenght % 2 == 0) { // par
    max = WORD.lenght / 2;
  } else {
    max = ((WORD.lenght-1)/2)+1;
  }

  return max;
}

function inputManager() {
  let word = this.value();
  if (word.lenght == 0) {
    word = '';
  } else {
    this.value(word[0].toUpperCase());
  }
  console.log(word);
}


function drawBorder() {
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
}

function mousePressed() {
  console.log('PRESSED');
}

function mouseReleased() {
  
}








