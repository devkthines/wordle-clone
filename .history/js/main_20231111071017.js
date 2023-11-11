document.addEventListener('DOMContentLoaded', () => {
    createSquares();
    const keys = document.querySelectorAll('.keyboard-row button')
    getNewWord()

    let guessedWords = [[]];
    let availableSpace = 1;
    let word;
    let guessWordCount = 0;

function getNewWord(){

    fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersmin=5&letters=5&lettersMax=5', {
        "method": "GET",
        "headers": {
            'X-RapidAPI-Key': 'b71f1d244cmsh8c019f390edf659p121861jsn73758c8808db',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      })
      .then(response => {
        console.log(response);
        return response.json();

      })
      .then((res)=>{
        word = res.word
      })
      .catch(err => {
        console.error(err);
      });
}


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

    function getTileColor(letter,index){
        const isCorrectLetter = word.includes(letter)

        if (!isCorrectLetter){
            return 'rgb(58,58,60)'
        }
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if(isCorrectPosition){
            return 'rgb(83,141,78)';
        }

        return 'rgb(181,159,59)';
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
                const tileColor = getTileColor(letter,index)
                const letterId = firstLetterId +index;
                const letterEl = document.getElementById(letterId)
                letterEl.classList.add('animate__flipInX');
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            },interval*index)
        });
        guessWordCount +=1;

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
