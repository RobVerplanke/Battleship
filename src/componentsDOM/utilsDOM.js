// const Ship = require('../modules/battleship.js');

// Create new cell
function createNewElement(element) {
  return document.createElement(element); // Create a new cell
}

// Set coordinates as data-attribute value
function setCellDataCoordinateAttribute(cell, axisX, axisY) {
  cell.setAttribute('data-coordinate', [axisY, axisX - 1]); // Attach coordinates
}

function setCellDataShipAttribute(cell) {
  cell.setAttribute('data-hasShip', true); // Set state
}

// Add a different class if cell contains a ship
function addElementClass(element, className) {
  element.classList.add(className); // Add class of the corresponding element
}

// Listen for attacks on the cell and add corresponding style classes
function setEventListener(currentPlayer, cell) {
  cell.addEventListener('click', () => {
    const coordinates = cell.getAttribute('data-coordinate');
    const cellHasShip = cell.getAttribute('data-hasShip');

    // Hihglight attacked cell when it contains a ship
    if (cellHasShip) addElementClass(cell, 'gridcell-ship-hit');

    // Visually disable attacked cell when it's empty
    if (!cellHasShip) addElementClass(cell, 'gridcell-missed');

    // Send a attack
    currentPlayer.sendAttack(Number(coordinates[0]), Number(coordinates[2]));
  });
}

module.exports = {
  createNewElement,
  setCellDataCoordinateAttribute,
  setCellDataShipAttribute,
  addElementClass,
  setEventListener,
};
