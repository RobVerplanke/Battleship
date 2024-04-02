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
function validatePlayers(playerOne, playerTwo) {
  if (playerOne === undefined || typeof playerOne !== 'object'
    || playerTwo === undefined || typeof playerTwo !== 'object') {
    throw new Error('Missing player');
  }
}

function validateActivePlayer(activePlayer) {
  console.log('Not your turn!');
  if (!activePlayer.active) throw new Error('Not your turn!');
}

module.exports = {
  validateCoordinates,
  validateOrientation,
  validateShipSize,
  validateGameBoard,
  validatePlayers,
  validateActivePlayer,
};
