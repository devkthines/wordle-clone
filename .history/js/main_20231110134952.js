﻿document.addEventListener('DOMContentLoaded',()=>{
    createSquares();
    const keys = document.querySelectorAll('keyboard-row button')

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
    function createSquares(){
        const gameBoard = document.getElementById('board')
        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id',index+1);
            gameBoard.appendChild(square);
        }
    }



});
