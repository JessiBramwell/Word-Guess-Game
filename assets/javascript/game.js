// DOM Elements
var statsDOM = document.getElementById('stats');
var sketchDOM = document.getElementById('sketch');
var viewerDOM = document.getElementById('viewer');
var nextDOM = document.getElementById('next');
var gameDOM = document.getElementById('game');
var manDOM = document.getElementById('stick-figure');
var gameStatsDOM = document.getElementById('game-stats');
var wonDOM = document.getElementById('won');
var lostDOM = document.getElementById('lost');

// DOM Elements created with javascript
var currentWord, guessedLetters, letter;

// Variables
var str = "abcdefghijklmnopqrstuvwxyz";
var letters = str.split("");
var wordList = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
var word, wordSplit, guess, correct, guesses, index, value;
var won = 0;
var lost = 0;

// Start Game
nextDOM.onclick = init;

function init() {
    clear();
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordSplit = word.split('');
    showHide(nextDOM);
    hint();
    displayWord();
    check();
}

function displayWord() {
    console.log(wordSplit);
    // Create Environment to display guesses letters and current work
    currentWord = document.createElement('ul');
    guessedLetters = document.createElement('ul');

    // Display placeholders for letters with a value attribute indicating original letter
    for (var i = 0; i < word.length; i++) {
        currentWord.setAttribute('id', 'current-word');
        letter = document.createElement('li');
        letter.setAttribute('class', 'letter');
        letter.setAttribute('id', 'index-' + i);
        letter.setAttribute('value', wordSplit[i]);

        wordSplit.forEach(function () {
            letter.innerHTML = '_';
        });

        viewerDOM.appendChild(currentWord);
        currentWord.appendChild(letter);
    }
}

function check() {
    document.onkeyup = function (event) {
        guess = event.key;
        word = word.toLowerCase();

        // Limit guesses to letters of the alphabet
        if (letters.includes(guess)) {
            // Limit duplicate wrong guesses - animate to indicate duplicate
            if (!guesses.includes(guess)) {
                // Limit duplicate correct guesses - animate to indicate duplicate
                if (!correct.includes(guess)) {
                    // For a correct guess:
                    if (word.includes(guess)) { //***I would love suggestions on a cleaner way to organize line 71 and 74. They are almost the same statement but I can't get my head around how to combine them into one statement ***
                        for (var i = 0; i < word.length; i++) {
                            // Indicate the index of the correctly guessed letter and display the value - ***displaying the value rather then the guess itself ensures the capitalization is correct***
                            if (word[i] === guess) {
                                index = document.getElementById('index-' + i);
                                value = index.getAttribute('value')
                                index.innerHTML = value;
                                // Push correct guess to array
                                correct.push(guess);
                            }
                        }
                    } else {
                        // Push incorrect guess to array
                        guesses.push(guess);
                        showMan();
                        updateStats();
                    }

                    // A "guesses" array of 10 indecates a loss
                    if (guesses.length === 10) {
                        lostGame();
                        nextGame();
                    }

                    // A "correct" array the same length as the current word indecates a win
                    if (correct.length === word.length) {
                        wonGame();
                        nextGame();
                    }
                } else {
                    // Animate to show that correct letter was already guesses
                    shake(gameDOM);
                }
            } else {
                // Animate to show that incorrect letter was already guesses
                shake(gameStatsDOM);
            }
        }
    }
}

function updateStats() {
    // Create li and add newest guess to the end
    guessedLetter = document.createElement('li');
    guessedLetter.insertAdjacentText('beforeend', guesses[guesses.length - 1]);

    statsDOM.appendChild(guessedLetters);
    guessedLetters.appendChild(guessedLetter);
}

function hint() {
    // Show word color
    document.body.style.backgroundImage = 'linear-gradient('
        + 'to right,' + word + ', #eee)';
}
function clear() {
    // Hide hangman elements from previous word
    if (guesses !== undefined) {
        var el = document.getElementsByClassName('hangman');
        for (var i = 0; i < el.length; i++) {
            el[i].style.display = "none";
        }
    }
    // Hide word and placeholders from previous word
    if (currentWord) {
        currentWord.remove();
    }
    // Hide guessed letters from previous word
    if (guessedLetters) {
        guessedLetters.remove();
    }
    // Empty arrays
    guesses = [];
    correct = [];
}

// Show completed word 
function nextGame() {
    nextDOM.textContent = 'Next Color'
    for (var i = 0; i < word.length; i++) {
        index = document.getElementById('index-' + i);
        value = index.getAttribute('value')
        index.innerHTML = value;
    }
    showHide(nextDOM);
}

// Track wins and losses
function wonGame() {
    won++;
    wonDOM.textContent = won;
}
function lostGame() {
    lost++;
    lostDOM.textContent = lost;
}

// Show and hide button 
function showHide(el) {
    if (el.style.display === "none") {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
}

// Display hangman based on number of missed guesses
function showMan() {
    if (guesses.length > 0 && guesses.length <= 10) {
        var el = document.getElementById('ln-' + (guesses.length - 1));
        el.style.display = "block";
    }
}

// Apply "shake" class if user guesses the same letter more than once
function shake(el) {
    el.classList.add('shake');

    document.addEventListener("animationend", function (event) {
        el.classList.remove("shake");
    });
}