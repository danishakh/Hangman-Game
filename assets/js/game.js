// Create an array to store all letters
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Categories of words
var movies = ["tropic thunder", "logan", "baby driver", "spiderman", "terminator", "mortal kombat", "taken", "blow", "blade"];
var cities = ["seoul", "frankfurt", "dubai", "manchester", "barcelona", "london", "florence", "melbourne", "boston", "chicago", "dallas", "taipei"];
var sportCelebs = ["cristiano ronaldo", "kobe bryant", "tiger woods", "rory mcilroy", "muhammad ali", "manny pacquiao", "sachin tendulkar"];
var brands = ["armani", "burberry", "dior", "coach", "levis", "hollister", "hermes"];

var categories = ["brands", "movies", "cities", "sportCelebs"];

var selectedCategory = categories[Math.floor(Math.random() * categories.length)];

// Current word to be guessed
var chosenWord = "";

// Letters in chosenWord
var lettersInWord = [];

// Number of letters in the word
var numLetters = 0;

// Holds correct guesses
var correctLetters = [];

// Holds wrong guesses
var wrongLetters = [];

// Guess Accuracy
var accuracy = 0;

// Number of guesses in complete session
var totalGuesses = 0;

// Number of correct guesses
var correctGuesses = 0;


// Counters
var winCount = 0;
var lossCount = 0;
var guessesAvailable = 10;
var correctGuessCounter = 0;


// Start new round
function startGame() {

	// Container for selecting category so that we scroll to the selected item
	var container = $(".list-group-categories");

	// Selected Category
	if (selectedCategory == "brands") {
		selectedCategory = brands;

		var scrollTo = $(".item-brands");
		$(".item-brands").addClass("active");
		$(".list-group-categories").animate({ scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()});

	}
	else if (selectedCategory == "cities") {
		selectedCategory = cities

		var scrollTo = $(".item-cities");
		$(".item-cities").addClass("active");
		$(".list-group-categories").animate({ scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()});


	}
	else if (selectedCategory == "sportCelebs") {
		selectedCategory = sportCelebs

		var scrollTo = $(".item-sports");
		$(".item-sports").addClass("active");
		$(".list-group-categories").animate({ scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()});

	}
	else if (selectedCategory == "movies") {
		selectedCategory = movies

		var scrollTo = $(".item-movies");
		$(".item-movies").addClass("active");
		$(".list-group-categories").animate({ scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()});
	}
	

	// Select a word randomly
	chosenWord = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];

	// Split the chosen word into individual letters - stripping away spaces and saving its index
	lettersInWord = chosenWord.split('');
	for (var v = 0; v < lettersInWord.length; v++) {
		if (lettersInWord[v] === " ") {
			// saved " " index
			spaceIndex = v;
			lettersInWord.splice(v,1);			//lol hack
		}
	}

	// Reset counters
	guessesAvailable = 10;
	correctGuessCounter = 0;
	numLetters = 0;
	wrongLetters = [];
	correctLetters = [];
	letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];	


	// Get number of letters in current word
	for(var i = 0; i < lettersInWord.length; i++) {
		if (lettersInWord[i] !== " "){
			numLetters++;
		}
	}

	// Populate blanks
	for(var j = 0; j < numLetters; j++) {
		correctLetters.push("_");
		document.getElementById("current-word").innerHTML = correctLetters;
	}

	// Update HTML
	document.getElementById('current-word').innerHTML = correctLetters.join(" ");
	document.getElementById('badge-guess-rem').innerHTML = guessesAvailable;
	document.getElementById('badge-wins').innerHTML = winCount;
	document.getElementById('wrongGuessLetters').innerHTML = wrongLetters;



	// Console Log checks
	console.log("Selected Category: " + selectedCategory);
	console.log("Chosen Word = " + chosenWord);
	console.log("Letters in Word = " + lettersInWord);
	console.log("Num of Letters = " + numLetters);
	console.log("Correct Letters = " + correctLetters);


	// Hide alert box
	$("#winAlert").hide();
	$("#lossAlert").hide();

}	

