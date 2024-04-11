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

// Initialize both gameboards in the DOM
gameboardDOMOne.generateGridCells(gameboardOne, playerTwo, playerOne);
gameboardDOMTwo.generateGridCells(gameboardTwo, playerOne, playerTwo);

// Player one begins
playerOne.active = true;

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
