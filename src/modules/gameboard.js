/* eslint-disable no-useless-catch */
const Ship = require('./battleship.js');

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.grid = []; // The game board represented as a 2D array
    this.missedAttacks = []; // Tracks missed attacks
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

  // Validates coordinate, ship size and orientation arguments
  validateInput(axisX, axisY, shipSize, orientation) {
    if (axisX === undefined || axisY === undefined || shipSize === undefined) throw new Error('Input is incomplete'); // Check for empty input
    if (axisX < 0 || axisX >= this.boardSize || axisY < 0 || axisY >= this.boardSize) throw new Error('Invalid coordinate'); // Check for invalid coordinates
    if (typeof axisX !== 'number' || typeof axisY !== 'number' || typeof shipSize !== 'number') throw new Error('Input is not a number'); // Check for valid datatype
    if (shipSize < 2 || shipSize > 5) throw new Error('Invalid ship size'); // Check for invalid ship size
    if (orientation !== 'horizontal' && orientation !== 'vertical') throw new Error('Invalid orientation'); // Check for valid orientation
  }

  // Checks if ship can be placed within the board boundries
  checkBoardBoundries(axisX, axisY, shipSize, orientation) {
    if (orientation === 'horizontal' && axisX + shipSize > this.boardSize) throw new Error('Ship exceeds board limits'); // Exceeds horizontal board boundry
    if (orientation === 'vertical' && axisY + shipSize > this.boardSize) throw new Error('Ship exceeds board limits'); // Exceeds vertical board boundry
  }

  // Checks if the ship overlaps another placed ship
  checkPlacementOverlap(axisX, axisY, shipSize, orientation) {
    for (let i = 0; i < shipSize; i++) {
      if (orientation === 'horizontal' && this.grid[axisX + i][axisY] !== 'empty') throw new Error('Ships overlapping'); // Placing the ship horizontally crosses at least one 'not empty' cell
      if (orientation === 'vertical' && this.grid[axisX][axisY + i] !== 'empty') throw new Error('Ships overlapping'); // Placing the ship vertically crosses at least one 'not empty' cell
    }
  }

  // Adds a new ship instance to the grid at the specified coordinates with the given size
  placeShip(axisX, axisY, shipSize, orientation) {
    try {

      // Validate input values
      this.validateInput(axisX, axisY, shipSize, orientation);

      // Prevent that ship is placed outside the board
      this.checkBoardBoundries(axisX, axisY, shipSize, orientation);

      // Prevent ship to overlap excisting ship
      this.checkPlacementOverlap(axisX, axisY, shipSize, orientation);

      const newShip = new Ship(shipSize);

      // Place ship on given coordinates
      if (orientation === 'horizontal') {
        for (let i = 0; i < shipSize; i++) {
          this.grid[axisX + i][axisY] = newShip;
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < shipSize; i++) {
          this.grid[axisX][axisY + i] = newShip;
        }
      }
    } catch (error) {
      // Stop execution and throw a custom error message
      throw error;
    }
  }

  // receiveAttack() {

  // }

  // Gameboards should have a receiveAttack function that takes a pair of coordinates,
  // determines whether or not the
  // attack hit a ship and then sends the ‘hit’ function to the correct ship,
  // or records the coordinates of the missed shot.
}

module.exports = Gameboard;