// Reset Game and Settings
function reset() {
	myRound = false;
	startGame();
}


// Check user guess with current word
function checkGuess(userInput) {
	

	// If userInput is in the word
	if(chosenWord.indexOf(userInput) > -1) {

		console.log("checkGuess working!");
		//Loop through the letters in current word
		for(var i = 0; i < numLetters; i++) {

			//Fill in the userInput at the correct index and increment correctGuess counter
			if (lettersInWord[i] === userInput) {
				
				// For Accuracy
				correctGuesses++;
				totalGuesses++;
				accuracy = calcAccuracy(correctGuesses, totalGuesses);


				correctGuessCounter++;
				correctLetters[i] = userInput;
				document.getElementById('current-word').innerHTML = correctLetters.join(" ");

				document.getElementById('badge-accuracy').innerHTML = accuracy + "%";


			}
		}

		console.log("Correct Letters Now : " + correctLetters);
		console.log("Total Guesses: " + totalGuesses);


	}
	// If userInput is NOT in the word
	else {
		wrongLetters.push(userInput);

		// Decrease available guesses
		guessesAvailable--;

		// For Accuracy
		totalGuesses++;
		accuracy = calcAccuracy(correctGuesses, totalGuesses);

		// Update HTML
		document.getElementById('badge-guess-rem').innerHTML = guessesAvailable;
		document.getElementById('wrongGuessLetters').innerHTML = wrongLetters;		
		document.getElementById('badge-accuracy').innerHTML = accuracy + "%";


		console.log('Wrong Letters = ' + wrongLetters);
		console.log('Guesses Available = ' + guessesAvailable);
	}
}

// Check the state of the game - win/lose conditions
function gameResult() {

	// When correctGuessCounter = number of letters in current word, you win
	if(correctGuessCounter === numLetters) {

		// Increase win counter
		winCount++

		// Update HTML
		document.getElementById('badge-wins').innerHTML = winCount;
		document.getElementById('current-word').innerHTML = correctLetters.join(" ");

		$("#winAlert").show("fast");
		
		setTimeout(function() {
		    reset();
		}, 3000);
		// reset();
	}
	// If guessesAvailable = 0, you lose 
	else if (guessesAvailable === 0) {

		// Increase loss counter
		lossCount++;

		// Show alert box
		$("#lossAlert").show("fast");
		
		setTimeout(function() {
		    reset();
		}, 4000);
	}
}

// Calculate guess accuracy
function calcAccuracy(number1, number2) {
	var result = (number1/number2) * 100;
	return result.toFixed(2);
}

startGame();

document.onkeyup = function(event) {
	
	myRound = true;

	var letterGuessed = event.key;

	// Loop through the letters array
	for(var i = 0; i < letters.length; i++) {

		// If the key pressed is in available letters
		if (letterGuessed === letters[i] && myRound === true) {

			// remove that letter from the list of available letters
			var splicedLetters = letters.splice(i, 1);

			checkGuess(letterGuessed);
			gameResult();
		}
	}

}

// Click events to select category
$(".item-brands").on("click", function() {
	$(".item-categories").removeClass("active");
	selectedCategory = brands;
	$(".item-brands").addClass("active");
	startGame();
});
$(".item-cities").on("click", function() {
	$(".item-categories").removeClass("active");
	selectedCategory = cities;
	$(".item-cities").addClass("active");
	startGame();
});
$(".item-sports").on("click", function() {
	$(".item-categories").removeClass("active");
	selectedCategory = sportCelebs;
	$(".item-sports").addClass("active");
	startGame();
});
$(".item-movies").on("click", function() {
	$(".item-categories").removeClass("active");
	selectedCategory = movies;
	$(".item-movies").addClass("active");
	startGame();
});





// 1. When game starts, set stats & configs back to 0

// 2. Take in user's guess

// 3. Check if user's guess is in the word

// 3a. If it is, then replace the underscore with the user's guess at the correct position
// 3b. If it is not, then reduce the "numberOfGuesses" counter, check if it has hit 0 which would imply game is over and continue

// 4. When win/lose, reset the game back to start state and start a new round with a different word
