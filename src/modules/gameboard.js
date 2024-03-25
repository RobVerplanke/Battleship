/* eslint-disable no-useless-catch */

const Ship = require('./battleship.js');
const inputValidations = require('./inputValidations.js');

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.grid = []; // The game board represented as a 2D array
    this.missedAttacks = []; // Tracks missed attacks
    this.allShipsSunk = false; // Indicates whether all ships are sunk

    this.buildGameBoard(); // Initialize the game board
  }

  // Build the game board grid as a 2D-array
  buildGameBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.grid[i][j] = 'empty'; // Initialize each cell as empty
      }
    }
  }

  // Store coordinates of a missed received attack
  addMissedAttack(coord) {
    this.missedAttacks.push(coord);
  }

  // Add a ship to the grid at the given coordinates
  addShipToGrid(axisX, axisY, shipSize, orientation) {

    // Creat new ship
    const newShip = new Ship(shipSize, orientation);

    if (newShip.orientation === 'horizontal') {
      for (let i = 0; i < newShip.size; i++) {
        this.grid[axisX + i][axisY] = newShip; // Spread ship horizontally over grid cells
      }
    } else if (newShip.orientation === 'vertical') {
      for (let i = 0; i < newShip.size; i++) {
        this.grid[axisX][axisY + i] = newShip; // Spread ship vertically over grid cells
      }
    }
  }


  // Check input, create a new ship instance and call method that directly adds it to the grid
  placeShip(axisX, axisY, shipSize, orientation) {
    try {

      // validateCoordinates,
      // inputValidations.validateCoordinates(this, axisX, axisY);

      // validateOrientation,
      // inputValidations.validateOrientation(orientation);

      // validateShipSize,
      // inputValidations.validateShipSize(shipSize);


      // Validate input values
      inputValidations.validatePlacementInput(this, axisX, axisY, shipSize, orientation);

      // Prevent that ship is placed outside the board
      inputValidations.checkPlacementBoardBoundries(this, axisX, axisY, shipSize, orientation);

      // Prevent ship to overlap excisting ship
      inputValidations.checkPlacementShipOverlap(this, axisX, axisY, shipSize, orientation);

      // Input is valid, place ship on the grid at the given coordinates
      this.addShipToGrid(axisX, axisY, shipSize, orientation);

    } catch (error) {
      // Stop execution and throw error message
      throw error;
    }
  }


  // Determine whether a attack was succesful or not.
  // In case of a hit tell the ship it is hit, else store the coordinates of the missed attack
  receiveAttack(axisX, axisY) {
    try {

      // Validate coordinates of the attack
      inputValidations.validateAttackCoords(this, axisX, axisY);

    } catch (error) {
      throw error;
    }

    // Grid cell that reveived an attack, can only be 'empty' or a ship object
    const attackedCell = this.grid[axisX][axisY];

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
