//Classes
class Gameboard {
    createNewGameboard = () => {   //a new gameboord class comes with a grid, but a new game needs a clean one
        this.players = [(new Player('X')), (new Player('O'))];
        this.turn = 0;
        this.gameDone = false;
    }
    resetTheGame = () => {
        this.players[0].resetGame();
        this.players[1].resetGame();
        this.turn = 0;
        this.gameDone = false;
    }
    gameover = () => {
        if ((this.players[0].won === true) || (this.players[1].won === true)) { return true; }
    }
}
class Player { //instances of this class should be part of the gameboaord class. 
    constructor(name) { this.name = name.toString(); };
    moves = [];
    won = false;
    overall = [0, 0, 0];
    resetGame = () => {
        this.won = false;
        this.moves = [];
    }
    recordMove = (move) => {    // takes a numerical play and adds it to a list of player moves 
        this.moves.push(move);
        if (this.moves.length >= 3) {
            this.winningConditions();
        }
    };
    winningConditions = () => { //input will be the moves by the player
        const checkDiagonal1 = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let diagonal1 = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 4) { diagonal1++; }
                });
                if (diagonal1 === 2) { return true; };
            }
        }
        const checkDiagonal2 = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let diagonal2 = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 2) { diagonal2++; }
                });
                if (diagonal2 === 2) { return true; };
            }
        }
        const checkRow = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let row = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 1) { row++; }
                });
                if (row === 2) { return true; };
            }
        }
        const checkColumn = (target) => {
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let column = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 3) { column++; }
                });
                if (column === 2) { return true; };
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
//DOM variables 
const playerOne = document.querySelector("#playerOne");
const playerOneTurn = playerOne.querySelector(".turn");
const playerTwo = document.querySelector("#playerTwo");
const playerTwoTurn = playerTwo.querySelector(".turn");
//functions
const setSquares = () => {
    document.querySelectorAll(".square").forEach(elem => { elem.textContent = ''; });
}
const removeTurnIndicator = () => {
    playerOneTurn.textContent = '';
    playerTwoTurn.textContent = '';
}
const addTurnIndicator = () => {
    const turnIndicator = 'Click any blank square';
    if (ttt.turn % 2 === 0) { playerOneTurn.textContent = turnIndicator; }
    else { playerTwoTurn.textContent = turnIndicator; }
}
const resetOverall = () => {
    ttt.players[0].overall = [0, 0, 0];
    ttt.players[1].overall = [0, 0, 0];
    ttt.gameDone = false;
    updateOverall();
}
const updateOverall = () => {
    if (ttt.gameDone === false) {
        let overall = ttt.players[0].overall;
        let record = `(${overall[0]}-${overall[1]}-${overall[2]})`
        playerOne.querySelector(".overall").textContent = record;
        overall = ttt.players[1].overall;
        record = `(${overall[0]}-${overall[1]}-${overall[2]})`
        playerTwo.querySelector(".overall").textContent = record;
        ttt.gameDone = true;
    }
}
const playSound = () => {
    let audio = new Audio("assets/swoosh.mp3");
    audio.play();
}
//Event listeners
document.querySelectorAll(".square").forEach(elem => {
    elem.addEventListener('click', () => {                  //if there's no value in the area
        //check for blank space
        if ((elem.textContent.length === 0) && (ttt.gameover() !== true)) {
            playSound();
            removeTurnIndicator();
            elem.textContent = ttt.players[ttt.turn % 2].name;
            ttt.players[ttt.turn % 2].recordMove(parseInt(elem.id));
        }
        if (ttt.players[0].won === true) {
            playerOneTurn.textContent = 'WIN!';
            playerTwoTurn.textContent = 'LOSS';
            ttt.players[0].overall[0]++;
            ttt.players[1].overall[1]++;
            updateOverall();
        } else if (ttt.players[1].won === true) {
            playerOneTurn.textContent = 'LOSS';
            playerTwoTurn.textContent = 'WIN!';
            ttt.players[0].overall[1]++;
            ttt.players[1].overall[0]++;
            updateOverall();
        } else if (ttt.turn === 8) { // this is the 9th choice and the board is full
            playerOneTurn.textContent = 'TIE';
            playerTwoTurn.textContent = 'TIE';
            ttt.players[0].overall[2]++;
            ttt.players[1].overall[2]++;
            updateOverall();
        } else {
            ttt.turn++;
            addTurnIndicator();
        }
    })
})
document.querySelector("#newGame").addEventListener('click', () => {
    ttt.resetTheGame();
    setSquares();
    removeTurnIndicator();
    addTurnIndicator();
})

document.querySelector("#resetOverall").addEventListener('click', () => {
    resetOverall();
})
//start the game
const ttt = new Gameboard;
ttt.createNewGameboard();