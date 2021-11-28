// GAME LOGIC

// creating gameboard. I want an array with 9 characters. it might be more visualy pleasing to do a 3x3, but tough noogies.
class Gameboard {
    grid = [, , , , , , , ,];//8 commas = 9 fields
    createNewGameboard = () => {   //a new gameboord class comes with a grid, but a new game needs a clean one
        grid = [];
        for (let i = 0; i < 9; i++) { gameboard.push(''); } //blank-fill the array 
        players = [(new Player('X')), (new Player('O'))];
        turn = 0;
    }
    players = [(new Player('X')), (new Player('O'))];
    turn = 0;
    gameover = () => {
        if ((this.players[0].won === true) || (this.players[0].won === true)) { return true; }
    }
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
        const checkDiagonal1 = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let diagonal1 = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 4) { diagonal1++; }
                });
                if (diagonal1 === 2) { console.log('Diagonal1' + target); return true; };
            }
        }
        const checkDiagonal2 = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let diagonal2 = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 2) { diagonal2++; }
                });
                if (diagonal2 === 2) { console.log('Diagonal2' + target); return true; };
            }
        }
        const checkRow = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let row = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 1) { row++; }
                });
                if (row === 2) { console.log('Row' + target); return true; };
            }
        }
        const checkColumn = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let column = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 3) { column++; }
                });
                if (column === 2) { console.log('Column' + target); return true; };
            }
        }
        this.won = (
            checkDiagonal1(5) ||
            checkDiagonal2(5) ||
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

document.querySelectorAll(".square").forEach(elem => {
    elem.addEventListener('click', () => {                  //if there's no value in the area
        if ((elem.textContent.length === 0) && (ttt.gameover() !== true)) {
            elem.textContent = ttt.players[ttt.turn % 2].name;
            ttt.players[ttt.turn % 2].recordMove(parseInt(elem.id));
            ttt.turn++;
        }
    })
})