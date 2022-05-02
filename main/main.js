

// -------------------------------------------------------------- ALPHABET SOUP.

new p5();

// -------------------------------------------------------------- VARS.

const CANVAS_SIZE = createVector(500, 800);

const ALL_WORDS = [
  'apartment', 'glass', 'keyboard', 'windows', 'mac', 'microsoft',
  'apple', 'pencil', 'tablet', 'light', 'tennis', 'clothes',
  'screen', 'human', 'portfolio', 'discover', 'fish', 'scissors',
  'room', 'layer', 'crazy', 'sword', 'helmet', 'charger', 'internet',
  'league', 'videogame', 'water', 'gun', 'clock', 'careful', 'mouse',
  'alphabet', 'fork', 'movie', 'theater', 'animal', 'kitchen',
  'programming', 'sublime', 'awesome', 'wisdom', 'character',
  'luxury', 'netflix', 'six', 'suitcase', 'store', 'street',
  'gorgeous', 'cute', 'tokyo', 'anime', 'picture', 'wooden', 'dollar',
  'murder', 'bulldozer', 'technology', 'blockchain', 'bitcoin',
  'brick', 'design', 'thinking', 'universe', 'parody', 'question',
  'answer', 'contemporary', 'travel', 'incredible'
];

let words = ALL_WORDS.map(WORD => {
  return WORD.toUpperCase();
  //console.log(WORD);
})

const BASE_CELL = createVector(0,0);
const BASE_CELL_POS = createVector(300,300);
const INPUT_SIZE_HTML = 20;
const CELL_SIZE = (INPUT_SIZE_HTML/2) + INPUT_SIZE_HTML;

const ROTATIONS = {
  'ORIENTATIONS': ['HORIZONTAL', 'VERTICAL'],
  'DIRECTIONS': ['STRAIGHT', 'REVERSED'],
}

const OPPOSITE_ROTATIONS = {
  'ORIENTATIONS': {
    [ROTATIONS.ORIENTATIONS[0]]: ROTATIONS.ORIENTATIONS[1],
    [ROTATIONS.ORIENTATIONS[1]]: ROTATIONS.ORIENTATIONS[0],
  },
  'DIRECTIONS': {
    [ROTATIONS.DIRECTIONS[0]]: ROTATIONS.DIRECTIONS[1],
    [ROTATIONS.DIRECTIONS[1]]: ROTATIONS.DIRECTIONS[0],
  },
}

const CELL_MOVEMENTS = {
  [ROTATIONS.ORIENTATIONS[0]]: {
    [ROTATIONS.DIRECTIONS[0]]: createVector(1,0), 
    [ROTATIONS.DIRECTIONS[1]]: createVector(-1,0)},
  [ROTATIONS.ORIENTATIONS[1]]: {
    [ROTATIONS.DIRECTIONS[0]]: createVector(0,1), 
    [ROTATIONS.DIRECTIONS[1]]: createVector(0,-1)}
}


let cells_per_word = {};

let words_angles = [];
let drawed_words = [];
let words_to_extend = [];
let extended_words = [];

let active_cells = [];

let mouse = createVector(0, 0);

const LIMIT_WORDS_DRAWED = 8;
let limit_words_drawed_counter = 0;



/*

Arreglar algoritmo de palabras,
Hacer que la palabra pruebe con absolutamente todas
las palabras que existen en la lista.





Esto es bastante curioso, pero yo solo me siento aqui a escribir

mi unica herramienta de comunicación con esta computadora
compleja, es un teclado con palabras y numeros.



palabras, y numeros, o sea palabras y matematicas
o sea palabras y palabras precisas, exactas.

palabras, hablar
esto es directamente como hablar
es como si le contara a ella o le describiera con palabras
que es lo que quiero que muestra. No.


Es casi como si me sentara a contarle lo que veo en mi mente.

una variable es un significado exacto.
es algo que no se puede malinterpretar, significa una cosa y punto
pero es una cosa que significa lo mismo para todos los seres
humanos del planeta, asi de exacto es. Matematicas
 
 Una forma de expresion para la coordinación humana precisa.
 eso es una variable. pero accedo a ella, o mejor dicho me refiero
 a ella con una palabra, bueno, es mi imaginación.

 expresarlo de forma exacta, matematicas.
 Es una forma de imaginación precisa. Viene de la sagacidad
 previa acumulada.

 Contarle lo que imagino, o lo que veo, contarselo.



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
  createCrossword()
}

function createCrossword() {
  drawRootWord();

  for (WORD of words_to_extend) {
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log(WORD, 'WORD');
    console.log('');
    console.log(limit_words_drawed_counter,'limit_words_drawed_counter');
    if (limit_words_drawed_counter == LIMIT_WORDS_DRAWED-1) break;
    extendWord(WORD);
  }


  /*
  This function connects a random word to the given word.

  */
  /*
  let word = 'building';
  let plugged_word = tryGetPuggableRandomWord(word);
  let cells = drawWordNew(plugged_word);
  registerWord(plugged_word);

  */
}


