//Classes
class Gameboard {
    createNewGameboard = () => {   //a new gameboard class comes with a grid, but a new game needs a clean one
        this.players = [(new Player('X')), (new Player('O'))];
        this.startingOver();
    }
    resetGameboard = () => {
        this.players[0].resetGame();
        this.players[1].resetGame();
        this.startingOver();
    }
    startingOver = () => {
        this.turn = 0;
        this.gameDone = false;
        this.winningPlay = '';
    }
    gameover = () => {
        if ((this.players[0].won === true) || (this.players[1].won === true)) { return true; }
    }
}
class Player { //instances of this class should be part of the gameboard class. 
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
        const checkDiagonal1 = (target) => { //   "\"
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let diagonal1 = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 4) { diagonal1++; }
                });
                if (diagonal1 === 2) { ttt.winningPlay = 'D1'; return true; };
            }
        }
        const checkDiagonal2 = (target) => { //   "/"
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let diagonal2 = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 2) { diagonal2++; }
                });
                if (diagonal2 === 2) { ttt.winningPlay = 'D2'; return true; };
            }
        }
        const checkRow = (target) => { //   "-"
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let row = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 1) { row++; }
                });
                if (row === 2) { ttt.winningPlay = 'R' + target; return true; };
            }
        }
        const checkColumn = (target) => { //   "|"
            if (this.moves.findIndex(elem => elem === target) >= 0) {
                let column = 0;
                this.moves.forEach((value) => {
                    if (Math.abs(target - value) === 3) { column++; }
                });
                if (column === 2) { ttt.winningPlay = 'C' + target; return true; };
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
const setSquares = () => { // sets the tiles to blank
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
    updateOverall();
    ttt.gameDone = false;
}
const updateOverall = () => {
    let overall = ttt.players[0].overall;
    let record = `(${overall[0]}-${overall[1]}-${overall[2]})`
    playerOne.querySelector(".overall").textContent = record;
    overall = ttt.players[1].overall;
    record = `(${overall[0]}-${overall[1]}-${overall[2]})`
    playerTwo.querySelector(".overall").textContent = record;
}
const finishGame = () => {
    if (ttt.gameDone === false) { //only runs once
        playSound('horn');
        showFinalOutcome();
        updateOverall();
        ttt.gameDone = true;
    }
}
const playSound = (sound) => {
    let audio;
    switch (sound) {
        case 'swoosh':
            audio = new Audio("assets/swoosh.mp3");
            break;
        case 'ding':
            audio = new Audio("assets/ding.mp3");
            break;
        case 'tone':
            audio = new Audio("assets/tone.mp3");
            break;
        case 'horn':
            audio = new Audio("assets/horn.mp3");
            break;
        default:
            audio = false;
            break;
    }
    if (audio !== false) { audio.play(); }
}
const showFinalOutcome = () => {
    let values = document.querySelector("#gameboard").getBoundingClientRect();
    let top, left, degree = 0;
    let width = values.width;
    //just need starting point and length and angle (if any)
    switch (ttt.winningPlay.charAt(0)) {
        case 'R': //row
            left = values.left;
            switch (ttt.winningPlay.charAt(1)) {
                case '2':
                    top = values.top + (values.height - 10) / 6; // should give half of a square
                    break;
                case '5':
                    top = values.top + values.height / 2; // should give halfway
                    break;
                case '8':
                    top = values.bottom - (values.height - 10) / 6; // should give half a square from the bottom
                    break;
                default:
                    break;
            }
            break;
        case 'C': //column
            top = values.top;
            switch (ttt.winningPlay.charAt(1)) {
                case '4':
                    left = values.left + (values.width - 10) / 6; // should give half of a square
                    break;
                case '5':
                    left = values.left + values.width / 2; // should give halfway
                    break;
                case '6':
                    left = values.right - (values.width - 10) / 6; // should give half a square from the right
                    break;
                default:
                    break;
            }
            degree = 90;
            break;
        case 'D': //diagonal
            left = values.left;
            switch (ttt.winningPlay.charAt(1)) {
                case '1': //  diagonal going down
                    top = values.top;
                    degree = 45;
                    break;
                case '2': // diagonal going up
                    top = values.top + values.width;
                    degree = 315;
                    break;
                default:
                    break;
            }
            width = Math.sqrt(2 * (width ** 2)); // the length of a line bisecting the square 
            break;
        default:
            break;
    }
    let drawLine = () => {
        let line = document.createElement('span');
        line.id = 'line';
        line.style.position = 'absolute';
        line.style.height = '9px';
        line.style.width = `${width}px`;
        line.style.left = `${left}px`;
        line.style.top = `${top - 4}px`;
        line.style.backgroundColor = '#800080';
        line.style.transform = `rotate(${degree}deg)`;
        line.style.transformOrigin = 'center left';
        document.body.appendChild(line);
    }
    drawLine();
}
//Event listeners
document.querySelectorAll(".square").forEach(elem => {
    elem.addEventListener('click', () => {                  //if there's no value in the area
        //check for blank space
        if ((elem.textContent.length === 0) && (ttt.gameover() !== true)) {
            playSound('swoosh');
            removeTurnIndicator();
            elem.textContent = ttt.players[ttt.turn % 2].name;
            ttt.players[ttt.turn % 2].recordMove(parseInt(elem.id));
            ttt.turn++;
            addTurnIndicator();
        }
        if (ttt.players[0].won === true) {
            playerOneTurn.textContent = 'WIN!';
            playerTwoTurn.textContent = 'LOSS';
            ttt.players[0].overall[0]++;
            ttt.players[1].overall[1]++;
            finishGame();
        } else if (ttt.players[1].won === true) {
            playerOneTurn.textContent = 'LOSS';
            playerTwoTurn.textContent = 'WIN!';
            ttt.players[0].overall[1]++;
            ttt.players[1].overall[0]++;
            finishGame();
        } else if (ttt.turn === 8) { // this is the 9th choice and the board is full
            playerOneTurn.textContent = 'TIE';
            playerTwoTurn.textContent = 'TIE';
            ttt.players[0].overall[2]++;
            ttt.players[1].overall[2]++;
            finishGame();
        }
    })
})
document.querySelector("#newGame").addEventListener('click', () => {
    playSound('tone')
    ttt.resetGameboard();
    if (document.querySelectorAll("#line").length > 0) { document.querySelector("#line").remove(); }
    setSquares();
    removeTurnIndicator();
    addTurnIndicator();
})
document.querySelector("#resetOverall").addEventListener('click', () => {
    playSound('ding');
    resetOverall();
})
//start the game
const ttt = new Gameboard;
ttt.createNewGameboard();
addTurnIndicator();
