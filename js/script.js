// GAME LOGIC

// creating gameboard. I want an array with 9 characters. it might be more visualy pleasing to do a 3x3, but tough noogies.
class Gameboard {
    grid = [, , , , , , , ,];//8 commas = 9 fields
    createNewGameboard = () => {   //a new gameboord class comes with a grid, but a new game needs a clean one
        grid = [];
        for (let i = 0; i < 9; i++) { gameboard.push(''); } //blank-fill the array 
        players = [(new Player('X')),(new Player('O'))];
        turn = 0;
    }
    players = [(new Player('X')),(new Player('O'))];
    turn = 0;
}
class Player { //instances of this class should be part of the gameboaord class. 
    constructor(name) { this.name = name.toString(); };
    moves = [];
    won = false;
    recordMove = (move) => {    // takes a numerical play and adds it to a list of player moves 
        this.moves.push(move);
        console.log('move recorded' + move);
        if (this.moves.length >= 3) {
            this.winningConditions();
        }
        if (this.won === true) {
            console.log(this.name + 'WINNING');//something happens;
        };
    };
    winningConditions = () => { //input will be the moves by the player
        const checkDiagonal = (target) => {
            let diagonal1, diagonal2 = 0;
            this.moves.forEach((value) => {
                if (Math.abs(target - value) === 4) { diagonal1++; }
                else if (Math.abs(target - value) === 2) { diagonal2++; }
            });
            if (diagonal1 === true || diagonal2 === true) { return true; };
        }
        const checkRow = (target) => {
            let row = 0;
            this.moves.forEach((value) => {
                if (Math.abs(target - value) === 1) { row++; }
            });
            if (row === 2) { return true; };
        }
        const checkColumn = (target) => {
            let column = 0;
            this.moves.forEach((value) => {
                if (Math.abs(target - value) === 3) { column++; }
            });
            if (column === 2) { return true; };
        }
        this.won = (
            checkDiagonal(5) ||
            checkRow(2) ||
            checkRow(5) ||
            checkRow(8) ||
            checkColumn(4) ||
            checkColumn(5) ||
            checkColumn(6)
        );
    }; //end winning conditions
}

const ttt = new Gameboard;
//const X = new Player('X');
//const O = new Player('O');
//ttt.players.push(new Player('X'));
//ttt.players.push(new Player('O'));
let turn = 0;

document.querySelectorAll(".square").forEach(elem => {
    elem.addEventListener('click', () => {                  //if there's no value in the area
        if (elem.textContent.length === 0) {
            elem.textContent = ttt.players[turn % 2].name;
            ttt.players[turn % 2].recordMove(parseInt(elem.id));
            turn++;
        }
    })
})