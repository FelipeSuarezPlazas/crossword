

// -------------------------------------------------------------- ALPHABET SOUP.

new p5();

// -------------------------------------------------------------- VARS.

const CANVAS_SIZE = createVector(500, 800);


const DESCRIPTIONS = {
  'apartment': 'A set of rooms for someone to live in on one level of a building or house', 
  'glass': 'A hard, clear substance that objects such as windows and bottles are made of', 
  'keyboard': 'A set of keys on a computer that you press to make it work, or the rows of keys on a piano', 
  'mac': 'Computer made by apple', 
  'microsoft': 'The largest vendor of computer software in the world. It is also a leading provider of cloud computing services, video games, computer, etc...',
  'apple': 'A hard, round fruit with a green or red skin', 
  'pencil': 'A long, thin wooden object with a black or coloured point that you write or draw with', 
  'tablet': 'A small, round thing containing medicine that you swallow', 
  'light': 'The brightness that shines from the sun, from fire, or from an object, allowing you to see things', 
  'tennis': 'A sport in which two or four people hit a small ball to each other over a net', 
  'clothes': 'Things such as shirts and trousers that you wear on your body',
  'screen': 'The part of a television or computer that shows images or writing', 
  'human': 'A man, woman, or child', 
  'portfolio': 'A collection of drawings, documents, etc. that represent a person’s, especially an artist’s, work', 
  'discover': 'To find something or get information about something for the first time', 
  'fish': 'An animal that lives only in water',
  'sushi': 'A type of Japanese food consisting of squares or balls of cold boiled rice, with small pieces of other food, especially raw fish, on top or rolled inside',
  'scissors': 'A tool for cutting paper, hair, etc. that you hold in your hand and that has two blades',
  'room': 'A part of the inside of a building that is separated from other parts by walls, floors, and ceilings', 
  'layer': 'something that covers a surface, or something that is between two things', 
  'crazy': 'stupid or strange', 
  'sword': 'A weapon with a long metal blade and a handle, used especially in the past', 
  'helmet': 'A hard hat that protects your head', 
  'charger': 'A piece of equipment used for putting electricity in a battery', 
  'internet': 'A worldwide system of computer networks used to exchange information',
  'league': 'A group of teams that compete against each other in a sport', 
  'videogame': 'A game that involves controlling images on a computer or TV screen', 
  'water': 'The clear liquid that falls from the sky as rain and that is in seas, lakes, and rivers', 
  'gun': 'A weapon that you fire bullets out of', 
  'clock': 'A piece of equipment that shows you what time it is', 
  'danger': 'The possibility that someone will be harmed or killed', 
  'mouse': 'A small animal with fur and a long, thin tail',
  'alphabet': 'A set of letters used for writing a language', 
  'fork': 'A small tool with three or four points and a handle, used to eat with', 
  'movie': 'A story that is shown in moving pictures on a screen, usually at a cinema or on television', 
  'theater': 'A place where plays are performed', 
  'animal': 'Anything that lives and moves, including people, birds, etc.', 
  'kitchen': 'A room used to prepare and cook food in',
  'programming': 'The activity of writing computer programs', 
  'sublime': 'Extremely good, beautiful, or enjoyable', 
  'awesome': 'Very big or special and making you feel respect, admiration, or fear', 
  'wisdom': 'The ability to use your knowledge and experience to make good decisions', 
  'character': 'The qualities that make one person or thing different from another',
  'luxury': 'Very expensive and beautiful things', 
  'netflix': 'Very famous platform to watch online movies',
  'suitcase': 'A rectangular case with a handle that you use for carrying clothes when you are travelling', 
  'store': 'A building or part of a building where you can buy things', 
  'street': 'A road in a town or city that has houses or other buildings',
  'gorgeous': 'Very beautiful or pleasant', 
  'cute': '(Especially of something or someone small or young) pleasant and attractive', 
  'tokyo': 'Capital city of Japan', 
  'anime': 'Japanese films made using characters and images that are drawn rather than real, or one of these films', 
  'picture': 'A drawing, painting, or photograph of something or someone', 
  'wood': 'The hard material that trees are made of', 
  'dollar': 'The unit of money used in the US, Canada, and some other countries. The symbol is $.',
  'murder': 'The crime of killing someone', 
  'bulldozer': 'A heavy vehicle with a large blade in front, used for pushing earth and stones away and for making areas of ground flat at the same time', 
  'technology': 'Knowledge, equipment, and methods that are used in science and industry', 
  'blockchain': 'A system used to make a digital record of all the occasions a cryptocurrency (= a digital currency such as bitcoin) is bought or sold, and that is constantly growing as more blocks are added', 
  'bitcoin': 'A brand name for a type of cryptocurrency (= a digital currency that is produced by a public network rather than any government and uses special codes to keep it secure)',
  'brick': 'A rectangular block of hard material used for building walls and houses', 
  'design': 'To make or draw plans for something, for example clothes or buildings', 
  'thinking': 'The activity of using your mind to consider something:', 
  'universe': 'Everything that exists, especially all physical matter, including all the stars, planets, galaxies, etc. in space:', 
  'parody': 'Writing, music, art, speech, etc. that intentionally copies the style of someone famous or copies a particular situation, making the features or qualities of the original more noticeable in a way that is humorous', 
  'question': 'A sentence or phrase used to find out information',
  'answer': 'A reaction to a question, letter, phone call, etc...', 
  'contemporary': 'Existing or happening now, and therefore seeming modern', 
  'travel': 'To make a journey, usually over a long distance:', 
  'banquet': 'A large formal meal for many people, often followed by speeches in honour of someone:',
}

