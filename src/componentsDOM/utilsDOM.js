const Ship = require('../modules/battleship.js');

// Create new cell
function createNewElement(element) {
  return document.createElement(element);
}

// Set coordinates as data-attribute value
function setCellDataCoordinateAttribute(cell, axisX, axisY) {
  cell.setAttribute('data-coordinate', [axisY, axisX - 1]);
}

// Set data-attribute on cells that contain a ship
function setCellDataShipAttribute(cell) {
  cell.setAttribute('data-hasShip', true);
}

// Add a class to the give element
function addElementClass(element, className) {
  element.classList.add(className);
}

// Set the value of an attacked cell that was empty to 'X'
function setMissedCellContent(cell) {
  const currentCell = cell;
  currentCell.innerHTML = '&times';
}

// Called when a cell is attacked to set the corresponding class
function addCellClass(cell) {

  // Visually hihglight attacked cell when it contains a ship
  if (cell.getAttribute('data-hasShip')) {

    // Add class
    addElementClass(cell, 'gridcell-ship-hit');

  } else { // Visually deactivate attacked cell when it's empty

    // Mark cell with a 'X' and change background color
    setMissedCellContent(cell);
    addElementClass(cell, 'gridcell-missed');
  }
}

// Adds a sunken ship to the list of sunken ships
function validateCellValue(allSunkenShipsList, cellValue) {
  const newList = allSunkenShipsList;

  if (cellValue instanceof Ship) { // Cell contains (part of) a ship
    const ship = cellValue;

    // Add sunken ship to list
    if (ship.isSunk()) newList.add(ship);
  }

  return newList;
}

// Listen for attacks on the cell
function setEventListener(currentPlayer, cell) {
  cell.addEventListener('click', () => {

    // Get the corresponing coordinates as string
    const coordinates = cell.getAttribute('data-coordinate');

    // Send attack request from active player to game control
    currentPlayer.sendAttack(Number(coordinates[0]), Number(coordinates[2]), cell);
  });
}

module.exports = {
  createNewElement,
  setCellDataCoordinateAttribute,
  setCellDataShipAttribute,
  addElementClass,
  addCellClass,
  setMissedCellContent,
  validateCellValue,
  setEventListener,
};
