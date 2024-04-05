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

function setElementContent(cell) {
  const currentCell = cell;
  currentCell.innerHTML = '&times';
}

// Listen for attacks on the cell and add corresponding style classes
function setEventListener(currentPlayer, cell) {
  cell.addEventListener('click', () => {
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
  setElementContent,
  setEventListener,
};
