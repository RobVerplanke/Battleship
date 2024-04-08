const Ship = require('../battleship.js');

// Used for creating ship 'parts' when one ship has to be placed over multiple cells
function shipFactory(shipSize, orientation) {
  return new Ship(shipSize, orientation);
}

// Generate random number within gameboard boundaries
function getRandomInt(boardSize) {
  return Math.floor(Math.random() * boardSize);
}

// Reports when all ships on one of the boards are sunken
function isGameOver(gameboard) {
  if (gameboard.getAllShipsSunkState()) return true;
  return false;
}

module.exports = {
  shipFactory,
  getRandomInt,
  isGameOver,
};
