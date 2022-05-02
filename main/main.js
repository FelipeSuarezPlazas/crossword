

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

const ANGLES = {
  'ORIENTATIONS': ['HORIZONTAL', 'VERTICAL'],
  'DIRECTIONS': ['STRAIGHT', 'REVERSED'],
}

const OPPOSITE_ANGLES = {
  'ORIENTATIONS': {
    [ANGLES.ORIENTATIONS[0]]: ANGLES.ORIENTATIONS[1],
    [ANGLES.ORIENTATIONS[1]]: ANGLES.ORIENTATIONS[0],
  },
  'DIRECTIONS': {
    [ANGLES.DIRECTIONS[0]]: ANGLES.DIRECTIONS[1],
    [ANGLES.DIRECTIONS[1]]: ANGLES.DIRECTIONS[0],
  },
}

const CELL_MOVEMENTS = {
  [ANGLES.ORIENTATIONS[0]]: {
    [ANGLES.DIRECTIONS[0]]: createVector(1,0), 
    [ANGLES.DIRECTIONS[1]]: createVector(-1,0)},
  [ANGLES.ORIENTATIONS[1]]: {
    [ANGLES.DIRECTIONS[0]]: createVector(0,1), 
    [ANGLES.DIRECTIONS[1]]: createVector(0,-1)}
}


let active_cells = [];
let cells_per_word = {};
let words_angles = [];
let words_to_extend = [];

//let mouse = createVector(0, 0);

const LIMIT_WORDS = 8;
let limit_words_counter = 0;



// -------------------------------------------------------------- FUNCTIONS.


function setup() {
  const CNV = createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
  CNV.parent('canva-game');

  //frameRate(30);
  restartGame();
}

function restartGame() {
  drawBorder();
  crossword()
}

function crossword() {
  drawWord('CROSSWORD', BASE_CELL, {'ORIENTATION': 'HORIZONTAL', 'DIRECTION': 'STRAIGHT'}, createVector(1000, 1000));

  for (WORD of words_to_extend) {
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log(WORD, 'WORD');
    console.log('');
    

    const FIND_LETTER_TRIES = 6;
    const FIND_PLUGGABLE_WORD_TRIES = 20;
    const PLUGGABLE_WORDS = getPluggableWords(WORD, FIND_LETTER_TRIES, FIND_PLUGGABLE_WORD_TRIES);
    const LIMIT_WORDS_ACHIVED = drawPluggableWords(PLUGGABLE_WORDS);
    if (LIMIT_WORDS_ACHIVED) break;
  }
}

