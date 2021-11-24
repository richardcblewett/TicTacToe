// GAME LOGIC

// creating gameboard. I want an array with 9 characters. it might be more visualy pleasing to do a 3x3, but tough noogies.
class Gameboard {
    grid = [,,,,,,,,];//8 commas = 9 fields
    createNewGameboard = () => {   //a new gameboord class comes with a grid, but a new game needs a clean one
        for (let i = 0; i < this.grid.length; i++) { gameboard.pop(); } //if it exists, remove all
        for (let i = 0; i < 9; i++) { gameboard.push(''); } //blank-fill the array 
    }
}

winningConditions = (a) => {  
    //going to use a turnary statment because it is pretty
    //subtract 1 to get the placement in array
    //1,2,3 
    //4,5,6
    //7,8,9
    
}