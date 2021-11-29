let name = ttt.players[ttt.turn % 2].name
const grid = [];
const getGameboard = () => {
    grid = [];
    document.querySelectorAll(".square").forEach(elem => { grid.push(elem.textContent); }) //we now have an array of 9 spaces
};
const corner = [1, 3, 7, 9];
const side = [2, 4, 6, 8];
const star = [5]
//find where there is a potential for 3 in a row
chooseAnyCorner = corner.find(elem => { 
    if (grid[elem-1] === '') {return grid[elem-1];}//should return the number of the first unused corner 
})
//find where to block
switch (turn) {   // for now, we focus on the computer being player 2 - so only odd numbers
    case 0: // starting play
        //choose a corner
        break;
    case 1: //reacting to openning move
        //if 5 is not taken then choose 5
        //otherwise choose a corner
        break;
    case 2:
        //choose the opposite corner if it is available. 
        //if not, choose 5.
        break;
    case 3:
        //if the other team has a potential for three, try and block. 
        //if not get two in a row.
        //if the other team has two corners, choose a side.
        break;
    case 4:
        //try for 3 in a row
        //if not, try and block,
        //if not, try and get 3 corners
        //if not try for 2 in a row - corners preferred
        break;
    default:
        break;
}