let words = Object.keys(DESCRIPTIONS).map(WORD => {
  return WORD.toUpperCase();
  //console.log(WORD);
})

const BASE_CELL = createVector(0,0);
let base_cell_pos = createVector(0, 0);
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

const WORD_AUTOFILL_PERCENTAGE_LIMITS = {min: .3, max: .5};


let cell_inputs = {};


let words_data = {};
let next_input_id = '';


let words_input_values = {};


/* TAREAS POR HACER.

***** ALERTA POSIBLE BUG
si una palabra tiene más de 10 digitos
el input manager podria fallar.

*/

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
  //drawBorder();
  crossword()
}

function crossword() {
  const RANDOM_INDEX = randomInt(words.length);
  const RANDOM_WORD = words[RANDOM_INDEX];
  words.splice(RANDOM_INDEX, 1);
  setWordData(RANDOM_WORD, BASE_CELL, {'ORIENTATION': 'HORIZONTAL', 'DIRECTION': 'STRAIGHT'}, createVector(1000, 1000));

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
    const PLUGGABLE_WORDS_DATA = getPluggableWords(WORD, FIND_LETTER_TRIES, FIND_PLUGGABLE_WORD_TRIES);
    const LIMIT_WORDS_ACHIVED = setPluggableWordsData(PLUGGABLE_WORDS_DATA);
    if (LIMIT_WORDS_ACHIVED) break;
  }

  setBaseCellPos();
  fillWordsInputValues();
  drawCrossword();
  drawDescriptions();
}

function fillWordsInputValues() {
  const WORDS_DATA_KEYS = Object.keys(words_data);
  let word_letters_array = [];
  for (const WORD of WORDS_DATA_KEYS) {
    for (const LETTER of WORD) {
      word_letters_array.push('.');
    }
    words_input_values[WORD] = word_letters_array;
    word_letters_array = [];
  }
}

function setBaseCellPos() {
  let smallest_cell = createVector(0,0);
  for (const ACTIVE_CELL of active_cells) {
    if (ACTIVE_CELL.x < smallest_cell.x) {
      smallest_cell.x = ACTIVE_CELL.x;
    }

    if (ACTIVE_CELL.y < smallest_cell.y) {
      smallest_cell.y = ACTIVE_CELL.y;
    }
  }

  const SMALLEST_CELL_POS = createVector(50, 50);
  const POSITIVE_SMALLEST_CELL = createVector(Math.abs(smallest_cell.x), Math.abs(smallest_cell.y));

  const DISTANCE_BETWEEN_SMALLEST_AND_BASE = p5.Vector.mult(POSITIVE_SMALLEST_CELL, CELL_SIZE);

  base_cell_pos = p5.Vector.add(SMALLEST_CELL_POS, DISTANCE_BETWEEN_SMALLEST_AND_BASE);
}

