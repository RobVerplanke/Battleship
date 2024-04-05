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

// Set the value of an attacked cell that was empty to a cross
function setMissedCellContent(cell) {
  const currentCell = cell;
  currentCell.innerHTML = '&times';
}

// Listen for attacks on the cell
function setEventListener(currentPlayer, cell) {
  cell.addEventListener('click', () => {

    // Get the corresponing coordinates
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
  setMissedCellContent,
  setEventListener,
};
