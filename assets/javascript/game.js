// variable declaration
var arrWords = ["Apple", "Banana", "Blueberry", "Cantaloupe", "Cherry", "Grape", "Grapefruit", "Honeydew", "Kiwi", "Lemon", "Lime", "Mango", "Orange", "Papaya", "Pear", "Pineapple", "Pomegranate", "Starfruit", "Strawberry", "Watermelon"];
var strCurrentWord = "";
var arrWordProgress = [];
var intWins = 0;
var intLoses = 0;
var intGuessLeft = 0;
var arrGuessedLetters = [];
var strGameMsg ="";

// new game function
function newGame() {
  //   reset guesses left
  intGuessLeft = 10;
  //   pick new word and made sure it is not the same as the last word
  var holdWord = strCurrentWord;
  while (holdWord === strCurrentWord) {
    strCurrentWord = arrWords[Math.floor(Math.random() * arrWords.length)];
  }
  //   set word progress
  while (arrWordProgress.length > 0) {
    arrWordProgress.pop();
  }
  for (var i = 0; i < strCurrentWord.length; i++) {
    arrWordProgress[i] = "_";
  }
  //   clear letter guesses
  while (arrGuessedLetters.length > 0) {
    arrGuessedLetters.pop();
  }
}

// update the game screen
function updateGameScreen() {
  //   update wins 
  document.getElementById("winsCnt").innerHTML = intWins;
  //   update loses 
  document.getElementById("loseCnt").innerHTML = intLoses;
  //   update guesses left
  document.getElementById("guessCnt").innerHTML = intGuessLeft;
  //   update word progress
  var temp = arrWordProgress[0];
  for (var i = 1; i < arrWordProgress.length; i++) {
    temp = temp + " " + arrWordProgress[i];
  }
  document.getElementById("wordProgress").innerHTML = temp;
  //   update letters guessed
  document.getElementById("lettersGuessed").innerHTML = arrGuessedLetters.toString().toUpperCase().replace(/\,/g," ");
  //   update game message
  document.getElementById("gameMessage").innerHTML = strGameMsg;
}

function updateWordProgress(strCurrentWord, arrWordProgress, keyPress) {
  var boolFound = false;
  for (var i = 0; i < strCurrentWord.length; i++) {
    if (strCurrentWord.charAt(i).toLowerCase() === keyPress) {
      arrWordProgress[i] = keyPress.toUpperCase();
      boolFound = true;
    }
  }
  return boolFound;
}

function isWordGuessed(letter) {
  return letter !== "_";
}

// key press function
document.onkeyup = function () {
  var keyPressed = event.key.toLowerCase();
  //   validate pressed key is a letter
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    strGameMsg = "";
    // check if the letter is has been already pressed
    if (!arrGuessedLetters.includes(keyPressed)) {
      //   check if in word
      //     if in word, show letter in progress
      var boolInWord = updateWordProgress(strCurrentWord, arrWordProgress, keyPressed);
      //   add to letters guessed
      arrGuessedLetters.push(keyPressed);
      arrGuessedLetters.sort();
      if (!boolInWord) {
        intGuessLeft--;
      }
      // if guesses left equals zero lose game
      if (intGuessLeft <= 0) {
        document.getElementById('loseAudio').play();
        strGameMsg="You took too many guesses! The word was " + strCurrentWord + ". Try again with a new word.";
        intLoses++;
        newGame()
        // if word complete win game
        // } else if (wordGuessed()) {
      } else if (arrWordProgress.every(isWordGuessed)) {
        document.getElementById('winAudio').play();
        strGameMsg="You corretly guess the word was " + strCurrentWord + ". Try again with a new word.";
        intWins++;
        newGame()
      }
    }
  } else {
    strGameMsg="Letters are the only valid keys. Please press a letter.";
  }
  // update game screen
  updateGameScreen();

}
