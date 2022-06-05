























let active_cells = [];
let cells_per_word = {};
let words_angles = [];
let words_to_extend = [];

const WORD_AUTOFILL_PERCENTAGE_LIMITS = {min: .2, max: .4};


let cell_inputs = {};


let words_data = {};
let next_input_id = '';


let words_input_values = {};


/* TAREAS POR HACER.

***** ALERTA POSIBLE BUG
si una palabra tiene más de 10 digitos
el input manager podria fallar.

Porbabilidad de 0 no funciona.


QUIERO RODEAR EL CRUCIGRAMA CON UN BORDE MORADO.

*/

//let mouse = createVector(0, 0);

const LIMIT_WORDS = 12;
let limit_words_counter = 0;













function crossword() {
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

  fillWordsInputValues();
  drawCrossword();
  drawDescriptions();
}

function draw() {
  if (active_cells.length <= 0) return;

  let lowest_cell = createVector(0,0);
  for (const ACTIVE_CELL of active_cells) {
    if (ACTIVE_CELL.x > lowest_cell.x) {
      lowest_cell.x = ACTIVE_CELL.x;
    }
  }

  for (const ACTIVE_CELL of active_cells) {
    if (ACTIVE_CELL.y > lowest_cell.y) {
      lowest_cell.y = ACTIVE_CELL.y;
    }
  }

  const DISTANCE_BETWEEN_LOWEST_AND_BASE = p5.Vector.mult(lowest_cell, CELL_SIZE);

  const DESCRIPTION_POS = p5.Vector.add(base_cell_pos, DISTANCE_BETWEEN_LOWEST_AND_BASE);

  const DESCRIPTION_TOP_MARGIN = 80;

  stroke('#bf94e4');
  stroke('#eed202'); // yellow
  stroke('#734f96'); // purple
  strokeWeight(1);
  fill('white');
  rect(5,5,DESCRIPTION_POS.x+50,DESCRIPTION_POS.y+50,25);
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
    if (ACTIVE_CELL.x > lowest_cell.x) {
      lowest_cell.x = ACTIVE_CELL.x;
    }
  }

  const DISTANCE_BETWEEN_LOWEST_AND_BASE = p5.Vector.mult(lowest_cell, CELL_SIZE);

  const DESCRIPTION_POS = p5.Vector.add(base_cell_pos, DISTANCE_BETWEEN_LOWEST_AND_BASE);

  const DESCRIPTION_TOP_MARGIN = 80;

  ol.position(DESCRIPTION_POS.x+DESCRIPTION_TOP_MARGIN, 50);
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