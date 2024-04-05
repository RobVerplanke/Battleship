// Check if the complete ship fits on the board at a given coordinate
function checkBoardBoundaries(gameBoard, axisX, axisY, shipSize, orientation) {

  if (orientation === 'horizontal' && axisX + shipSize > gameBoard) {
    throw new Error('Ship exceeds board limits'); // Exceeds horizontal board boundary
  }

  if (orientation === 'vertical' && axisY + shipSize > gameBoard) {
    throw new Error('Ship exceeds board limits'); // Exceeds vertical board boundary
  }
}

// Check if the ship overlaps another placed ship
function checkShipOverlap(gameBoard, axisX, axisY, shipSize, orientation) {

  for (let i = 0; i < shipSize; i++) {

    if (orientation === 'horizontal' && gameBoard._getCellValue(axisX + i, axisY) !== 'empty') {
      // Placing the ship horizontally crosses at least one 'not empty' cell
      throw new Error('Ships overlapping');
    }

    if (orientation === 'vertical' && gameBoard._getCellValue(axisX, axisY + i) !== 'empty') {
      // Placing the ship vertically crosses at least one 'not empty' cell
      throw new Error('Ships overlapping');
    }
  }
}

module.exports = {
  checkBoardBoundaries,
  checkShipOverlap,
};
