var game = {
    wordList: ['cat', 'dog', 'goat'],
    guessesRemaining: 7,
    guessMiss: [],

    init: function () {

    },

    pickWord: function () {
        var word = wordList[Math.floor(Math.random() * wordList.length)];

    },

    displayWord: function () {
        // display word using placeholders
        // update placeholders with letters

    },

    updateStats: function () {
        // keep track of number of guesses
        // display letters that are misses
    }

}




// allow the user to guess a letter

