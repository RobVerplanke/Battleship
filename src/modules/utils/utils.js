const Ship = require('../battleship.js');

// Used for creating ship 'parts' when one ship has to be placed over multiple cells
function shipFactory(shipSize, orientation) {
  return new Ship(shipSize, orientation);
}

// Generate random number within gameboard boundaries
function getRandomInt(boardSize) {
  return Math.floor(Math.random() * boardSize);
}

// Adds a sunken ship to the list of all sunken ships
function validateCellValue(allSunkenShipsList, cellValue) {
  const newList = allSunkenShipsList;

  if (cellValue instanceof Ship) { // Cell contains (part of) a ship
    const ship = cellValue;
    if (ship.isSunk()) newList.add(ship); // Add sunken ship to list
  }

  return newList;
}

// Reports when all ships on one of the boards are sunken
function isGameOver(gameboardOne, gameboardTwo) {
  return gameboardOne.getAllShipsSunkState() || gameboardTwo.getAllShipsSunkState();
}

module.exports = {
  shipFactory,
  validateCellValue,
  getRandomInt,
  isGameOver,
};
