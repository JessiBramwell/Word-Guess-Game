// DOM elements
var statsDOM = document.getElementById('stats');
var sketchDOM = document.getElementById('sketch');
var viewerDOM = document.getElementById('viewer');
var startDOM = document.getElementById('start');
var nextDOM = document.getElementById('next');
var gameDOM = document.getElementById('game');
var manDOM = document.getElementById('stick-figure');
var gameStatsDOM = document.getElementById('game-stats');
var wonDOM = document.getElementById('won');
var lostDOM = document.getElementById('lost');
var currentWord;
var guessedLetters;
var letter;

var str = "abcdefghijklmnopqrstuvwxyz";
var letters = str.split("");
var wordList = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
var word;
var wordSplit = [];
var guess;
var correct;
var guesses;
var index;
var value;
var won = 0;
var lost = 0;


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
    currentWord = document.createElement('ul');
    guessedLetters = document.createElement('ul');

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

        if (letters.includes(guess)) {
            if (!guesses.includes(guess)) {
                if (!correct.includes(guess)) {
                    if (!word.includes(guess)) {
                        guesses.push(guess);
                        showMan();
                        updateStats();

                        if (guesses.length === 10) {
                            lostGame();
                            nextGame();
                        }
                    } else {
                        for (var i = 0; i < word.length; i++) {
                            if (word[i] === guess) {
                                index = document.getElementById('index-' + i);
                                value = index.getAttribute('value')
                                index.innerHTML = value;
                                correct.push(guess);
                            }
                        }
                    }
                    if (correct.length === word.length) {
                        wonGame();
                        nextGame();
                    }
                } else {
                    shake(gameDOM);
                }
            } else {
                shake(gameStatsDOM);
            }
        }
    }
}

function updateStats() {
    guessedLetter = document.createElement('li');
    guessedLetter.insertAdjacentText('beforeend', guesses[guesses.length - 1]);

    statsDOM.appendChild(guessedLetters);
    guessedLetters.appendChild(guessedLetter);
}

function hint() {
    document.body.style.backgroundImage = 'linear-gradient('
        + 'to right,' + word + ', #eee)';
}
function clear() {

    if (guesses !== undefined) {
        var el = document.getElementsByClassName('hangman');
        for (var i = 0; i < el.length; i++) {
            el[i].style.display = "none";
        }
    }

    if (currentWord) {
        currentWord.remove();
    }
    if (guessedLetters) {
        guessedLetters.remove();
    }
    guesses = [];
    correct = [];
}

function nextGame() {
    nextDOM.textContent = 'Next Color'
    for (var i = 0; i < word.length; i++) {
        index = document.getElementById('index-' + i);
        value = index.getAttribute('value')
        index.innerHTML = value;
    }
    showHide(nextDOM);
}
function wonGame() {
    won++;
    wonDOM.textContent = won;
}
function lostGame() {
    lost++;
    lostDOM.textContent = lost;
}

function showHide(el) {
    if (el.style.display === "none") {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
}
function showMan() {
    if (guesses.length > 0 && guesses.length <= 10) {
        var el = document.getElementById('ln-' + (guesses.length - 1));
        el.style.display = "block";
    }
}
function shake(el) {
    el.classList.add('shake');

    document.addEventListener("animationend", function (event) {
        el.classList.remove("shake");
    });
}