function drawRootWord() {
  console.log('');
  console.log('(drawRootWord)');
  const RANDOM_INDEX = randomInt(words.length);
  const WORD = words.splice(RANDOM_INDEX, 1)[0];
  let word_cells = [];

  //console.log(RANDOM_INDEX, words.length, 'RANDOM INDEX');
  console.log(WORD, '[word]');

  const RANDOM_ANGLES = {
    'ORIENTATION': random(ROTATIONS.ORIENTATIONS),
    'DIRECTION': random(ROTATIONS.DIRECTIONS)
  }

  const RANDOM_CELL_MOVEMENT = 
    CELL_MOVEMENTS[RANDOM_ANGLES.ORIENTATION][RANDOM_ANGLES.DIRECTION];
  
  let actual_cell = BASE_CELL.copy();
  let cell_pos = 0;



  // ** draw an input for each letter
  for (LETTER of WORD) {
    //console.log(LETTER, 'LETTER');
    drawLetter(LETTER, actual_cell);

    active_cells.push(actual_cell.copy());
    word_cells.push(actual_cell.copy());
    actual_cell.add(RANDOM_CELL_MOVEMENT);
  }

  cells_per_word[WORD] = word_cells;
  words_angles[WORD] = RANDOM_ANGLES;
  drawed_words.push(WORD);
  words_to_extend.push(WORD);
}

