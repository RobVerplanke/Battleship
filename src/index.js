// const Player = require('./modules/player.js');
const generateGridCells = require('./components/gameboard.js');


// The game loop should set up a new game by creating Players and Gameboards.
// For now just populate each Gameboard with predetermined coordinates.
// You are going to implement a system for allowing players to place their ships later.

// const playerOne = new Player();
// const playerTwo = new Player();

const arrayOne = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

// Place ships on the gameboard
arrayOne[0][0] = 'ship'; // Ship size 5 starting at (0,0) horizontally
arrayOne[1][0] = 'ship';
arrayOne[2][0] = 'ship';
arrayOne[3][0] = 'ship';
arrayOne[4][0] = 'ship';

arrayOne[0][2] = 'ship'; // Ship size 4 starting at (0,2) vertically
arrayOne[0][3] = 'ship';
arrayOne[0][4] = 'ship';
arrayOne[0][5] = 'ship';

arrayOne[6][5] = 'ship'; // Ship size 3 starting at (6,5) horizontally
arrayOne[7][5] = 'ship';
arrayOne[8][5] = 'ship';

arrayOne[8][7] = 'ship'; // Ship size 3 starting at (8,7) vertically
arrayOne[8][8] = 'ship';
arrayOne[8][9] = 'ship';

arrayOne[4][7] = 'ship'; // Ship size 2 starting at (4,7) horizontally
arrayOne[4][8] = 'ship';

const arrayTwo = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

// Place ships on the gameboard
arrayTwo[0][0] = 'ship'; // Ship size 5 starting at (0,0) vertically
arrayTwo[0][1] = 'ship';
arrayTwo[0][2] = 'ship';
arrayTwo[0][3] = 'ship';
arrayTwo[0][4] = 'ship';

arrayTwo[3][1] = 'ship'; // Ship size 4 starting at (3,1) vertically
arrayTwo[3][2] = 'ship';
arrayTwo[3][3] = 'ship';
arrayTwo[3][4] = 'ship';

arrayTwo[1][7] = 'ship'; // Ship size 3 starting at (1,7) horizontally
arrayTwo[2][7] = 'ship';
arrayTwo[3][7] = 'ship';

arrayTwo[7][3] = 'ship'; // Ship size 3 starting at (7,3) horizontally
arrayTwo[8][3] = 'ship';
arrayTwo[9][3] = 'ship';

arrayTwo[8][8] = 'ship'; // Ship size 2 starting at (8,8) horizontally
arrayTwo[9][8] = 'ship';


// We’ll leave the HTML implementation up to you for now,
// but you should display both the player’s boards and render them using information from the Gameboard class/factory.
//      // You need methods to render the gameboards and to take user input for attacking.
//      // For attacks, let the user click on a coordinate in the enemy Gameboard.

const gameBoardPlayerOne = document.querySelector('#player-one-gameboard');
const gameBoardPlayerTwo = document.querySelector('#player-two-gameboard');

generateGridCells(arrayOne, gameBoardPlayerOne);
generateGridCells(arrayTwo, gameBoardPlayerTwo);


// The game loop should step through the game turn by turn using only methods from other objects.
// If at any point you are tempted to write a new function inside the game loop, step back and figure out
// which class or module that function should belong to.

// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.
