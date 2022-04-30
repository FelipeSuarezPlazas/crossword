

// -------------------------------------------------------------- ALPHABET SOUP.

new p5();

// -------------------------------------------------------------- VARS.


const CANVAS_SIZE = createVector(500, 800);

const ALL_WORDS = [
  'apartment', 'glass', 'keyboard', 'windows', 'mac', 'microsoft',
  'apple', 'pencil', 'tablet', 'light', 'function', 'clothes',
  'screen', 'human', 'portfolio', 'discover', 'fish', 'scissors',
  'room', 'layer', 'crazy', 'sword', 'helmet', 'charger', 'pan',
  'league', 'videogame', 'water', 'gun', 'clock', 'careful',
];

let words = ALL_WORDS.map(WORD => {
  return WORD.toUpperCase();
  //console.log(WORD);
})

const BASE_CELL_POS = createVector(300,300);
const INPUT_SIZE_HTML = 20;
const CELL_SIZE = (INPUT_SIZE_HTML/2) + INPUT_SIZE_HTML;

const ROTATIONS = {
  'ORIENTATIONS': ['HORIZONTAL', 'VERTICAL'],
  'DIRECTIONS': ['STRAIGHT', 'REVERSED'],
}

const OPPOSITE_ROTATIONS = {
  'ORIENTATIONS': {
    ROTATIONS.ORIENTATIONS[0]: ROTATIONS.ORIENTATIONS[1],
    ROTATIONS.ORIENTATIONS[1]: ROTATIONS.ORIENTATIONS[0],
  },
  'DIRECTIONS': {
    ROTATIONS.DIRECTIONS[0]: ROTATIONS.DIRECTIONS[1],
    ROTATIONS.DIRECTIONS[1]: ROTATIONS.DIRECTIONS[0],
  },
}

const CELL_ROTATIONS = {
  ROTATIONS.ORIENTATIONS[0]: {
    ROTATIONS.DIRECTIONS[0]: createVector(1,0), 
    ROTATIONS.DIRECTIONS[1]: createVector(-1,0)},
  ROTATIONS.ORIENTATIONS[1]: {
    ROTATIONS.DIRECTIONS[0]: createVector(0,1), 
    ROTATIONS.DIRECTIONS[1]: createVector(0,-1)}
}


let cells_per_word = {};

let words_rotations = [];
let drawed_words = [];
let words_to_extend = [];
let extended_words = [];

let active_cells = [];

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
  const CNV = createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
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

  for (WORD of words_to_extend) {
    extendWord(WORD);
  }
}


function drawWord() {
  function inputManager() {
    let word = this.value();
    if (word.length == 0) {
      word = '';
    } else {
      this.value(word[0].toUpperCase());
    }
    console.log(word);
  }

  const RANDOM_INDEX = randomInt(words.length);
  const WORD = words.splice(RANDOM_INDEX, 1)[0];
  let word_cells = [];

  console.log(RANDOM_INDEX, words.length, 'RANDOM INDEX');
  console.log(WORD, 'WORD');

  const START_CELL = createVector(0,0);
  const RANDOM_ROTATIONS = {
    'ORIENTATION' random(ROTATIONS.ORIENTATIONS), 
    'DIRECTION': random(ROTATIONS.DIRECTIONS)};
  let actual_cell = START_CELL.copy();
  let cell_pos = 0;



  // ** draw an input for each letter
  for (LETTER of WORD) {
    console.log(LETTER, 'LETTER');

    cell_pos = p5.Vector.add(
      BASE_CELL_POS, p5.Vector.mult(actual_cell, CELL_SIZE));

    //console.log(cell_pos.x, cell_pos.y);

    const INP = createInput(LETTER);
    INP.position(cell_pos.x, cell_pos.y);
    INP.size(INPUT_SIZE_HTML, INPUT_SIZE_HTML);
    INP.input(inputManager);


    active_cells.push(actual_cell.copy());
    word_cells.push(actual_cell.copy());
    actual_cell.add(CELL_DIRECTION);
  }

  cells_per_word[WORD] = word_cells;
  words_rotations[WORD] = RANDOM_ROTATIONS;
  drawed_words.push(WORD);
  words_to_extend.push(WORD);
}

