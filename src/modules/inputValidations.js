/* eslint-disable max-len */

// Validate coordinates, ship size and orientation arguments
function validatePlacementInput(gameBoard, axisX, axisY, shipSize, orientation) {
  if (axisX === undefined || axisY === undefined || shipSize === undefined) throw new Error('Input is incomplete'); // Check for empty input
  if (axisX < 0 || axisX >= gameBoard.boardSize || axisY < 0 || axisY >= gameBoard.boardSize) throw new Error('Invalid coordinate'); // Check for invalid coordinates
  if (typeof axisX !== 'number' || typeof axisY !== 'number' || typeof shipSize !== 'number') throw new Error('Input is not a number'); // Check for valid datatype
  if (shipSize < 2 || shipSize > 5) throw new Error('Invalid ship size'); // Check for invalid ship size
  if (orientation !== 'horizontal' && orientation !== 'vertical') throw new Error('Invalid orientation'); // Check for valid orientation
}

// Validate coordinates of an incoming attack
function validateAttackCoords(gameBoard, axisX, axisY) {
  if (axisX === undefined || axisY === undefined) throw new Error('Attack input is incomplete'); // Check for empty input
  if (axisX < 0 || axisX >= gameBoard.boardSize || axisY < 0 || axisY >= gameBoard.boardSize) throw new Error('Attack exceeds board boundries'); // Check for invalid coordinates
  if (typeof axisX !== 'number' || typeof axisY !== 'number') throw new Error('Attack input is not a number'); // Check for valid datatype
}

// Check if the complete ship fits on the board at a given coordinate
function checkPlacementBoardBoundries(gameBoard, axisX, axisY, shipSize, orientation) {
  if (orientation === 'horizontal' && axisX + shipSize > gameBoard.boardSize) throw new Error('Ship exceeds board limits'); // Exceeds horizontal board boundry
  if (orientation === 'vertical' && axisY + shipSize > gameBoard.boardSize) throw new Error('Ship exceeds board limits'); // Exceeds vertical board boundry
}

// Check if the ship overlaps another placed ship
function checkPlacementShipOverlap(gameBoard, axisX, axisY, shipSize, orientation) {
  for (let i = 0; i < shipSize; i++) {
    if (orientation === 'horizontal' && gameBoard.grid[axisX + i][axisY] !== 'empty') throw new Error('Ships overlapping'); // Placing the ship horizontally crosses at least one 'not empty' cell
    if (orientation === 'vertical' && gameBoard.grid[axisX][axisY + i] !== 'empty') throw new Error('Ships overlapping'); // Placing the ship vertically crosses at least one 'not empty' cell
  }
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
  checkPlacementBoardBoundries,
  checkPlacementShipOverlap,
//   validateCoordinates,
//   validateOrientation,
//   validateShipSize,
};
