/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */

const Ship = require('./battleship.js');

const validatePlacement = require('./utils/validatePlacement.js');
const utils = require('./utils/utils.js');
const utilsDOM = require('../componentsDOM/utilsDOM.js');

const SHIP_AMOUNT = 5; // Default amount of ships for each player

class Gameboard {
  constructor() {
    this.grid = []; // The game board represented as a 2D array
    this.boardSize = 10;
    this.allShipsSunk = false; // Indicates whether or not all ships are sunk

    this._buildGameBoard(); // Initialize the game board
  }

  // Build the game board as a 2D-array grid
  _buildGameBoard() {
    for (let i = 0; i < this.getBoardSize(); i++) {
      this.getGrid()[i] = [];
      for (let j = 0; j < this.getBoardSize(); j++) {
        this._setCellValue(i, j, 'empty'); // Initialize each cell value as 'empty'
      }
    }
  }

  // Return size of the board
  getBoardSize() {
    return this.boardSize;
  }

  // Return the grid array
  getGrid() {
    return this.grid;
  }

  // Returns the value of the corresponding grid cell
  _getCellValue(axisX, axisY) {
    return this.getGrid()[axisX][axisY];
  }

  // Set the value of a single cell
  _setCellValue(axisX, axisY, value) {
    this.getGrid()[axisX][axisY] = value;
  }

  // Return whether or not al ships are sunk
  getAllShipsSunkState() {
    return this.allShipsSunk;
  }

  // Set wheter or not all the ships on the are sunk
  _setAllShipsSunkState(newState) {
    this.allShipsSunk = newState;
  }

  // Return up to date list of all sunken ships
  _getAllSunkenShips() {
    const allSunkenShipsList = new Set();

    // Iterate through grid cells and store every ship that is sunk
    for (let i = 0; i < this.getBoardSize(); i++) {
      for (let j = 0; j < this.getBoardSize(); j++) {

        // Add sunken ships to the list
        utilsDOM.validateCellValue(allSunkenShipsList, this.getGrid()[i][j]);
      }
    }
    return allSunkenShipsList;
  }

  // Validate whether or not all ships on the board are sunk
  _validateAllShipsSunkState() {

    // List of all sunken ships
    const allSunkenShipsList = this._getAllSunkenShips();

    // Check if the amount of sunken ships is the same as the total amount of ships
    if (allSunkenShipsList.size === SHIP_AMOUNT) {

      // All ships on the gameboard are sunken
      this._setAllShipsSunkState(true);
      return true;
    }
    return false;
  }

  // Send hit message to attacked ship and check if it sunk as a result of this hit,
  _sendHit(gameBoard, targetedShip) {

    // Send a 'hit' message to the ship that was attacked
    targetedShip.hit();

    // If the ship has sunk, check if all ships are sunk now
    if (targetedShip.isSunk()) gameBoard._validateAllShipsSunkState();
  }


  // Add a ship to the grid at the given coordinates
  _addShipToGrid(axisX, axisY, shipSize, orientation) {
    const newShip = utils.shipFactory(shipSize, orientation);

    if (orientation === 'horizontal') { // Spread ship horizontally over grid cells
      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX + i, axisY, newShip);
    } else if (orientation === 'vertical') { // Spread ship vertically over grid cells
      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX, axisY + i, newShip);
    }
  }

  // Check input, create a new ship instance and add it to the grid
  placeShip(axisX, axisY, shipSize, orientation) {

    // Import must be placed here for tests to work
    const validateInput = require('./utils/validateInput.js');

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(axisX, axisY);

    // Check if size of ship is valid
    validateInput.validateShipSize(shipSize);

    // Check if orientation is valid
    validateInput.validateOrientation(orientation);

    // Validate placement: Prevent that ships are placed outside the board boundaries
    validatePlacement.checkBoardBoundaries(this.getBoardSize(), axisX, axisY, shipSize, orientation);

    // Validate placement: Prevent that ships overlap each other
    validatePlacement.checkShipOverlap(this, axisX, axisY, shipSize, orientation);

    // All values and the placement conditions are validated: add ship to the grid
    this._addShipToGrid(axisX, axisY, shipSize, orientation);
  }

  // Gameboard reveived a attack, determine whether or not a ship was hit
  receiveAttack(axisX, axisY) {

    // Import must be placed here for tests to work
    const validateInput = require('./utils/validateInput.js');

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(axisX, axisY);

    // Validate the cell that received an attack, it can only be 'empty' or a ship
    const attackedCell = this._getCellValue(axisX, axisY);

    if (attackedCell instanceof Ship) { // The cell contains a ship

      // Send 'hit' message to the corresponding ship
      this._sendHit(this, attackedCell);
      return true;
    }

    // The attack didn't hit a ship
    return false;
  }
}

module.exports = Gameboard;

