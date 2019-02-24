// DOM elements
var statsDOM = document.getElementById('stats');
var sketchDOM = document.getElementById('sketch');
var viewerDOM = document.getElementById('viewer');
var startDOM = document.getElementById('start');

var str = "abcdefghijklmnopqrstuvwxyz";
var letters = str.split("");
var wordList = ['lithium', 'magnesium', 'aluminum', 'titanium', 'iron', 'cobalt', 'nickel', 'copper', 'zinc', 'silver', 'tin', 'gold', 'mercury', 'lead'];
var word;
var wordSplit = [];
var guess;
var guesses = [];
var letter;
var currentWord;

startDOM.onclick = init;

function init() {
    if (currentWord) {
        currentWord.remove();
    }
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordSplit = word.split('');
    showHide(startDOM);
    guesses = [];
    correct = 0;
    displayWord();
    check();

}

function displayWord() {
    console.log(wordSplit);
    currentWord = document.createElement('ul');

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

        if ((letters.includes(guess)) && (!guesses.includes(guess))) {

            if (!word.includes(guess)) {
                guesses.push(guess);
                updateStats();

                if (guesses.length === 10) {
                    endGame();
                }
            } else {
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === guess) {
                        document.getElementById('index-' + i).innerHTML = guess;

                    }
                }
            }

            if (letter.getAttribute('value') === letter.innerHTML) {
                endGame();
            }
        }
    }
}

function updateStats() {
    statsDOM.textContent = guesses;
}

function endGame() {
    startDOM.textContent = 'New Word';
    showHide(startDOM);
}

function showHide(el) {
    if (el.style.display === "none") {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
}
