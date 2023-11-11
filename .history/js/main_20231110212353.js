document.addEventListener('DOMContentLoaded', () => {
    createSquares();
    const keys = document.querySelectorAll('.keyboard-row button')

    const guessedWords = [[]]


    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const key = target.getAttribute('data-key');
            console.log(key)

            updateGuessedWords
        }
    }

    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords-1]
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter)
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById('board')
        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', index + 1);
            gameBoard.appendChild(square);
        }
    }



});
