const GameControl = require('./modules/gameControl.js');

// Create the main loop, the game loop should set up a new game by creating Players and Gameboards.
// You need methods to render the gameboards and to take user input for attacking.
// For attacks, let the user click on a coordinate in the enemy Gameboard.

// Create a new game GameController
const gameControl = new GameControl();

// Place ships on each board for testing
gameControl.gameboardOne.placeShip(7, 5, 3, 'vertical');
gameControl.gameboardTwo.placeShip(2, 2, 5, 'horizontal');

// Initialize both gameboards in the DOM
gameControl.gameboardDOMOne.generateGridCells(gameControl.gameboardOne);
gameControl.gameboardDOMTwo.generateGridCells(gameControl.gameboardTwo);

// Make player one start, activate opponents gameboard
gameControl.activateGameboard(gameControl.gameboardTwo);
gameControl.activatePlayer(gameControl.playerOne);

// The game loop should step through the game turn by turn using only methods from other objects.
// If at any point you are tempted to write a new function inside the game loop, step back and figure out
// which class or module that function should belong to.

// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.

