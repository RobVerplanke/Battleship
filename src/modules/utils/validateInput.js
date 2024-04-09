/* eslint-disable max-len */

const Gameboard = require('../gameboard.js'); // Only used to validate data-type

// Check if given coordinates are actual coordinates on the board
function validateCoordinates(axisX, axisY, boardSize = 10) {

  // Values are undefined or not a number
  if (axisX === undefined || axisY === undefined
    || typeof axisX !== 'number' || typeof axisY !== 'number') {
    throw new Error('Input is invalid'); // Check for valid datatype
  }

  // Values must fit on the gameboard
  if (axisX < 0 || axisX >= boardSize || axisY < 0 || axisY >= boardSize) {
    throw new Error('Coordinate exceeds board boundaries'); // Check for invalid coordinates
  }
}

// Check if given ship size is a valid size
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

// Check if gameboard is defined and an instance of the Gameboard class
function validateGameBoard(gameBoard) {
  if (gameBoard === undefined) throw new Error('Input is incomplete');
  if (!(gameBoard instanceof Gameboard)) throw new Error('Input is invalid');
}

// Check if players are defined and objects
function validatePlayerValue(player) {
  if (player === undefined || typeof player !== 'object') throw new Error('Missing player');
}

// Compare coordinate with coordinates that were already attacked by player
function validateSentAttacks(player, axisX, axisY) {
  if (player.getSentAttacks().find((coordinate) => JSON.stringify(coordinate) === JSON.stringify([axisX, axisY]))) {
    return false;
  }
  return true;
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
