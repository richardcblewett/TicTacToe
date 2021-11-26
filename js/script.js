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
    recordMove = (move) => { this.moves.push(move); }; // takes a numerical play and adds it to a list of player moves 
    winningConditions = () => { //input will be the moves by the player
        //going to use a turnary statment because it is pretty
        //subtract 1 to get the placement in array
        //1,2,3 
        //4,5,6
        //7,8,9
        const checkDiagonal = (target) => {
            let diagonal1, diagonal2 = 0;
            this.moves.forEach((value) => {
                if (Math.abs(target - value) === 4) { diagonal1++; }
                else if (Math.abs(target - value) === 2) { diagonal2++; }
            });
            if (diagonal1 === true || diagonal2 === true) { return true; };
        }
        const checkRow = () => {
            let row = 0;
        }
        const checkColumn = () => {
            let column = 0;
        }
        if (this.moves.find(5)) {checkDiagonal();};
        
        
        let check5s = () => { //we can check for permutations of a 5
            if ((this.moves.find(5)) && (won === false)) {                 //second condition is a logical necessity.
                let diagonal1, diagonal2, column, row = 0;
                this.moves.forEach((number) => {
                    if (Math.abs(number) === 4) { diagonal1++; }
                    else if (Math.abs(number) === 2) { diagonal2++; }
                    else if (Math.abs(number) === 3) { column++; }
                    else if (Math.abs(number) === 1) { row++; }
                });
                if ((diagonal1 === 2) || (diagonal2 === 2) || (row === 2) || (column === 2)) { won = truel };
            }
            if ((this.moves.find(4) && won === false)) {

            };
        }
    }
}