/*
Plug words to this word :)
*/
function extendWord(EXTEND_WORD) {
  console.log('');
  console.log('(extendWord)');
  console.log(EXTEND_WORD, '[word to extend]');
  
  let selected_letter_indexes = [];

  const LETTER_TRIES = 6;
  const SELECT_RANDOM_WORD_TRIES = 20;
  
  let random_letter_index;
  let selected_letter;
  let random_word;
  let random_word_letter_index_match;

  
  /*
  try random letters of this word and check if we can use them
  with a crucigrama algorithm, *(not all the letters can be used).
  */
  for (let letter_try = 0; letter_try < LETTER_TRIES; letter_try++) {
    console.log('********** TRY (' + letter_try + '/' + LETTER_TRIES + ') **********')
    random_letter_index = randomInt(EXTEND_WORD.length);
    selected_letter = EXTEND_WORD[random_letter_index];
    console.log(selected_letter, '[POSSIBLE random selected letter]');
    console.log(selected_letter_indexes.length, '[selected indexes length]');
    if (!checkLetterAlgorithm(random_letter_index, selected_letter_indexes)) {
      continue;
    }
    
    console.log(random_letter_index, '[random letter index]');
    console.log(selected_letter, '[random selected letter]');


    /*
    Look for a word that can be plugged in with the selected letter
    */
    select_random_word_loop:
    for (let select_random_word_try = 0; select_random_word_try < SELECT_RANDOM_WORD_TRIES; select_random_word_try++) {
      random_word = random(words);
      if (!random_word.includes(selected_letter)) {
        console.log(random_word, '** NOT INCLUDES ', selected_letter)
        continue;
      }
      selected_letter_indexes.push(random_letter_index);
      let common_letter_indexes = getCommonLetterIndexes(random_word, selected_letter);
      console.log(random_word, '[random word to connect]');
      console.log(common_letter_indexes.length, '[common letters]')

      
      /*
      If found a word, now lets try fitting it in all the possible
      ways, if it contains this letter repeated times, then lets
      try them too, just in case it overflows other words.
      */
      for (const COMMON_INDEX of common_letter_indexes) {
        console.log(words_angles[EXTEND_WORD], '[angles of word to extend]');
        let OPPOSITE_EXTEND_WORD_ORIENTATION = OPPOSITE_ROTATIONS.ORIENTATIONS[words_angles[EXTEND_WORD].ORIENTATION];
        let SELECTED_LETTER_CELL = cells_per_word[EXTEND_WORD][random_letter_index]


        /*
        Each one of the tries has to try fitting the word
        in both of the two directions.
        */
        for (const ACTUAL_DIRECTION of ROTATIONS.DIRECTIONS) {
          console.log(OPPOSITE_EXTEND_WORD_ORIENTATION, '[opposite orientation of word to extend]');
          console.log(ACTUAL_DIRECTION, '[random direction]');
          let random_word_cell_movement = CELL_MOVEMENTS[OPPOSITE_EXTEND_WORD_ORIENTATION][ACTUAL_DIRECTION];
          console.log(random_word_cell_movement, '[random word cell movement]');
          console.log(COMMON_INDEX, '[letter common index]');
          const START_CELL = p5.Vector.add(SELECTED_LETTER_CELL, p5.Vector.mult(random_word_cell_movement, COMMON_INDEX))
          let WORD_ANGLES = {'ORIENTATION': OPPOSITE_EXTEND_WORD_ORIENTATION, 'DIRECTION': OPPOSITE_ROTATIONS.DIRECTIONS[ACTUAL_DIRECTION]}
          random_word_cell_movement = CELL_MOVEMENTS[WORD_ANGLES.ORIENTATION][WORD_ANGLES.DIRECTION];
          let word_approved = checkWord(random_word, START_CELL, WORD_ANGLES, random_word_cell_movement, SELECTED_LETTER_CELL);

          /*
          If the word fits, then lets draw it :)
          Lets count here the number of words that can be drawed
          and return if we reach that number.
          */
          if (word_approved) {
            if (limit_words_drawed_counter == LIMIT_WORDS_DRAWED-1) return;
            limit_words_drawed_counter++;

            console.log('********** SUCCESS ' + random_word + '**********');
            words.splice(words.indexOf(random_word), 1);
            drawWordNew(random_word, START_CELL, WORD_ANGLES, random_word_cell_movement, SELECTED_LETTER_CELL);
            break select_random_word_loop;
          }
        }
      }
    }
  }
}

/*
Check if a letter can be used as a connector in a word so the
connected words aren't too close :)
*/
function checkLetterAlgorithm(LETTER_INDEX, SELECTED_LETTER_INDEXES) {
  let approved = true;

  if (SELECTED_LETTER_INDEXES.includes(LETTER_INDEX)) {
    approved = false;
  }

  SELECTED_LETTER_INDEXES.forEach(INDEX => {
    if (Math.abs(LETTER_INDEX - INDEX) == 1) approved = false;
  })

  return approved;
}

/*
Takes a word and a letter, and returns a list of indexes
where the letter is in the word. 
*/
function getCommonLetterIndexes(WORD, SELECTED_LETTER) {
  let common_letter_indexes = [];
  let word_array = [];

  for (const L of WORD) word_array.push(L);

  common_letter_indexes = word_array
    .map((LETTER, INDEX) => {if (LETTER == SELECTED_LETTER) return INDEX})
    .filter(INDEX => INDEX != undefined);

  return common_letter_indexes;
}

