const Gameboard = require('./modules/gameboard.js');
const Player = require('./modules/player.js');
const gameboardDOM = require('./componentsDOM/gameboard.js');

// Create the main loop, the game loop should set up a new game by creating Players and Gameboards.
// You need methods to render the gameboards and to take user input for attacking.
// For attacks, let the user click on a coordinate in the enemy Gameboard.

// Create both gameboards and players
const gameboardInstanceOne = new Gameboard();
const gameboardInstanceTwo = new Gameboard();
const playerOne = new Player();
const playerTwo = new Player();

playerOne.toggleActiveState(); // Player one begins

// Place ships on each board for testing
gameboardInstanceOne.placeShip(7, 5, 3, 'vertical');
gameboardInstanceTwo.placeShip(2, 2, 5, 'horizontal');

// Get the gameboard holders on the webpage
const gameBoardDOMOne = document.querySelector('#player-one-gameboard');
const gameBoardDOMTwo = document.querySelector('#player-two-gameboard');

// Copy each value from the gameboard instance to the corresponding cell on the webpage
gameboardDOM.generateGridCells(gameboardInstanceOne, gameBoardDOMOne, playerTwo, playerOne, gameBoardDOMTwo);
gameboardDOM.generateGridCells(gameboardInstanceTwo, gameBoardDOMTwo, playerOne, playerTwo, gameBoardDOMOne);


// The game loop should step through the game turn by turn using only methods from other objects.
// If at any point you are tempted to write a new function inside the game loop, step back and figure out
// which class or module that function should belong to.

// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.
