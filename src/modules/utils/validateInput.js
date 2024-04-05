/* eslint-disable max-len */

const Gameboard = require('../gameboard.js'); // Only used to check if a gameboard argument is a instance of this class

// Check if given coordinates are actual coordinates on the board
function validateCoordinates(axisX, axisY, boardSize = 10) {

  if (axisX === undefined || axisY === undefined
    || typeof axisX !== 'number' || typeof axisY !== 'number') {
    throw new Error('Input is invalid'); // Check for valid datatype
  }

  if (axisX < 0 || axisX >= boardSize || axisY < 0 || axisY >= boardSize) {
    throw new Error('Coordinate exceeds board boundaries'); // Check for invalid coordinates
  }
}

// Check if size is a valid size
function validateShipSize(size) {

  if (size === undefined || typeof size !== 'number' || size < 2 || size > 5) {
    throw new Error('Invalid ship size'); // Check for empty input
  }
}

// Check if given orientation is a valid orientation
function validateOrientation(orientation) {
  if (orientation !== 'horizontal' && orientation !== 'vertical') {
    throw new Error('Invalid orientation'); // Check for valid orientation
  }
}

// Check if gameboard is defined and a instance of the Gameboard class
function validateGameBoard(gameBoard) {
  if (gameBoard === undefined) throw new Error('Input is incomplete');
  if (!(gameBoard instanceof Gameboard)) throw new Error('Input is invalid');
}

// Check if playernames are defined and are objects
function validatePlayerValue(player) {
  if (player === undefined || typeof player !== 'object') throw new Error('Missing player');
}

// Compare coordinate with coordinates that were already attacked
function validateSentAttacks(axisX, axisY, currentPlayer) {
  if (currentPlayer.getSentAttacks().find((coordinate) => JSON.stringify(coordinate) === JSON.stringify([axisX, axisY]))) {
    throw new Error('Cell already attacked!');
  }
  return false;
}

// Throw error when player is not active
function validatePlayerActiveState(player) {
  if (!player.isActive()) throw new Error('It\'s not your turn!');
}

module.exports = {
  validateCoordinates,
  validateOrientation,
  validateShipSize,
  validateGameBoard,
  validatePlayerValue,
  validateSentAttacks,
  validatePlayerActiveState,
};
