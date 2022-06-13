




/*








Esta aplicacion costa de dos secciones

#1 Una Grid en la que se encuentran todos los inputs.
#2 Un <ol> que contiene todas las descripciones.


Cada Input tiene:
	Un HTML input text.
	Una letra.
	Una posicion en la grid.
	Un Id.
	Ids predecesores.
	Bool: is_done. // dehabilitado o habilirado


FINAL RESULT: List of inputs.







*/
class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(Other) {
		this.x += Other.x;
		this.y += Other.y;
		return new Vector(this.x, this.y)
	}

	sub(Other) {
		this.x -= Other.x;
		this.y -= Other.y;
		return new Vector(this.x, this.y)
	}

	mult(Other) {
		this.x *= Other.x;
		this.y *= Other.y;
		return new Vector(this.x, this.y)
	}

	div(Other) {
		this.x /= Other.x;
		this.y /= Other.y;
		return new Vector(this.x, this.y)
	}

	equals(Other) {
		let are_equals = false;
		if (this.x == Other.x && this. y == Other.y) {
			are_equals = true;
		}
		return are_equals;
	}

	copy() {
		return new Vector(this.x, this.y);
	}

	toString() {
		return 'x: ' + this.x + ', y: ' + this.y;
	}
}

class Angles {
	static ORIENTATIONS = ['HORIZONTAL', 'VERTICAL'];
	static DIRECTIONS = ['STRAIGHT', 'REVERSED'];

	static OPPOSITES = {
		ORIENTATIONS: {
			[this.ORIENTATIONS[0]]: this.ORIENTATIONS[1],
			[this.ORIENTATIONS[1]]: this.ORIENTATIONS[0],},
		DIRECTIONS: {
			[this.DIRECTIONS[0]]: this.DIRECTIONS[1],
			[this.DIRECTIONS[1]]: this.DIRECTIONS[0],},
	};

	static CELL_MOVEMENTS = {
		[this.ORIENTATIONS[0]]: {
			[this.DIRECTIONS[0]]: new Vector(1,0), 
			[this.DIRECTIONS[1]]: new Vector(-1,0)},
		[this.ORIENTATIONS[1]]: {
			[this.DIRECTIONS[0]]: new Vector(0,1), 
			[this.DIRECTIONS[1]]: new Vector(0,-1)}
	};

	static offset = '-10px';

	static MARKER_POSITIONS = {
		[this.ORIENTATIONS[0]]: {
			[this.DIRECTIONS[0]]: {'top': '0px', 'right': '', 'left': '0px', 'bottom': ''}, 
			[this.DIRECTIONS[1]]: {'top': '', 'right': '0px', 'left': '', 'bottom': '0px'}}, 
		[this.ORIENTATIONS[1]]: {
			[this.DIRECTIONS[0]]: {'top': '0px', 'right': '0px', 'left': '', 'bottom': ''}, 
			[this.DIRECTIONS[1]]: {'top': '', 'right': '', 'left': '0px', 'bottom': '0px'}},
	};

	constructor(ORIENTATION, DIRECTION) {
		this.orientation = ORIENTATION;
		this.direction = DIRECTION;
		this.movement = Angles.CELL_MOVEMENTS[this.orientation][this.direction];
		this.marker_position = Angles.MARKER_POSITIONS[this.orientation][this.direction];
	}

	getOpposite() {
		const OPPOSITE_ORIENTATION = Angles.OPPOSITES.ORIENTATIONS[this.orientation];
		const OPPOSITE_DIRECTION = Angles.OPPOSITES.DIRECTIONS[this.direction];

		return new Angles(OPPOSITE_ORIENTATION, OPPOSITE_DIRECTION);
	}

	static randomDirections() {
		// basically take Angles.DIRECTIONS and sort it ramdomly
    let random_directions = Angles.DIRECTIONS.slice();
    const RANDOM_DIRECTION_INDEX = random(random_directions.length);
    const poped_direction = random_directions.splice(RANDOM_DIRECTION_INDEX, 1);
    random_directions.push(poped_direction);
    return random_directions;
	}
}

