# Initial Idea
The board should be a square, divided into thirds length-wise and width-wise so it contains 9 individual squares.
Players will alternate turns, and whose turn it is will be displayed on the screen.
The outcome of the game should be communicated to the players. 

# Javascript Ideas
## Create a class for the gameboard
- should have the gameboard populated when an instance is created 
- should have a way to reset the gameboard
## Create a class for the two players
- should provide way to check and see if any of the moves won the game (i feel this would be better on the player than the gameboard)


# Design Changes Along the Way
When I add the ability to track the overall record of the players between games I needed to find a way to separate the "create new game" from the "create new players" mode. 
- I accomplished this by creating a new method in the gameboard class that resets game variables without creating new players
- I added a key:value boolean to the object to definitively say the current game was over and prevent overall records from being updated except on the final play of the game.   
I found issues with correctly accessing a bit of code from one function that was inside of another function.
- To fix this, I created a third function that each of the code bits could reference without messing things up.   
I wanted to draw a line between two points on the screen
- After calculating the points, I discovered there was no good way to do this.
- I should have researched possible options prior to writing code. (Half the code was retained, half was discarded.)  
- Eventually, I settled on creating an element on the window that is positioned absolutely.


# Sounds
All sounds used were freely accessible from https://soundbible.com/ 