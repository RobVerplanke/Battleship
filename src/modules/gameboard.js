/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
const Ship = require('./battleship.js');

const validatePlacement = require('./utils/validatePlacement.js');
const utils = require('./utils/utils.js');

const SHIP_AMOUNT = 5; // Default amount of ships for each player
const BOARD_SIZE = 10;


class Gameboard {
  constructor(name) {
    this.name = name;
    this.boardSize = BOARD_SIZE; // Width and height
    this.grid = []; // The game board represented as a 2D array
    this.missedAttacks = new Set(); // Tracks missed attacks
    this.allShipsSunk = false; // Indicates whether or not all ships have sunk
    this.active = false; // Determines this board is active

    this._buildGameBoard(); // Initialize the game board
  }

  // Build the game board as a 2D-array grid
  _buildGameBoard() {
    for (let i = 0; i < this.getBoardSize(); i++) {
      this.getGrid()[i] = [];
      for (let j = 0; j < this.getBoardSize(); j++) {
        this._setCellValue(i, j, 'empty'); // Initialize each cell as 'empty'
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

  // Called when last ship on the board has sunk
  _setAllShipsSunkState(newState) {
    this.allShipsSunk = newState;
  }

  // Iterate through grid cells and store every ship that is sunk
  _getAllSunkenShips() {
    const allSunkenShipsList = new Set(); // List of all sunken ships

    for (let i = 0; i < this.getBoardSize(); i++) {
      for (let j = 0; j < this.getBoardSize(); j++) {
        utils.validateCellValue(allSunkenShipsList, this.getGrid()[i][j]);
      }
    }
    return allSunkenShipsList;
  }

  // Validate whether or not all ships on the board are sunk
  _validateAllShipsSunkState() {
    const allSunkenShipsList = this._getAllSunkenShips(); // List of all sunken ships

    // Check if the amount of sunken ships is the same as the total amount of ships
    if (allSunkenShipsList.size === SHIP_AMOUNT && !this.getAllShipsSunkState()) {
      this._setAllShipsSunkState(true); // Send message to the gameboard that all ships are sunk
      return true;
    }
    return false;
  }

  // Send hit message to attacked ship, check if it sunk as a result of this hit,
  // then validate whether or not it was the last surviving ship on the board
  _sendHit(gameBoard, targetedShip) {
    targetedShip.hit(); // Send a 'hit' message to the ship that was attacked

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

    // Must be placed here for tests to work
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

    // All values and the placement conditions are validated, add a ship to the grid
    this._addShipToGrid(axisX, axisY, shipSize, orientation);
  }


  // Gameboard reveived an attack, determine whether or not an attack was succesful
  // In case of a hit tell the ship it was hit, else store the coordinates of the missed attack
  receiveAttack(axisX, axisY) {

    // Must be placed here for tests to work
    const validateInput = require('./utils/validateInput.js');

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(axisX, axisY);

    // Check the cell that reveived an attack, it can only be 'empty' or a ship
    const attackedCell = this._getCellValue(axisX, axisY);

    if (attackedCell instanceof Ship) { // The attack hit a ship
      const gameBoard = this;
      this._sendHit(gameBoard, attackedCell); // Send 'hit' message to the corresponding ship
      return true;
    }

    // The attack missed a ship
    return false;
  }
}

module.exports = Gameboard;

