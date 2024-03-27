/* eslint-disable no-useless-catch */

const Ship = require('./battleship.js');
const validateInput = require('./utils/validateInput.js');
const validatePlacement = require('./utils/validatePlacement.js');

const SHIP_AMOUNT = 5; // Default amount of ships for each player

class Gameboard {
  constructor() {
    this.boardSize = 10; // Width and height
    this.grid = []; // The game board represented as a 2D array
    this.missedAttacks = []; // Tracks missed attacks
    this.allShipsSunk = false; // Indicates whether or not all ships are sunk

    this._buildGameBoard(); // Initialize the game board
  }

  // Build the game board grid as a 2D-array
  _buildGameBoard() {
    for (let i = 0; i < this._getBoardSize(); i++) {
      this._getGrid()[i] = [];
      for (let j = 0; j < this._getBoardSize(); j++) {
        this._setCellValue(i, j, 'empty'); // Initialize each cell as 'empty'
      }
    }
  }

  // Return size of the board
  _getBoardSize() {
    return this.boardSize;
  }

  // Return the grid array
  _getGrid() {
    return this.grid;
  }

  // Return the 'missed attacks' array
  _getMissedAttacks() {
    return this.missedAttacks;
  }

  // Store coordinates of a missed received attack
  _setMissedAttack(axisX, axisY) {
    this._getMissedAttacks().push([axisX, axisY]);
  }

  // Return whether or not al shinks are sunk // FOR TESTING
  _getAllShipsSunkState() {
    return this.allShipsSunk;
  }

  // Called when last ship on the board has sunk
  _setAllShipsSunkState(newState) {
    this.allShipsSunk = newState;
  }

  // Iterate through the grid cells and calculate whether or not all the total amount of ships are sunk
  _validateAllShipsSunkState() {
    const allSunkShipsList = new Set();

    // iterate through cells and store every ship that is sunk
    for (let i = 0; i < this._getBoardSize(); i++) {
      for (let j = 0; j < this._getBoardSize(); j++) {
        const cellValue = this._getGrid()[i][j];
        if (cellValue instanceof Ship) {
          const ship = cellValue;
          if (ship.isSunk()) allSunkShipsList.add(ship);
        }
      }
    }

    // All the ships sunk
    if (allSunkShipsList.size === SHIP_AMOUNT) this._setAllShipsSunkState(true);
  }

  // Used for creating ship 'parts' when one ship has to be placed over multiple cells
  static _shipFactory(shipSize, orientation) {
    return new Ship(shipSize, orientation);
  }

  // Send hit message, check if the ship is sunk as a result of this hit
  // Then validate whether or not it was the last ship on the board
  static _sendHit(gameBoard, targetedShip) {
    targetedShip.hit(); // Send a 'hit' message to the ship that was attacked

    // If the ship has sunk, check if there are other ships left
    if (targetedShip.isSunk()) {
      if (gameBoard._validateAllShipsSunkState()) {
        gameBoard._setAllShipsSunkState(true);
      }
    }
  }

  // Returns the value of the corresponding grid cell
  _getCellValue(axisX, axisY) {
    return this._getGrid()[axisX][axisY];
  }

  // Set the value of a single cell
  _setCellValue(axisX, axisY, value) {
    this._getGrid()[axisX][axisY] = value;
  }


  // Add a ship to the grid at the given coordinates
  _addShipToGrid(axisX, axisY, shipSize, orientation) {
    const newShip = Gameboard._shipFactory(shipSize, orientation);

    if (orientation === 'horizontal') { // Spread ship horizontally over grid cells
      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX + i, axisY, newShip);
    } else if (orientation === 'vertical') { // Spread ship vertically over grid cells
      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX, axisY + i, newShip);
    }
  }


  // Check input, create a new ship instance and call method that directly adds it to the grid
  placeShip(axisX, axisY, shipSize, orientation) {

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(this._getBoardSize(), axisX, axisY);

    // Check if size of ship is valid
    validateInput.validateShipSize(shipSize);

    // Check if orientation is valid
    validateInput.validateOrientation(orientation);

    // Validate placement: Prevent that ships are placed outside the board boundaries
    validatePlacement.checkBoardBoundaries(this._getBoardSize(), axisX, axisY, shipSize, orientation);

    // Validate placement: Prevent that ships overlap each other
    validatePlacement.checkShipOverlap(this, axisX, axisY, shipSize, orientation);

    // All values and the placement conditions are validated, add a ship to the grid
    this._addShipToGrid(axisX, axisY, shipSize, orientation);
  }


  // Determine whether a attack was succesful or not.
  // In case of a hit tell the ship it is hit, else store the coordinates of the missed attack
  receiveAttack(axisX, axisY) {

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(this._getBoardSize(), axisX, axisY);

    // Get the cell that reveived an attack, it can only be 'empty' or a ship object
    const attackedCell = this._getCellValue(axisX, axisY);

    if (attackedCell instanceof Ship) { // The attack hit a ship
      const gameBoard = this;
      Gameboard._sendHit(gameBoard, attackedCell); // Send 'hit' message to the corresponding ship
      return true;
    }

    // Attack didn't hit a ship
    this._setMissedAttack(axisX, axisY); // Store coordinates of the missed attack
    return false;
  }
}

module.exports = Gameboard;
