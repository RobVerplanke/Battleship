// Check if the complete ship fits on the board at a given coordinate
function checkBoardBoundaries(gameBoard, axisX, axisY, shipSize, orientation) {

  if (orientation === 'horizontal' && axisX + shipSize > gameBoard) { // Exceeds horizontal board boundary
    throw new Error('Ship exceeds board limits');
  }

  if (orientation === 'vertical' && axisY + shipSize > gameBoard) { // Exceeds vertical board boundary
    throw new Error('Ship exceeds board limits');
  }
}

// Check if the ship overlaps another placed ship
function checkShipOverlap(gameBoard, axisX, axisY, shipSize, orientation) {

  for (let i = 0; i < shipSize; i++) { // Check the state of the cells in wich the ship is going to be placed

    if (orientation === 'horizontal' && gameBoard.getCellValue(axisX + i, axisY) !== 'empty') {
      // Placing the ship horizontally crosses at least one 'not empty' cell
      throw new Error('Ships overlapping');
    }

    if (orientation === 'vertical' && gameBoard.getCellValue(axisX, axisY + i) !== 'empty') {
      // Placing the ship vertically crosses at least one 'not empty' cell
      throw new Error('Ships overlapping');
    }
  }
}

module.exports = {
  checkBoardBoundaries,
  checkShipOverlap,
};
