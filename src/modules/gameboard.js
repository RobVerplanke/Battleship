/* eslint-disable no-useless-catch */

const Ship = require('./battleship.js');
const inputValidations = require('./utils/validateInput.js');
const placementValidations = require('./utils/validatePlacement.js');


class Gameboard {
  constructor() {
    this.boardSize = 10; // Width/height
    this.grid = []; // The game board represented as a 2D array
    this.missedAttacks = []; // Tracks missed attacks
    this.allShipsSunk = false; // Indicates whether all ships are sunk

    this.buildGameBoard(); // Initialize the game board
  }

  // Return the size of the board
  getBoardSize() {
    return this.boardSize;
  }

  // Return the grid array
  getGrid() {
    return this.grid;
  }

  // Set the value of a single cell
  setCellValue(axisX, axisY, value) {
    this.grid[axisX][axisY] = value;
  }

  getCellValue(axisX, axisY) {
    return this.grid[axisX][axisY];
  }

  // Build the game board grid as a 2D-array
  buildGameBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.setCellValue(i, j, 'empty'); // Initialize each cell as empty
      }
    }
  }

  // Store coordinates of a missed received attack
  addMissedAttack(coord) {
    this.missedAttacks.push(coord);
  }

  // Add a ship to the grid at the given coordinates
  addShipToGrid(axisX, axisY, shipSize, orientation) {

    if (orientation === 'horizontal') {
      // Spread ship horizontally over grid cells
      for (let i = 0; i < shipSize; i++) this.setCellValue(axisX + i, axisY, new Ship(shipSize, orientation));

    } else if (orientation === 'vertical') {
      // Spread ship vertically over grid cells
      for (let i = 0; i < shipSize; i++) this.setCellValue(axisX, axisY + i, new Ship(shipSize, orientation));
    }
  }

  // Check input, create a new ship instance and call method that directly adds it to the grid
  placeShip(axisX, axisY, shipSize, orientation) {

    try { // Validate arguments

      inputValidations.validateCoordinates(this.getBoardSize(), axisX, axisY); // Check if values are valid coordinates on the board

      inputValidations.validateShipSize(shipSize); // Check if size of ship is valid

      inputValidations.validateOrientation(orientation); // Check if orientation is valid

      // Placement: Prevent that ship is placed outside the board
      placementValidations.checkBoardBoundaries(this.getBoardSize(), axisX, axisY, shipSize, orientation);

      // Placement: Prevent ship to overlap excisting ship
      placementValidations.checkShipOverlap(this, axisX, axisY, shipSize, orientation);

    } catch (error) {
      // Stop execution and throw error message
      throw error;
    }

    // All values and the placement conditions are valid, add ship to the grid
    this.addShipToGrid(axisX, axisY, shipSize, orientation);
  }

  // Determine whether a attack was succesful or not.
  // In case of a hit tell the ship it is hit, else store the coordinates of the missed attack
  receiveAttack(axisX, axisY) {

    try { // Check if values are valid coordinates on the board
      inputValidations.validateCoordinates(this.getBoardSize(), axisX, axisY);
    } catch (error) {
      throw error;
    }

    // Grid cell that reveived an attack, can only be 'empty' or a ship object
    const attackedCell = this.getCellValue(axisX, axisY);

    if (attackedCell !== 'empty') { // The attack hit a ship
      attackedCell.hit(); // Send 'hit' message to corresponding ship
      return true;
    }

    // Attack didn't hit a ship
    this.addMissedAttack([axisX, axisY]); // Store coordinates of missed attack
    return false;
  }
}

module.exports = Gameboard;
