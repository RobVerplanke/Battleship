/* eslint-disable max-len */

// Check if given coordinates are actual coordinates on the board
function validateCoordinates(boardSize, axisX, axisY) {
  if (axisX === undefined || axisY === undefined || typeof axisX !== 'number' || typeof axisY !== 'number') throw new Error('Input is invalid'); // Check for valid datatype
  if (axisX < 0 || axisX >= boardSize || axisY < 0 || axisY >= boardSize) throw new Error('Coordinate exceeds board boundaries'); // Check for invalid coordinates
}

// Check if size is a valid size
function validateShipSize(size) {
  if (size === undefined || typeof size !== 'number' || size < 2 || size > 5) throw new Error('Invalid ship size'); // Check for empty input
}

// Check if given orientation is a valid orientation
function validateOrientation(orientation) {
  if (orientation !== 'horizontal' && orientation !== 'vertical') throw new Error('Invalid orientation'); // Check for valid orientation
}

module.exports = {
  validateCoordinates,
  validateOrientation,
  validateShipSize,
};