function extendWord(EXTEND_WORD) {
  function wordMaxPossibleConnections(WORD) {
    let max = 0;

    // la palabra es par o inpar?
    // si divido la palabra por dos y el restante es 0, etnocnes es par
    if (WORD.length % 2 == 0) { // par
      max = WORD.length / 2;
    } else {
      max = ((WORD.length-1)/2)+1;
    }

    return max;
  }

  function letterIndexApproved(LETTER_INDEX, SELECTED_LETTER_INDEXES) {
    // en realidad lo que comparo no son las letras en si
    // son sus index
    // TEST IF THE LETTER FOLLOW THE RULES OF THE CRUCIGRAMA.
    return true;
  }
  
  /*
  const RANDOM_POSSIBLE_CONNECTIONS = Math.floor(
    random(1, 1+wordMaxPossibleConnections(EXTEND_WORD)));
  const WORD_CONNECTIONS = 
    Math.floor(random(1+RANDOM_POSSIBLE_CONNECTIONS));
  */

  // ***** DEBO ASEGURARME DE QUE AL MENOS ESCOJA UNA PALABRA ***


  let selected_letter_indexes = [];

  // el numero de intentos que voy a hacer para ponerla
  // como letra conectora
  const LETTER_TRIES = 3;
  const SELECT_RANDOM_WORD_TRIES = 5;
  const FIT_RANDOM_WORD_TRIES = 5;
  // de cuantas formas puedo intentar
  // encajar la palabra??
  // en realidad de varias
  // sobre todo si la letra se repite en ambas palabras.
  // pero principalmente solo de 2 formas.
  // suponiendo que la letra solo se encuentra una vez
  // en cada palabra.

  let random_letter_index;
  let selected_letter;
  let random_word;
  let random_word_letter_index_match;

  
  for (let letter_try = 0; letter_try < LETTER_TRIES; letter_try++) {
    random_letter_index = randomInt(EXTEND_WORD.length+1);
    if (letterIndexApproved(random_letter_index, selected_letter_indexes)) {
      selected_letter_indexes.push(random_letter_index);
      selected_letter = EXTEND_WORD[random_letter_index];
    } else {continue};

    for (let select_random_word_try = 0; select_random_word_try < SELECT_RANDOM_WORD_TRIES; select_random_word_try++) {
      random_word = random(words);
      let letter_common_index_group;
      if (random_word.includes(selected_letter)) {
        letter_common_index_group = random_word.map((LETTER, index) => {
          if (LETTER == selected_letter) return index;
        })
      }
      
      // lets try all the different ways of fiting this word
      // when achived, then lets try another letter. :)
      for (const LETTER_COMMON_INDEX of letter_common_index_group) {
        // TRY THE TWO WAYS OF PUTTING IT.
        let OPPOSITE_EXTEND_WORD_ORIENTATION = 
          OPPOSITE_ROTATIONS.ORIENTATIONS[
            words_rotations[EXTEND_WORD].ORIENTATION];


        for (const DIRECTION of ROTATIONS.DIRECTIONS) {
          // ahora debo probar encajar ambas direcciones
          // y si alguna encaja entonces perfecto, nos devolvemos
          // directamente a probar otra letra.

          // ok, lets try fitting this word, this direction...
          // primero que todo, lo primero que debo hacer
          // es solo por medio de datos
          // comprobar que no se esta interponiendo
          // encima de alguna otra palabra.
        }
      }
    }
  }
}





function drawBorder() {
  // line between soup and WORDS.
  const LM = 2;
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

function randomInt(num) {
  return Math.floor(random(num));
}








