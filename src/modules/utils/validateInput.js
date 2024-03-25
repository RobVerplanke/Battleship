/* eslint-disable max-len */

// Validate coordinates, ship size and orientation arguments
function validatePlacementInput(gameBoard, axisX, axisY, shipSize, orientation) {
  if (axisX === undefined || axisY === undefined || shipSize === undefined) throw new Error('Input is incomplete'); // Check for empty input
  if (axisX < 0 || axisX >= gameBoard || axisY < 0 || axisY >= gameBoard) throw new Error('Invalid coordinate'); // Check for invalid coordinates
  if (typeof axisX !== 'number' || typeof axisY !== 'number' || typeof shipSize !== 'number') throw new Error('Input is not a number'); // Check for valid datatype
  if (shipSize < 2 || shipSize > 5) throw new Error('Invalid ship size'); // Check for invalid ship size
  if (orientation !== 'horizontal' && orientation !== 'vertical') throw new Error('Invalid orientation'); // Check for valid orientation
}

// Validate coordinates of an incoming attack
function validateAttackCoords(gameBoard, axisX, axisY) {
  if (axisX === undefined || axisY === undefined) throw new Error('Attack input is incomplete'); // Check for empty input
  if (axisX < 0 || axisX >= gameBoard || axisY < 0 || axisY >= gameBoard) throw new Error('Attack exceeds board boundaries'); // Check for invalid coordinates
  if (typeof axisX !== 'number' || typeof axisY !== 'number') throw new Error('Attack input is not a number'); // Check for valid datatype
}


// Reorganize

// function validateCoordinates(gameBoard, axisX, axisY) {
//   if (axisX === undefined || axisY === undefined) throw new Error('Input is incomplete'); // Check for empty input
//   if (axisX < 0 || axisX >= gameBoard.boardSize || axisY < 0 || axisY >= gameBoard.boardSize) throw new Error('Invalid coordinate'); // Check for invalid coordinates
//   if (typeof axisX !== 'number' || typeof axisY !== 'number' || typeof shipSize !== 'number') throw new Error('Input is not a number'); // Check for valid datatype
// }

// function validateOrientation(orientation) {
//   if (orientation !== 'horizontal' && orientation !== 'vertical') throw new Error('Invalid orientation'); // Check for valid orientation
// }


// function validateShipSize(size) {
//   if (size < 2 || size > 5) throw new Error('Invalid ship size'); // Check for invalid ship size

// }

module.exports = {
  validatePlacementInput,
  validateAttackCoords,
//   validateCoordinates,
//   validateOrientation,
//   validateShipSize,
};
