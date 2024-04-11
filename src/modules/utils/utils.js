const Ship = require('../battleship.js');

// Used for creating ship 'parts' when one ship has to be placed over multiple cells
function shipFactory(shipSize, orientation) {
  return new Ship(shipSize, orientation);
}

// Generate random number within gameboard boundaries
function getRandomInt(boardSize) {
  return Math.floor(Math.random() * boardSize);
}

// Generate a random orientation when ships are placed ramdonly
function getRandomOrientation() {
  const orientations = ['horizontal', 'vertical'];
  const randomIndex = Math.floor(Math.random() * orientations.length);
  const randomOrientation = orientations[randomIndex];
  return randomOrientation;
}

// Reports when all ships on one of the boards are sunken
function isGameOver(gameboard) {
  if (gameboard.getAllShipsSunkState()) return true;
  return false;
}

module.exports = {
  shipFactory,
  getRandomInt,
  getRandomOrientation,
  isGameOver,
};
