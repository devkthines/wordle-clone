document.addEventListener('DOMContentLoaded', () => {
    createSquares();
    const keys = document.querySelectorAll('.keyboard-row button')

    let guessedWords = [[]]
    let availableSpace = 1;
    let word = 'dairy'
    let guessWordCount = 0;


    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords-1]
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter)
            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace +1;
            availableSpaceEl.textContent = letter;
        }
    }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5){
            window.alert('word must be 5 letters')
        }
        const currentWord = currentWordArr.join("")
        const firstLetterId = guessWordCount * 5+1;

        const interval = 200;
        currentWordArr.forEach((letter,index)=>{
            setTimeout(()=>{
                const tileColor = "rgb(58,58,60)"
                const letterId = firstLetterId +index;
                const letterEl = document.getElementById(letterId)
                letterEl.classList.add('animate_flipInX');
                letter.style = `background-color:${tileColor};border-color:${}`
            },interval)
        })

        if (currentWord == word){
            window.alert('Congratulations!')
        }
        if(guessedWords.length === 6){
            window.alert(`Sorry, you have no more guess! the word is ${word}.`)
        }
        guessedWords.push([])
    }

    function createSquares() {
        const gameBoard = document.getElementById('board')
        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.classList.add('animate__animated');
            square.setAttribute('id', index + 1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute('data-key');
            console.log(letter)

            if(letter === 'enter'){
                handleSubmitWord();
                return;
            }

            updateGuessedWords(letter)
        }
    }

});
