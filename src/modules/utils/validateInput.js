/* eslint-disable max-len */

// Check if coordinates are usable for placement
function validateCoordinates(boardSize, axisX, axisY) {
  if (axisX === undefined || axisY === undefined || typeof axisX !== 'number' || typeof axisY !== 'number') throw new Error('Input is invalid'); // Check for valid datatype
  if (axisX < 0 || axisX >= boardSize || axisY < 0 || axisY >= boardSize) throw new Error('Coordinate exceeds board boundaries'); // Check for invalid coordinates
}

// Check if ship has the correct size
function validateShipSize(size) {
  if (size === undefined || typeof size !== 'number' || size < 2 || size > 5) throw new Error('Invalid ship size'); // Check for empty input
}

// Check if orientation is valid
function validateOrientation(orientation) {
  if (orientation !== 'horizontal' && orientation !== 'vertical') throw new Error('Invalid orientation'); // Check for valid orientation
}

module.exports = {
  validateCoordinates,
  validateOrientation,
  validateShipSize,
};
