# Battleship Game
In this repository i'm currently working on the implementation of the classic game Battleship, as part of "The Odin Project" curriculum. The focus of this project is on Test Driven Development (TDD), unit testing using Jest, and creating modular, well-structured code.

## Project Description
In this project, we aim to implement the Battleship game using TDD methodology. The project is divided into several steps:

1. **Ship Class/Factory:** Start by creating a Ship class/factory, representing ships in the game. Each ship object includes its length, the number of times it has been hit, and whether or not it has been sunk. The Ship class should have methods like hit() to increase the number of hits and isSunk() to check if the ship is sunk.
2. **Gameboard Class/Factory:** Create a Gameboard class/factory responsible for managing the game grid. It should be able to place ships at specific coordinates, handle attacks, and keep track of missed attacks. Additionally, it should be able to report whether all ships have been sunk.
3. **Player:** Implement a Player class to enable taking turns in the game. Players can attack the enemy Gameboard.
4. **Computer Player:** Create a simple AI for the computer player capable of making random plays while ensuring it doesn't shoot the same coordinate twice.
5. **Main Game Loop and DOM Interaction:** Set up the main game loop and create modules for DOM interaction. Develop methods to render game boards and take user input for attacking. Display both player's boards and render them using information from the Gameboard class/factory.
6. **Game End Condition:** Implement conditions to end the game once one player's ships have all been sunk.

## Extra Credit (Optional)
1. Implement drag and drop functionality for placing ships.
2. Create a 2-player option for local multiplayer.
3. Ensure the game is playable on mobile screens and implement a screen for passing the device between players.
4. Improve the intelligence of the computer player by having it try adjacent slots after a hit.