class Marker {
	constructor(WORD, CELL) {
		this.container = document.createElement('div');
		this.container.setAttribute('class', 'empty-div');

		this.word = WORD;
		this.cell = CELL;
		this.marker = document.createElement('p');
		this.marker.setAttribute('class', 'markers');
		this.marker.innerHTML = 'A';
		//this.marker.style.textAlign = 'center';
		this.container.appendChild(this.marker);
	}

	setIndex(INDEX) {
		console.log('LOOOKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', INDEX, this.marker);
		this.marker.innerHTML = INDEX;
		//MARKER.marker.innerHTML = 'B';
		//console.log('LOOOKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', INDEX, this.marker);
	}
}

class Input {
	constructor(LETTER, CELL) {
		this.letter = LETTER;
		this.cell = CELL;
		this.ids = []; // Lista de objetos [{word: 'DESIGN', index: 4}, {word: 'GUN', index: 1}];
		this.container = document.createElement('div');
		this.container.style.position = 'relative';

		this.input = document.createElement('input');
		this.input.setAttribute('type', 'text');
		this.input.value = this.letter;
		this.input.disabled = true;
		this.container.appendChild(this.input);
	}

	addId(WORD, INDEX) {
		this.ids.push({word: WORD, index: INDEX});
	}
}


let crossword = {
	container: document.getElementById('crossword'),
	descriptions_container: document.getElementById('descriptions'),
	descriptions: {
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
	},
	words: [],

	copy_words: [],
	words_data: {}, // this is only for construction.
	words_to_extend: [],
	
	inputs: [],
	inputs_by_id: {},
	inputs_by_cell_id: {},
	active_cells: [],
	markers: [],
	markers_by_word: {},

	amount: 5,
	counter: 0,

	find_letter_tries: 6,
	find_pluggable_word_tries: 20,

	grid_dimentions: {columns: 0, rows: 0},
	grid_cell_size: '30px',

	setup: function() {
		this.words = Object.keys(this.descriptions).map(WORD => {
		  return WORD.toUpperCase();
		  //console.log(WORD);
		});

		this.restart();
	},
	restart: function() {
		this.copy_words = this.words.slice();
		this.words_data = [];
		this.words_to_extend = [];

		this.inputs_by_id = {};

		this.counter = 0;
	},
	__popRandomWord: function() {
		const RANDOM_INDEX = random(this.copy_words.length);
		const RANDOM__POPED_WORD = this.copy_words.splice(RANDOM_INDEX, 1)[0];
		return RANDOM__POPED_WORD;
	},
	__wordToCells: function(WORD, START_CELL, WORD_ANGLES) {
		let word_cells = [];

		const CELL_MOVEMENT = WORD_ANGLES.movement;
		let actual_cell = START_CELL.copy().sub(CELL_MOVEMENT);

		this.active_cells.push(actual_cell.copy());

		const MARKER = new Marker(WORD, actual_cell.copy());
		this.markers_by_word[WORD] = MARKER;
		this.markers.push(MARKER);

		actual_cell.add(CELL_MOVEMENT);

		for (const LETTER of WORD) {
			word_cells.push(actual_cell.copy());
			this.active_cells.push(actual_cell.copy());

			actual_cell.add(CELL_MOVEMENT);
		}

		return word_cells;
	},
	__saveWordData: function(WORD, WORD_CELLS, WORD_ANGLES, CONNECTION_CELL) {
	  this.words_data[WORD] = {
	    CELLS: WORD_CELLS,
	    CONNECTION_CELL: CONNECTION_CELL,
	    ANGLES: WORD_ANGLES,
	    INDEX: (this.counter + 1),
	  }
	},

	start: function() {
		// primero debemos seleccionar una palabra aleatorea de la lista de palabras.
		const WORD = this.__popRandomWord();
		const START_CELL = new Vector(0, 0);
		const CONNECTION_CELL = new Vector(1000, 1000);
		const WORD_ANGLES = new Angles(Angles.ORIENTATIONS[0], Angles.DIRECTIONS[0]);
		const WORD_CELLS = this.__wordToCells(WORD, START_CELL, WORD_ANGLES);

		this.__saveWordData(WORD, WORD_CELLS, WORD_ANGLES, CONNECTION_CELL);
		this.words_to_extend.push(WORD);


		for (const WORD of this.words_to_extend) {
		    console.log('');
		    console.log('');
		    console.log('');
		    console.log('');
		    console.log('');
		    console.log('');
		    console.log(WORD, 'WORD');
		    console.log('');
		    

		    const PLUGGED_WORDS_DATA = this.__plugWords(WORD);
		    this.__savePluggedWordsData(PLUGGED_WORDS_DATA);
		    if (this.counter == this.amount-1) break;
		}

		// LO IMPORTANTE ERA TENER WORDS_DATA CON LAS 5 PALABRAS Y YA ESTAN.

		console.log('WORDS DATA', this.words_data);
		this.__createInputs();
		this.__offsetCells();
		console.log('INPUTS', this.inputs);
		this.__createCssGrid();
		this.__offsetCellsGrid();
		this.__positionInputs();
		this.__positionMarkers();
		this.__setMarkersIndex();
		this.__fillGrid();
		this.__createDescriptions();
	},

	// -------- START
	__plugWords: function(WORD) {
		// *******connectors are 'letters' with two words******;
		console.log('__plugWords FUNCTION');
		console.log(this.active_cells.slice(), 'ACTIVE CELLSS PLEASE ---')

		let plugged_words_data = [];
		let active_connector_indexes = []; 

		const WORD_ANGLES = this.words_data[WORD].ANGLES;
    	let word_opposite_angles = WORD_ANGLES.getOpposite();

    	let word_successfully_suited;

		// ----- sequence1.
		let selected_connector_index = '';
		let selected_connector = '';
		let selected_connector_cell; // set in s2, but here for readability c:

		// ----- sequence2.
		let selected_word = '';
		// La palabra seleccionada puede tener el connector muchas veces.
		// ejemplo: si nuestro connector es 'a' y la palabra seleccionada es 'parar',
		// entonces esta lista contiene los siguientes indexes = [1, 3] c:
		let selected_word_repeated_connector_indexes = []; 

		// ----- sequence3.
		let actual_direction;
		let repeated_connector_index;

		// ----- sequence4.
		let selected_word_start_cell;
		let selected_word_angles;
		let actual_cell;
		let letter_index; // of the selected word :v

		  
		// try random letters of this word and check if we can use them
		// as connectors.
		function sequence1() {
			console.log('')
			console.log('')
			console.log('(secuence1)');
			for (let a=0; a < crossword.find_letter_tries; a++) {
		   	
		   	let success = true;

		   	console.log(WORD, WORD.length, '  WORD LENGTH');
		    const RANDOM_INDEX = random(WORD.length);
		    const RANDOM_LETTER = WORD[RANDOM_INDEX];

				/*
				Si el index aleatoreo ya lo escojio antes en esta misma palabra,
				pues no se puede volver a poner una palabra ahí. una letra
				conectora solo puede tener dos palabras maximo.
				*/
				if (active_connector_indexes.includes(RANDOM_INDEX)) success = false;

				/*
				Si el index aleatoreo cae al lado de un index que ya estaba seleccionado
				tampoco podría ser, porque en el crusigrama las letras conectoras
				nunca estan pegadas.
				*/
		    for (const CONNECTOR_INDEX of active_connector_indexes) {
		      if (Math.abs(RANDOM_INDEX - CONNECTOR_INDEX) == 1) success = false;  
		    }

		    /*
				If success la letra que se ha escojido es valida. ejemplo:
				'palabra' tiene la 'p' y la 'b' ya ocupadas, y la que acabamos de selccionar es la 'l'.
		    */
		    if (success) {
		    	selected_connector_index = RANDOM_INDEX;
		    	selected_connector = RANDOM_LETTER;

		    	console.log(selected_connector_index, '  SELECTED CONNECTOR INDEX');
		    	console.log(selected_connector, '  SELECTED CONNECTOR');
		    	sequence2();
		    }
			}
		}

    	//Look for a random word that also contains that connector (letter).
		function sequence2() {
			console.log('')
			console.log('')
			console.log('(secuence2)');
	    for (let b=0; b < crossword.find_pluggable_word_tries; b++) {

      	let success = true;
      	console.log(random(crossword.copy_words.length), '  RANDOM INDEX');
      	const RANDOM_WORD = crossword.copy_words[random(crossword.copy_words.length)]; // palabra aleatorea.
		    console.log(RANDOM_WORD, '  RANDOM WORD');

		    if (RANDOM_WORD.includes(selected_connector)) {
		    	console.log(RANDOM_WORD + ' contains ' + selected_connector);
		    	// fill selected_word_repeated_connector_indexes;
		    	selected_word_repeated_connector_indexes = [];
		      let index = 0;
		      for (const LETTER of RANDOM_WORD) {
		      	if (LETTER == selected_connector) selected_word_repeated_connector_indexes.push(index);
		      	index++;
		      }
		    } else {
		    	console.log(RANDOM_WORD + ' DOES NOT CONTAINS ' + selected_connector);
		    	success = false;
		    }


		    console.log(success, 'SUCCESS');
		    if (success) {
		    	active_connector_indexes.push(selected_connector_index);
					selected_connector_cell = crossword.words_data[WORD].CELLS[selected_connector_index]

					selected_word = RANDOM_WORD
					console.log(selected_word, '  SELECTED WORD');
					console.log(selected_connector_cell, '  SELECTED CONNECTOR CELL');

	      	word_successfully_suited = sequence3();
	      	if (word_successfully_suited) return true;
		    }
			}

			return false;
		}

  		//Try fitting the selected_word with all its repeated connectors
  		// in all possible angles, till asserting.
		function sequence3() {
			console.log('')
			console.log('')
			console.log('(secuence3)');
	    for (repeated_connector_index of selected_word_repeated_connector_indexes) {
	    	
        for (actual_direction of Angles.randomDirections()) {
        	console.log(repeated_connector_index, 'repeated_connector_index')
        	console.log('TRY TO FIT THIS DIRECTION: ' + actual_direction);
        	word_successfully_suited = sequence4();
        	if (word_successfully_suited) return true;
	      }
	    }

	    return false;
		}

		//Check each one of the letter cells where selected word is going to be.
		function sequence4() {
			console.log('')
			console.log('')
			console.log('(secuence4)');
			word_opposite_angles = new Angles(word_opposite_angles.orientation, actual_direction);

	    selected_word_start_cell = selected_connector_cell.copy().add(word_opposite_angles.movement.copy().mult(new Vector(repeated_connector_index, repeated_connector_index)))
	    selected_word_angles = new Angles(word_opposite_angles.orientation, word_opposite_angles.getOpposite().direction);
	    
	    actual_cell = selected_word_start_cell.copy();
	    

	    //Check each one of the letter cells where this word is going to be.
	    letter_index = 0;
	    for (const LETTER of selected_word) {

	    	/*
		    Iterate over all the active cells (not available cells)
		    to compare in an appropiate way.
		    */
		    for (active_cell of crossword.active_cells) {
		    	if (!approval1() || !approval2()) {
		    		console.log('this word is not suitable :C')
		    		return false; // this word is not suitable :C
		    	}
		    }
	      
	      actual_cell.add(selected_word_angles.movement);
	      letter_index++;
	    }

	    pluggable();
	    return true;
		}

		// checks that the actual_cell is available.
		// checks that the perpendicular cells of the active cells (opposite orientation)* are availables.
		function approval1() {
      //If the actual cell is the connector cell then no comparison is neccessary.
      if (!actual_cell.equals(selected_connector_cell)) {

        //checks that the cell where this letter is going to be is available. 
        if (actual_cell.equals(active_cell)) {
        	console.log(actual_cell, 'actual_cell');
        	console.log(active_cell, 'active_cell');
        	console.log('the cell is not available');
        	return false;
        }

        //checks that the cells around the actual cell are availables (in the oposite orientation).
        for (const DIRECTION of Angles.DIRECTIONS) {
        	const TEMPORAL_ANGLES = new Angles(WORD_ANGLES.orientation, DIRECTION);
          const ACTUAL_CELL_AROUND_CHECKER = actual_cell.copy().add(TEMPORAL_ANGLES.movement);

          if (ACTUAL_CELL_AROUND_CHECKER.equals(active_cell)) {
          	console.log(ACTUAL_CELL_AROUND_CHECKER, 'ACTUAL_CELL_AROUND_CHECKER');
          	console.log(active_cell, 'active_cell');
	        	console.log('the cells around are not available');
	        	return false;
	        }
        }
      }

      return true;
		}

		//Checks the cells before the start_cell
		// and after the last cell, they must be available too.
		function approval2() {
			if (letter_index == 0) {
        const TEMPORAL_ANGLES = new Angles(selected_word_angles.orientation, selected_word_angles.getOpposite().direction);
        const CELL_BEFORE_START_CELL = actual_cell.copy().add(TEMPORAL_ANGLES.movement);

        if (CELL_BEFORE_START_CELL.equals(active_cell)) return false;

      } else if (letter_index == selected_word.length-1) {
        const CELL_AFTER_LAST_CELL = actual_cell.copy().add(selected_word_angles.movement);

        if (CELL_AFTER_LAST_CELL.equals(active_cell)) return false;
      }

      return true;
		}

		// If the selected word enters this function the it was perfectly fitted C:
		function pluggable() {
			console.log('')
			console.log('')
			console.log('')
			console.log('')
			console.log('')
			console.log('')
			console.log('(pluggable)');
			console.log(selected_word, '  SELECTED WORD PLUGGED **************');
			crossword.copy_words.splice(crossword.copy_words.indexOf(selected_word), 1);

			const PLUGGABLE_WORD_DATA = {
				WORD: selected_word,
				START_CELL: selected_word_start_cell.copy(), 
				ANGLES: selected_word_angles, 
				CONNECTION_CELL: selected_connector_cell.copy(),
			}

      plugged_words_data.push(PLUGGABLE_WORD_DATA);
    	}

		sequence1();

		//console.log(Object.keys(plugged_words_data), 'LOOOOKKKK AT THISSSSSSS ************')
		return plugged_words_data;
	},
  // -------- END
  __savePluggedWordsData: function(PLUGGABLE_WORDS) {
  	for (const PLUGGED_WORD of PLUGGABLE_WORDS) {
	    if (this.counter == this.amount-1) return;

	    this.counter += 1;

	    const WORD_CELLS = this.__wordToCells(PLUGGED_WORD.WORD, PLUGGED_WORD.START_CELL, PLUGGED_WORD.ANGLES);
			this.__saveWordData(PLUGGED_WORD.WORD, WORD_CELLS, PLUGGED_WORD.ANGLES, PLUGGED_WORD.CONNECTION_CELL);
			this.words_to_extend.push(PLUGGED_WORD.WORD);
	  }
  },

  __createInputs: function() {
		const WORDS_DATA_KEYS = Object.keys(this.words_data);
		for (const WORD of WORDS_DATA_KEYS) {

			let index = 0;
			for (const LETTER of WORD) {
				const CELL = this.words_data[WORD].CELLS[index];
				const CELL_ID = CELL.x + '_' + CELL.y;
				const INPUT_ID = WORD + index;

				if (!this.inputs_by_cell_id[CELL_ID]) {
					const INPUT = new Input(LETTER, CELL);
					INPUT.addId(WORD, index);

					this.inputs.push(INPUT);
					this.inputs_by_id[INPUT_ID] = INPUT;
					this.inputs_by_cell_id[CELL_ID] = INPUT;

				} else { // this is a connector cell, so DON'T create another.
				 const INPUT_CONNECTOR = this.inputs_by_cell_id[CELL_ID];
				 INPUT_CONNECTOR.addId(WORD, index);
				 this.inputs_by_id[INPUT_ID] = INPUT_CONNECTOR; // referencing the existent, but with its other id.
				}

				index++;
			}
		}
	},
	__offsetCells: function() {
		let offset_cell = new Vector(0,0);
		for (const INPUT of this.inputs) {
			if (INPUT.cell.x < offset_cell.x) offset_cell.x = INPUT.cell.x;
			if (INPUT.cell.y < offset_cell.y) offset_cell.y = INPUT.cell.y;
		}

		offset_cell.x = Math.abs(offset_cell.x);
		offset_cell.y = Math.abs(offset_cell.y);

		for (const INPUT of this.inputs) {
			INPUT.cell.add(offset_cell);
		}
		for (const MARKER of this.markers) {
			MARKER.cell.add(offset_cell);
		}
	},
	__createCssGrid: function() {
		this.grid_dimentions = {columns: 0, rows: 0};
		for (const INPUT of this.inputs) {
			if (INPUT.cell.x > this.grid_dimentions.columns) this.grid_dimentions.columns = INPUT.cell.x;
			if (INPUT.cell.y > this.grid_dimentions.rows) this.grid_dimentions.rows = INPUT.cell.y;
		}

		this.grid_dimentions.columns = this.grid_dimentions.columns+3;
		this.grid_dimentions.rows = this.grid_dimentions.rows+3;

		console.log('GRID DIMENTIONS', this.grid_dimentions);

		this.container.style.gridTemplateColumns = 'repeat(' + this.grid_dimentions.columns + ', ' + this.grid_cell_size + ')';
		this.container.style.gridTemplateRows = 'repeat(' + this.grid_dimentions.rows + ', ' + this.grid_cell_size + ')';
	},
	__offsetCellsGrid: function() {
		let offset_cell = new Vector(1,1);
		for (const INPUT of this.inputs) {
			INPUT.cell.add(offset_cell);
		}
		for (const MARKER of this.markers) {
			MARKER.cell.add(offset_cell);
		}
	},
	__positionInputs: function() {
		for (const INPUT of this.inputs) {
			this.container.appendChild(INPUT.container);

			INPUT.container.style.gridColumn = (INPUT.cell.x+1) + ' / ' + (INPUT.cell.x+2);
			INPUT.container.style.gridRow = (INPUT.cell.y+1) + ' / ' + (INPUT.cell.y+2);
		}
	},
	__positionMarkers: function() {
		for (const MARKER of this.markers) {
			this.container.appendChild(MARKER.container);

			console.log(MARKER.cell.x, MARKER.cell.y, 'LOOOKKK ATTTT HITTTSSS BOYY');

			MARKER.container.style.gridColumn = (MARKER.cell.x+1) + ' / ' + (MARKER.cell.x+2);
			MARKER.container.style.gridRow = (MARKER.cell.y+1) + ' / ' + (MARKER.cell.y+2);
		}
	},
	__setMarkersIndex() {
		/*const WORDS_DATA_KEYS = Object.keys(this.words_data);
		for (const WORD of WORDS_DATA_KEYS) {
			//this.markers_by_word[WORD].setIndex(this.words_data[WORD].INDEX);
			Marker.setIndex(this.markers_by_word[WORD], this.words_data[WORD].INDEX);
		}*/

		for (const MARKER of this.markers) {
			MARKER.setIndex(this.words_data[MARKER.word].INDEX);
		}
	},
	__fillGrid: function() {
		// llenar todos los grids.
		const DIVS_AMOUNT = (this.grid_dimentions.columns * this.grid_dimentions.rows) - this.inputs.length - this.markers.length;
		for (let num = 0; num < DIVS_AMOUNT; num++) {
			const DIV = document.createElement('div');
			DIV.setAttribute('class', 'empty-div');
			this.container.appendChild(DIV);
		}
	},
	__createDescriptions: function() {
		let index = 1;
		for (const WORD of Object.keys(this.words_data)) {
			const DESCRIPTION_CARD = document.createElement('div');
			DESCRIPTION_CARD.setAttribute('class', 'description-cards');
			const DESCRIPTION = document.createElement('p');

			DESCRIPTION.innerHTML = index + '. ' + this.descriptions[WORD.toLowerCase()];
			DESCRIPTION_CARD.appendChild(DESCRIPTION);
			this.descriptions_container.appendChild(DESCRIPTION_CARD);
			index++;

		}
	}
}

let control = {
	setup: function() {
		crossword.setup();
		//descriptions.setup();
		crossword.start();

	},
	start_game: function() {
		// function called by menu start button.
		//crossword.start();

	},
	finish: function() {
		crossword.restart();
		descriptions.restart();
	},
}

control.setup();




function random(num) {
	return Math.round(Math.random() * (num-1));
}