function getPluggableWords(WORD, FIND_LETTER_TRIES, FIND_PLUGGABLE_WORD_TRIES) {



  let pluggable_words = {};
  let selected_indexes = [];
  
  /*
  try random letters of this word and check if we can use them
  with a crucigrama algorithm, *(not all the letters can be used).
  */
  for (let a=0; a < FIND_LETTER_TRIES; a++) {
    console.log('********** TRY (' + a + '/' + FIND_LETTER_TRIES + ') **********');
    const [LETTER_SUCCESS, SELECTED_LETTER, SELECTED_LETTER_INDEX] = tryGettingRandomValidLetter(WORD, selected_indexes);
    if (!LETTER_SUCCESS) continue;



    /*
    Look for a word that can be plugged in with the selected letter
    */
    get_target_word_loop:
    for (let b=0; b < FIND_PLUGGABLE_WORD_TRIES; b++) {
      const [PLUGGABLE_WORD_SUCCESS, PLUGGABLE_WORD, PLUGGABLE_WORD_REPEATED_LETTER_INDEXES] =tryGettingRandomValidPluggableWord(SELECTED_LETTER)
      if (!PLUGGABLE_WORD_SUCCESS) continue;
      

      selected_indexes.push(SELECTED_LETTER_INDEX);
      const OPPOSITE_WORD_ORIENTATION = OPPOSITE_ANGLES.ORIENTATIONS[words_angles[WORD].ORIENTATION];
      const SELECTED_LETTER_CELL = cells_per_word[WORD][SELECTED_LETTER_INDEX]

      console.log(words_angles[WORD], '[word angles]');


      /*
      If found a word, now lets try fitting it in all the possible
      ways, if it contains this letter repeated times, then lets
      try them too, just in case it overflows other words.
      */
      for (const REPEATED_LETTER_INDEX of PLUGGABLE_WORD_REPEATED_LETTER_INDEXES) {
        //try fitting the word in both directions.
        for (const ACTUAL_DIRECTION of ANGLES.DIRECTIONS) {
          const [FIT_SUCCESS, START_CELL, PLUGGABLE_WORD_ANGLES, CELL_MOVEMENT] = checkFittingPluggableWord(PLUGGABLE_WORD,OPPOSITE_WORD_ORIENTATION,ACTUAL_DIRECTION, SELECTED_LETTER_CELL, REPEATED_LETTER_INDEX);



          /*
          If the word fits, then lets draw it :)
          Lets count here the number of words that can be drawed
          and return if we reach that number.
          */
          if (FIT_SUCCESS) { 
            console.log('********* SUCCESS ' + PLUGGABLE_WORD + '*********');
            words.splice(words.indexOf(PLUGGABLE_WORD), 1);

            pluggable_words[PLUGGABLE_WORD] = {'START_CELL': START_CELL.copy(), 'WORD_ANGLES': PLUGGABLE_WORD_ANGLES, 'CONNECTION_CELL': SELECTED_LETTER_CELL.copy()}
            break get_target_word_loop;
          }
        }
      }
    }
  }

  return pluggable_words;

  function tryGettingRandomValidLetter(WORD, SELECTED_INDEXES) {
    let success = true;
    const RANDOM_INDEX = randomInt(WORD.length);
    const SELECTED_LETTER = WORD[RANDOM_INDEX];
    
    if (SELECTED_INDEXES.includes(RANDOM_INDEX)) success = false;
    for (const INDEX of SELECTED_INDEXES) {
      // If the letters are too close the letter is nos valid.
      if (Math.abs(RANDOM_INDEX - INDEX) == 1) {
        success = false
        break;
      }
    }
    
    console.log(SELECTED_INDEXES.length, '[selected indexes length]');
    console.log(RANDOM_INDEX, '[random index]');
    console.log(SELECTED_LETTER, '[selected letter]');

    return [success, SELECTED_LETTER, RANDOM_INDEX];
  }

  function tryGettingRandomValidPluggableWord(SELECTED_LETTER) {

    let success = true;
    const PLUGGABLE_WORD = random(words);
    let letter_indexes;

    if (PLUGGABLE_WORD.includes(SELECTED_LETTER)) {
      letter_indexes = getLetterIndexes(PLUGGABLE_WORD, SELECTED_LETTER);
      console.log(letter_indexes.length, '[common letters]')
    } else {
      success = false;
    }


    console.log(PLUGGABLE_WORD, '[plugabble word]');

    return [success, PLUGGABLE_WORD, letter_indexes];

    function getLetterIndexes(WORD, LETTER) {
      /*
      Takes a word and a letter, and returns a list of indexes
      where the letter is in the word. 
      */
      let indexes = [];
      let word_array = [];

      for (const L of WORD) word_array.push(L);

      indexes = word_array
        .map((L, INDEX) => {if (L == LETTER) return INDEX})
        .filter(INDEX => INDEX != undefined);

      return indexes;
    }
  }

  function checkFittingPluggableWord(PLUGGABLE_WORD, OPPOSITE_ORIENTATION, ACTUAL_DIRECTION, CONNECTION_CELL, LETTER_INDEX) {
    let success = true

    const INVERSE_CELL_MOVEMENT = CELL_MOVEMENTS[OPPOSITE_ORIENTATION][ACTUAL_DIRECTION];
    const START_CELL = p5.Vector.add(CONNECTION_CELL, p5.Vector.mult(INVERSE_CELL_MOVEMENT, LETTER_INDEX))
    
    const PLUGGABLE_WORD_ANGLES = {'ORIENTATION': OPPOSITE_ORIENTATION, 'DIRECTION': OPPOSITE_ANGLES.DIRECTIONS[ACTUAL_DIRECTION]}
    const CELL_MOVEMENT = CELL_MOVEMENTS[PLUGGABLE_WORD_ANGLES.ORIENTATION][PLUGGABLE_WORD_ANGLES.DIRECTION];

    console.log(OPPOSITE_ORIENTATION, '[opposite word orientation]');
    console.log(ACTUAL_DIRECTION, '[random direction]');

    console.log(CELL_MOVEMENT, '[random word cell movement]');
    console.log(LETTER_INDEX, '[repeated letter index]');



    let actual_cell = START_CELL.copy();
    console.log(PLUGGABLE_WORD_ANGLES, 'PLUGGABLE_WORD_ANGLES');
    let PLUGGABLE_OPPOSITE_ORIENTATION = OPPOSITE_ANGLES.ORIENTATIONS[PLUGGABLE_WORD_ANGLES.ORIENTATION];
    console.log(PLUGGABLE_WORD_ANGLES.ORIENTATION, PLUGGABLE_OPPOSITE_ORIENTATION, 'PLUGGABLE_OPPOSITE_ORIENTATION****')
    let word_letter_counter = 0;

    /*
    Check each one of the letter cells where this word is going to be.
    */
    random_word_letter_loop:
    for (const LETTER of PLUGGABLE_WORD) {


      /*
      Iterate over all the active cells (not available cells)
      to compare in an appropiate way.
      */
      for (const ACTIVE_CELL of active_cells) {

        /*
        If the actual cell is the common cell (connection cell)
        then no comparison is neccessary, we can avoid it.
        */
        if (!actual_cell.equals(CONNECTION_CELL)) {

          /*
          checks that the cell where this letter 
          is going to be is available. 
          */
          if (actual_cell.equals(ACTIVE_CELL)) {
            success = false;
            break random_word_letter_loop;
          }


          /*
          checks that the cells around the actual cell are availables
            *(in the oposite orientation).
          */
          for (const DIRECTION of ANGLES.DIRECTIONS) {
            let OPPOSITE_ORIENTATION_MOVEMENT = CELL_MOVEMENTS[PLUGGABLE_OPPOSITE_ORIENTATION][DIRECTION];

            const ACTUAL_CELL_AROUND_CHECKER = p5.Vector.add(actual_cell, OPPOSITE_ORIENTATION_MOVEMENT);

            if (ACTUAL_CELL_AROUND_CHECKER.equals(ACTIVE_CELL)) {
              success = false;
              break random_word_letter_loop;
            }
          }
        }


        /*
        If this is the first or the last cell,
        then check to continuos cells, they must be available too.
        */
        if (word_letter_counter == 0) {
          const OPPOSITE_DIRECTION = OPPOSITE_ANGLES.DIRECTIONS[PLUGGABLE_WORD_ANGLES.DIRECTION];
          const OPPOSITE_MOVEMENT = CELL_MOVEMENTS[PLUGGABLE_WORD_ANGLES.ORIENTATION][OPPOSITE_DIRECTION];

          const CELL_IN_OPPOSITE_DIRECTION = p5.Vector.add(actual_cell, OPPOSITE_MOVEMENT);
          if (CELL_IN_OPPOSITE_DIRECTION.equals(ACTIVE_CELL)) {
            success = false;
            break random_word_letter_loop;
          }

        } else if (word_letter_counter == PLUGGABLE_WORD.length-1) {
          const FOLLOWING_CELL = p5.Vector.add(actual_cell, CELL_MOVEMENT);
          if (FOLLOWING_CELL.equals(ACTIVE_CELL)) {
            success = false;
            break random_word_letter_loop;
          }
        }
      }

      actual_cell.add(CELL_MOVEMENT);
      word_letter_counter++;
    }

    return [success, START_CELL, PLUGGABLE_WORD_ANGLES, CELL_MOVEMENT];
  }
}

