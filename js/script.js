// GAME LOGIC

// creating gameboard. I want an array with 9 characters. it might be more visualy pleasing to do a 3x3, but tough noogies.
class Gameboard {
    grid = [, , , , , , , ,];//8 commas = 9 fields
    createNewGameboard = () => {   //a new gameboord class comes with a grid, but a new game needs a clean one
        grid = [];
        for (let i = 0; i < 9; i++) { gameboard.push(''); } //blank-fill the array 
    }
}

class Player {
    constructor(name) { this.name = name.toString(); };
    moves = [];
    won = false;
    recordMove = (move) => {    // takes a numerical play and adds it to a list of player moves 
        this.moves.push(move); 
        this.winningConditions();
        if (won === true) {
            //somehting happens;
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
        won = (checkDiagonal(5) ||
            checkRow(2) ||
            checkRow(5) ||
            checkRow(8) ||
            checkColumn(4) ||
            checkColumn(5) ||
            checkColumn(6)
        );
    };
}