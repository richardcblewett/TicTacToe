# Initial Idea
The board should be a square, divied into thirds length-wise and width-wise so it contains 9 individual squares.
Players will alternate turns, and whose turn it is will be displayed on the screen.
The outcome of the game should be communicated to the players. 

# User Stories
## Basic:
- As a user, I should be able to start a new tic tac toe game DONE
- As a user, I should be able to click on a square to add X first and then O, and so on DONE
- As a user, I should be shown a message after each turn who's turn it is next DONE
- As a user, I should not be able to click the same square twice DONE
- As a user, I should be shown a message when I win, lose or tie DONE
- As a user, I should not be able to continue playing once I win, lose, or tie DONE
- As a user, I should be able to play the game again without refreshing the page DONE

## Bonus:
- As a user, I should be able to play the game on a mobile device. DONE
- As a user, I should be able to track overall record. DONE
- As a user, I want a nice sound to play when I click a space. DONE
- As a user, I want a line through the winning combination. DONE 
- As a user, I want to play against the computer. IN PROGRESS

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
I found issues with correctly accessing a bit of code from one function that was inside of another funciton.
- To fix this, I created a third function that each of the code bits could reference without messing things up.


# Sounds
All sounds were freely accessible from https://soundbible.com/ 