/* eslint-disable no-useless-catch */
const Ship = require('./battleship.js');

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.grid = []; // The game board represented as a 2D array
    this.missedAttacks = null; // Tracks missed attacks, currently not used
    this.allShipsSunk = false; // Indicates whether all ships are sunk

    this.buildGameBoard(); // Initialize the game board
  }

  // Builds the game board grid
  buildGameBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.grid[i][j] = 'empty'; // Initialize each cell as empty
      }
    }
  }

  // Validates input coordinates and ship size
  validateInput(axisX, axisY, shipSize) {
    if (axisX === undefined || axisY === undefined || shipSize === undefined) throw new Error('Input is empty'); // Check for empty input
    if (axisX < 0 || axisX >= this.boardSize || axisY < 0 || axisY >= this.boardSize) throw new Error('Invalid coordinate'); // Check for invalid coordinates
    if (shipSize <= 0 || shipSize > 5) throw new Error('Invalid ship size'); // Check for invalid ship size
  }

  // Adds a new ship instance to the grid at the specified coordinates with the given size
  placeShip(axisX, axisY, shipSize) {
    try {
      // Validate input values
      this.validateInput(axisX, axisY, shipSize);

      // Place ship on given coordinates
      this.grid[axisX][axisY] = new Ship(shipSize);
    } catch (error) {
      // Stop execution and throw a custom error message
      throw error;
    }
  }
}

module.exports = Gameboard;