function drawPluggableWords(PLUGGABLE_WORDS) {
  console.log('');
  console.log('(drawPluggableWords)');
  console.log(Object.keys(PLUGGABLE_WORDS));
  
  let limit_words_achived = false

  const PLUGGABLE_WORDS_KEYS = Object.keys(PLUGGABLE_WORDS);
  for (const PLUGGABLE_WORD of PLUGGABLE_WORDS_KEYS) {
    const PLUGGABLE_WORD_DATA = PLUGGABLE_WORDS[PLUGGABLE_WORD]
    if (limit_words_counter == LIMIT_WORDS-1) {
      limit_words_achived = true;
      return limit_words_achived;
    }
    limit_words_counter++;

    drawWord(PLUGGABLE_WORD, PLUGGABLE_WORD_DATA.START_CELL, PLUGGABLE_WORD_DATA.WORD_ANGLES, PLUGGABLE_WORD_DATA.CONNECTION_CELL);
  }

  return limit_words_achived;
}

function drawWord(WORD, START_CELL, WORD_ANGLES, CONNECTION_CELL) {
  const CELL_MOVEMENT = CELL_MOVEMENTS[WORD_ANGLES.ORIENTATION][WORD_ANGLES.DIRECTION];

  let word_cells = [];
  let actual_cell = START_CELL.copy();

  for (LETTER of WORD) {
    if (!actual_cell.equals(CONNECTION_CELL)) {
      //console.log(LETTER, 'LETTER');
      drawLetter(LETTER, actual_cell);

      active_cells.push(actual_cell.copy());
    }
    word_cells.push(actual_cell.copy());
    actual_cell.add(CELL_MOVEMENT);
  }

  cells_per_word[WORD] = word_cells;
  words_angles[WORD] = WORD_ANGLES;
  words_to_extend.push(WORD);
  console.log(WORD, '[successfully drawed]');
  console.log('');

  function drawLetter(LETTER, CELL) {
    /*
    Creates, positions and sets the input html.
    */
    const CELL_POS = p5.Vector.add(
      BASE_CELL_POS, p5.Vector.mult(CELL, CELL_SIZE));


    const INP = createInput(LETTER);
    INP.position(CELL_POS.x, CELL_POS.y);
    INP.size(INPUT_SIZE_HTML, INPUT_SIZE_HTML);
    INP.input(inputManager);
    
    function inputManager() {
      /*
      How does the input manage the entry data.
      */
      let word = this.value();
      if (word.length == 0) {
        word = '';
      } else {
        this.value(word[0].toUpperCase());
      }
      console.log(word);
    }
  }
}

function drawBorder() {
  // line between soup and WORDS.
  const LM = 2;
  line(LM, LM, CANVAS_SIZE.x, LM);
  line(LM, LM, LM, CANVAS_SIZE.y);
  line(CANVAS_SIZE.x-LM, LM, CANVAS_SIZE.x-LM, CANVAS_SIZE.y-LM);
  line(LM, CANVAS_SIZE.y-LM, CANVAS_SIZE.x-LM, CANVAS_SIZE.y-LM);
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