/*
Cheks if this word doesn't overlaps other drawed words :)
*/
function checkWord(WORD, START_CELL, WORD_ANGLES, CELL_MOVEMENT, AVOID_CELL) {
  let approved = true
  let actual_cell = START_CELL.copy();
  console.log(WORD_ANGLES, 'WORD_ANGLES');
  let OPPOSITE_ORIENTATION = OPPOSITE_ROTATIONS.ORIENTATIONS[WORD_ANGLES.ORIENTATION];
  console.log(WORD_ANGLES.ORIENTATION, OPPOSITE_ORIENTATION, 'OPPOSITE_ORIENTATION****')
  let word_letter_counter = 0;

  /*
  Check each one of the letter cells where this word is going to be.
  */
  random_word_letter_loop:
  for (const LETTER of WORD) {


    /*
    Iterate over all the active cells (not available cells)
    to compare in an appropiate way.
    */
    for (const ACTIVE_CELL of active_cells) {

      /*
      If the actual cell is the common cell (connection cell)
      then no comparison is neccessary, we can avoid it.
      */
      if (!actual_cell.equals(AVOID_CELL)) {

        /*
        checks that the cell where this letter 
        is going to be is available. 
        */
        if (actual_cell.equals(ACTIVE_CELL)) {
          approved = false;
          break random_word_letter_loop;
        }


        /*
        checks that the cells around the actual cell are availables
          *(in the oposite orientation).
        */
        for (const DIRECTION of ROTATIONS.DIRECTIONS) {
          let OPPOSITE_ORIENTATION_MOVEMENT = CELL_MOVEMENTS[OPPOSITE_ORIENTATION][DIRECTION];

          const ACTUAL_CELL_AROUND_CHECKER = p5.Vector.add(actual_cell, OPPOSITE_ORIENTATION_MOVEMENT);

          if (ACTUAL_CELL_AROUND_CHECKER.equals(ACTIVE_CELL)) {
            approved = false;
            break random_word_letter_loop;
          }
        }
      }


      /*
      If this is the first or the last cell,
      then check to continuos cells, they must be available too.
      */
      if (word_letter_counter == 0) {
        const OPPOSITE_DIRECTION = OPPOSITE_ROTATIONS.DIRECTIONS[WORD_ANGLES.DIRECTION];
        const OPPOSITE_MOVEMENT = CELL_MOVEMENTS[WORD_ANGLES.ORIENTATION][OPPOSITE_DIRECTION];

        const CELL_IN_OPPOSITE_DIRECTION = p5.Vector.add(actual_cell, OPPOSITE_MOVEMENT);
        if (CELL_IN_OPPOSITE_DIRECTION.equals(ACTIVE_CELL)) {
          approved = false;
          break random_word_letter_loop;
        }

      } else if (word_letter_counter == WORD.length-1) {
        const FOLLOWING_CELL = p5.Vector.add(actual_cell, CELL_MOVEMENT);
        if (FOLLOWING_CELL.equals(ACTIVE_CELL)) {
          approved = false;
          break random_word_letter_loop;
        }
      }
    }

    actual_cell.add(CELL_MOVEMENT);
    word_letter_counter++;
  }

  return approved;
}


/*
Draw a word in the crossword and sets all the necessary data.
*/
function drawWordNew(WORD, START_CELL, WORD_ANGLES, CELL_MOVEMENT, COMMON_CELL) {
  console.log('');
  console.log('(drawWordNew)');
  console.log(WORD, '[word to draw]');
  //console.log(START_CELL, '[start cell]');
  //console.log(WORD_ANGLES, '[word angles]');
  //console.log(CELL_MOVEMENT, '[cell movement]');
  //console.log(COMMON_CELL, '[common cell]');
  let word_cells = [];
  let actual_cell = START_CELL.copy();

  for (LETTER of WORD) {
    if (!actual_cell.equals(COMMON_CELL)) {
      //console.log(LETTER, 'LETTER');
      drawLetter(LETTER, actual_cell);

      active_cells.push(actual_cell.copy());
    }
    word_cells.push(actual_cell.copy());
    actual_cell.add(CELL_MOVEMENT);
  }

  cells_per_word[WORD] = word_cells;
  words_angles[WORD] = WORD_ANGLES;
  drawed_words.push(WORD);
  words_to_extend.push(WORD); // ** DESCOMENTAR ESTO DESPUES.
  console.log(WORD, '[successfully drawed]');
  console.log('');
}

/*
Creates, positions and sets the input html.
*/
function drawLetter(LETTER, CELL) {
  const CELL_POS = p5.Vector.add(
    BASE_CELL_POS, p5.Vector.mult(CELL, CELL_SIZE));


  const INP = createInput(LETTER);
  INP.position(CELL_POS.x, CELL_POS.y);
  INP.size(INPUT_SIZE_HTML, INPUT_SIZE_HTML);
  INP.input(inputManager);
}

/*
How does the input manage the entry data.
*/
function inputManager() {
  let word = this.value();
  if (word.length == 0) {
    word = '';
  } else {
    this.value(word[0].toUpperCase());
  }
  console.log(word);
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














/**

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

*/