function drawDescriptions() {
  function li(TEXT) {
    return '<li>' + TEXT + '</li>';
  }


  // donde tengo la lista de palabras?
  // en words_data

  const WORDS_DATA_KEYS = Object.keys(words_data);


  let description_texts = '';
  WORDS_DATA_KEYS.forEach((WORD) => {
    const TEXT = DESCRIPTIONS[WORD.toLowerCase()];
    description_texts += li(TEXT+'.');
  });



  let ol = createElement('ol', description_texts);



  //where is it positioned?
  // el cell que esta más abajo mas un margen.

  let lowest_cell = createVector(0,0);
  for (const ACTIVE_CELL of active_cells) {
    if (ACTIVE_CELL.y > lowest_cell.y) {
      lowest_cell.y = ACTIVE_CELL.y;
    }
  }

  const DISTANCE_BETWEEN_LOWEST_AND_BASE = p5.Vector.mult(lowest_cell, CELL_SIZE);

  const DESCRIPTION_POS = p5.Vector.add(base_cell_pos, DISTANCE_BETWEEN_LOWEST_AND_BASE);

  const DESCRIPTION_TOP_MARGIN = 50;

  ol.position(0,DESCRIPTION_POS.y+DESCRIPTION_TOP_MARGIN);
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
      const OPPOSITE_WORD_ORIENTATION = OPPOSITE_ANGLES.ORIENTATIONS[words_data[WORD].ANGLES.ORIENTATION];
      const SELECTED_LETTER_CELL = words_data[WORD].CELLS[SELECTED_LETTER_INDEX]

      console.log(words_angles[WORD], '[word angles]');


      /*
      If found a word, now lets try fitting it in all the possible
      ways, if it contains this letter repeated times, then lets
      try them too, just in case it overflows other words.
      */
      for (const REPEATED_LETTER_INDEX of PLUGGABLE_WORD_REPEATED_LETTER_INDEXES) {
        //try fitting the word in both directions.
        // la direccion debo hacerla aleatoria.
        let random_directions = ANGLES.DIRECTIONS.slice();
        // necesito un random de 0 a uno
        const RANDOM_DIRECTION_INDEX = randomInt(random_directions.length);
        const poped_direction = random_directions.splice(RANDOM_DIRECTION_INDEX, 1);
        random_directions.push(poped_direction);

        for (const ACTUAL_DIRECTION of random_directions) {
          const [FIT_SUCCESS, START_CELL, PLUGGABLE_WORD_ANGLES, CELL_MOVEMENT] = checkFittingPluggableWord(PLUGGABLE_WORD,OPPOSITE_WORD_ORIENTATION,ACTUAL_DIRECTION, SELECTED_LETTER_CELL, REPEATED_LETTER_INDEX);



          /*
          If the word fits, then lets draw it :)
          Lets count here the number of words that can be drawed
          and return if we reach that number.
          */
          if (FIT_SUCCESS) { 
            console.log('********* SUCCESS ' + PLUGGABLE_WORD + '*********');
            words.splice(words.indexOf(PLUGGABLE_WORD), 1);

            pluggable_words[PLUGGABLE_WORD] = {'START_CELL': START_CELL.copy(), 'ANGLES': PLUGGABLE_WORD_ANGLES, 'CONNECTION_CELL': SELECTED_LETTER_CELL.copy()}
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

function setPluggableWordsData(PLUGGABLE_WORDS) {
  console.log('');
  console.log('(setPluggableWordsData)');
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

    setWordData(PLUGGABLE_WORD, PLUGGABLE_WORD_DATA.START_CELL, PLUGGABLE_WORD_DATA.ANGLES, PLUGGABLE_WORD_DATA.CONNECTION_CELL);
  }

  return limit_words_achived;
}

function setWordData(WORD, START_CELL, WORD_ANGLES, CONNECTION_CELL) {
  const CELL_MOVEMENT = CELL_MOVEMENTS[WORD_ANGLES.ORIENTATION][WORD_ANGLES.DIRECTION];
  let actual_cell = START_CELL.copy();
  word_cells = [];

  for (const LETTER of WORD) {
    word_cells.push(actual_cell.copy());
    active_cells.push(actual_cell.copy());
    actual_cell.add(CELL_MOVEMENT);
  }

  words_data[WORD] = {
    CELLS: word_cells,
    CONNECTION_CELL: CONNECTION_CELL,
    ANGLES: WORD_ANGLES,
    INDEX: limit_words_counter+1,
  }

  words_to_extend.push(WORD);
  console.log(WORD, '[set word data successfully]');
  console.log('');
}

function drawCrossword() {
  console.log('');
  console.log('(drawCrossword)');
  console.log(Object.keys(words_data));

  const WORDS_DATA_KEYS = Object.keys(words_data);

  for (const WORD of WORDS_DATA_KEYS) {
    const WORD_DATA = words_data[WORD]
    

    drawWord(WORD, WORD_DATA.CELLS, WORD_DATA.ANGLES, WORD_DATA.CONNECTION_CELL);
  }


  function drawWord(WORD, CELLS, WORD_ANGLES, CONNECTION_CELL) {
    let word_array = [];
    for (const LETTER of WORD) word_array.push(LETTER);
    const WORD_INDEXES_FOR_AUTOFILL = getIndexesForAutofill(word_array);

    CELLS.forEach((CELL, CELL_INDEX) => {
      const LETTER = WORD[CELL_INDEX];
      const AUTOFILL = WORD_INDEXES_FOR_AUTOFILL.includes(CELL_INDEX) ? true : false;

      const CELL_POS = p5.Vector.add(
        base_cell_pos, p5.Vector.mult(CELL, CELL_SIZE));


      let input;
      const ID_OR_CLASS = WORD + CELL_INDEX
      const CELL_ID = CELL.x+''+CELL.y;

      if (!CELL.equals(CONNECTION_CELL)) {
        input = drawLetter(LETTER, CELL_POS, AUTOFILL);
        input.id(ID_OR_CLASS);
        if (AUTOFILL) {
          words_input_values[WORD][CELL_INDEX] = LETTER;
          document.getElementById(ID_OR_CLASS).disabled = true;
        }
        cell_inputs[CELL_ID] = input;
      } else {
        words_input_values[WORD][CELL_INDEX] = LETTER;
        input = cell_inputs[CELL_ID];
        input.class(ID_OR_CLASS);
      }

      if (CELL_INDEX == 0) {
        drawBeginningIndicator(WORD, CELL_POS, WORD_ANGLES);
      }
    })

    console.log(WORD, '[successfully drawed]');
    console.log('');

    function drawBeginningIndicator(WORD, CELL_POS, WORD_ANGLES) {
      // este span solo se dibuja en la primera letra
      let SPAN = createSpan(words_data[WORD].INDEX);

      // AHORA NO LA POSICIONES ENCIMA, SINO DETRAS
      // A CONTRA DIRECCIÓN.
      const BACK_MOVEMENT_AMOUNTS = {
        [ANGLES.ORIENTATIONS[0]]: {
          [ANGLES.DIRECTIONS[0]]: createVector(30,4), 
          [ANGLES.DIRECTIONS[1]]: createVector(-9,4)},
        [ANGLES.ORIENTATIONS[1]]: {
          [ANGLES.DIRECTIONS[0]]: createVector(8,25), 
          [ANGLES.DIRECTIONS[1]]: createVector(8,-16)}
      }

      const BACK_MOVEMENT = CELL_MOVEMENTS[WORD_ANGLES.ORIENTATION][OPPOSITE_ANGLES.DIRECTIONS[WORD_ANGLES.DIRECTION]];
      const BACK_AMOUNT = BACK_MOVEMENT_AMOUNTS[WORD_ANGLES.ORIENTATION][OPPOSITE_ANGLES.DIRECTIONS[WORD_ANGLES.DIRECTION]];
      const BACK_POS = p5.Vector.add(BACK_MOVEMENT, BACK_AMOUNT);

      CELL_POS.add(BACK_POS);
      SPAN.position(CELL_POS.x,CELL_POS.y);
    }

    /*
    Creates, positions and sets the input html.
    */
    function drawLetter(LETTER, CELL_POS, AUTOFILL) {
      const INP = createInput(AUTOFILL ? LETTER : '');
      INP.position(CELL_POS.x, CELL_POS.y);
      INP.size(INPUT_SIZE_HTML, INPUT_SIZE_HTML);
      INP.input(inputManager);

      return INP;


      /*
      How does the input manage the entry data.
      */
      function inputManager() {
        /*
        This input can only have one uppercase letter.
        */
        let word = this.value();
        if (word.length == 0) {
          word = '';
        } else {
          this.value(word[word.length-1].toUpperCase());
        }
        // perfecto, este valor debo cambiarlo tambien en 
        // la lista, tengo el index y la palabra asi que no hay problema.
        console.log(word);

        //document.getElementById(this.id()).disabled = true;


        /*
        Based on the id, or class, focus the next word input and focus it.
        */
        let input_id;

        if (this.class() == next_input_id && next_input_id != '') {
          input_id = next_input_id;
        } else {
          input_id = this.id();
        }
        // ahora lo que quiero hacer, es que haga un loop
        // hasta que encuentra una proxima letra
        //a la cual hacerle focus. quiero que siga
        // y siga aumentando el numero hasta que cuadre.

        const LAST_NUM = input_id[input_id.length-1];
        for (let plus = 1; plus < input_id.length-2; plus++) {
          console.log(plus, 'plus');
          const NEXT_NUM = parseInt(LAST_NUM) + plus;
          next_input_id = input_id.replace(LAST_NUM, NEXT_NUM);
          console.log(next_input_id, 'next_input_id');

          let input = document.getElementById(next_input_id);
          if (input != null && !input.disabled) {
            input.focus();
            console.log('id');
            break;
          } else {
            input = document.getElementsByClassName(next_input_id)[0];
            if (input != null && !input.disabled) {
              input.focus();
              console.log('class');
              break;
            }
          }
        }



        { // DISABLE INPUTS IF THE VALUES ARE CORRECT.

          // si este input tiene un id y una clase
          // ambos hay que ponerlos
          const IDENTIFIERS = [this.id(), this.class()]
          IDENTIFIERS.forEach((IDENTIFIER, IDENTIFIER_INDEX) => {
            if (IDENTIFIER != '' && IDENTIFIER != null) {
              console.log(IDENTIFIER, 'IDENTIFIER');
              let word = IDENTIFIER.slice(0, -1);
              let word_index = IDENTIFIER[IDENTIFIER.length-1];
              //console.log(word, word_index, '---------*-*-*-*-*----');
              words_input_values[word][word_index] = this.value();


              let united_word = '';
              for (const LETTER of words_input_values[word]) {
                united_word += LETTER;
              }

              console.log(word);
              console.log(united_word);
              console.log(united_word == word);
              if (united_word == word) {
                // disable all the inputs.
                let index = 0;
                for (const LETTER of word) {
                  // esto depende de si la letra tiene id y tambien classe.
                  let input = document.getElementById(word+index);
                  if (input != null) {
                    input.disabled = true;
                  } else {
                    input = document.getElementsByClassName(word+index)[0];
                    if (input != null) {
                      input.disabled = true;
                    }
                  }
                  index++;
                }
              }
            }
          })
        }
      }
    }

    function getIndexesForAutofill(WORD_ARRAY) {
      let word_indexes_for_autofill = []
      WORD_ARRAY.forEach((LETTER, INDEX) => {
        word_indexes_for_autofill.push(INDEX);
      })

      console.log(word_indexes_for_autofill, '**************************************************************************************************************************');

      const RANDOM_AUTOFILL_PERCENTAGE = random(WORD_AUTOFILL_PERCENTAGE_LIMITS.min, WORD_AUTOFILL_PERCENTAGE_LIMITS.max);
      const WORD_LETTER_AMOUNT_AUTOFILL_BY_PERCENTAGE = Math.floor((WORD.length-1) * RANDOM_AUTOFILL_PERCENTAGE);

      console.log(RANDOM_AUTOFILL_PERCENTAGE, WORD_LETTER_AMOUNT_AUTOFILL_BY_PERCENTAGE, '**************************************************************************************************************************');


      let autofill_counter = 0;
      while (autofill_counter < (WORD.length-1) - WORD_LETTER_AMOUNT_AUTOFILL_BY_PERCENTAGE) {
        const RANDOM_INDEX = randomInt(word_indexes_for_autofill.length);
        word_indexes_for_autofill.splice(RANDOM_INDEX, 1);
        autofill_counter++;
      }
      console.log(word_indexes_for_autofill, '**************************************************************************************************************************');

      return word_indexes_for_autofill;
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