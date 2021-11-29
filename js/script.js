class Gameboard {
    createNewGameboard = () => {   //a new gameboord class comes with a grid, but a new game needs a clean one
        this.players = [(new Player('X')), (new Player('O'))];
        this.turn = 0;
        console.log("new gameboard created");
        document.querySelectorAll(".square").forEach(elem => {
            elem.textContent = '';
        })
        removeTurnIndicator();
        addTurnIndicator();
    }
    gameover = () => {
        if ((this.players[0].won === true) || (this.players[1].won === true)) { return true; }
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

document.querySelectorAll(".square").forEach(elem => {
    elem.addEventListener('click', () => {                  //if there's no value in the area
        if ((elem.textContent.length === 0) && (ttt.gameover() !== true)) {
            removeTurnIndicator();
            elem.textContent = ttt.players[ttt.turn % 2].name;
            ttt.players[ttt.turn % 2].recordMove(parseInt(elem.id));
        }
        if (ttt.players[0].won === true) {
            document.querySelector("#playerOne").querySelector("div").textContent = 'WIN!';
            document.querySelector("#playerTwo").querySelector("div").textContent = 'LOSS';
        } else if (ttt.players[1].won === true) {
            document.querySelector("#playerOne").querySelector("div").textContent = 'LOSS';
            document.querySelector("#playerTwo").querySelector("div").textContent = 'WIN';
        } else if (ttt.turn === 8) { // this is the 9th choice and the board is full
            document.querySelector("#playerOne").querySelector("div").textContent = 'TIE';
            document.querySelector("#playerTwo").querySelector("div").textContent = 'TIE';
        } else {
            ttt.turn++;
            addTurnIndicator();
        }
    })
})
document.querySelector("button").addEventListener('click', () => {
    ttt.createNewGameboard();
})


const removeTurnIndicator = () => {
    document.querySelector("#playerOne").querySelector("div").textContent = '';
    document.querySelector("#playerTwo").querySelector("div").textContent = '';
}
const addTurnIndicator = () => {
    const turnIndicator = 'Click any blank square';
    if (ttt.turn % 2 === 0) {
        document.querySelector("#playerOne").querySelector("div").textContent = turnIndicator;
    } else {
        document.querySelector("#playerTwo").querySelector("div").textContent = turnIndicator;
    }
}

const ttt = new Gameboard;
ttt.createNewGameboard();
