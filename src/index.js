const GameController = require('./modules/gameControl.js');
const Gameboard = require('./modules/gameboard.js');
const Player = require('./modules/player.js');
const GameboardDOM = require('./componentsDOM/gameboardDOM.js');

const gameControl = new GameController();

// Create new players and attach the game controller to it
const playerOne = new Player(gameControl, 'Player one');
const playerTwo = new Player(gameControl, 'Player two');

// Create new main gameboards with its corresponding opponent
const gameboardOne = new Gameboard();
const gameboardTwo = new Gameboard();

// Create new gameboards in the DOM
const gameboardDOMOne = new GameboardDOM('#player-one-gameboard');
const gameboardDOMTwo = new GameboardDOM('#player-two-gameboard');

/*

Place ships on each board for TESTING!!! *******************************************

*/


gameboardOne.placeShip(0, 0, 2, 'horizontal');
gameboardOne.placeShip(3, 0, 3, 'vertical');
gameboardOne.placeShip(7, 0, 3, 'horizontal');
gameboardOne.placeShip(0, 5, 4, 'vertical');
gameboardOne.placeShip(5, 6, 5, 'horizontal');

// Plaats schepen op het spelbord
gameboardTwo.placeShip(0, 0, 2, 'horizontal');
gameboardTwo.placeShip(3, 0, 3, 'vertical');
gameboardTwo.placeShip(7, 0, 3, 'horizontal');
gameboardTwo.placeShip(0, 5, 4, 'vertical');
gameboardTwo.placeShip(5, 5, 5, 'horizontal');


// Initialize both gameboards in the DOM
gameboardDOMOne.generateGridCells(gameboardOne, playerTwo);
gameboardDOMTwo.generateGridCells(gameboardTwo, playerOne);

/*

**************************************************************************************

*/

// Player one begins
playerOne.active = true;
playerTwo.active = false;

// Start the game
gameControl.startGame(
  playerOne,
  playerTwo,
  gameboardOne,
  gameboardTwo,
  gameboardDOMOne,
  gameboardDOMTwo,
);


module.exports = gameControl;


// Create the main loop, the game loop should set up a new game by creating Players and Gameboards.
// You need methods to render the gameboards and to take user input for attacking.
// For attacks, let the user click on a coordinate in the enemy Gameboard.


// The game loop should step through the game turn by turn using only methods from other objects.
// If at any point you are tempted to write a new function inside the game loop, step back and figure out
// which class or module that function should belong to.

// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.
