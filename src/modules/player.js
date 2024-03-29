/* eslint-disable class-methods-use-this */
const validateInput = require('./utils/validateInput.js');
const commonFunctions = require('./utils/commonFunctions.js');

class Player {
  constructor(name = 'Player') {
    this.name = name; // Players name becomes 'Player' if no name was given
    this.active = false; // Determines this player is active
    this.sentAttacks = []; // Store coordinates of all previous attacks
    this.isHuman = true; // A player can be human or computer
  }

  // Get coordinates of all the placed attacks in this round
  _getSentAttacks() {
    return this.sentAttacks;
  }

  // Store attacked coordinates
  _setSentAttacks(axisX, axisY) {
    this.sentAttacks.push([axisX, axisY]);
  }

  // Switch role and play as computer from now on
  setPlayerAsComputer() {
    this.isHuman = false;
    this.name = 'Computer';
  }

  // Switch turns between players
  toggleActiveState() {
    this.active = !this.active;
  }

  // Compare coordinate with coordinates that were already attacked
  _validateSentAttacks(axisX, axisY) {
    if (this._getSentAttacks().find((coordinate) => JSON.stringify(coordinate) === JSON.stringify([axisX, axisY]))) {
      throw new Error('Cell already attacked!');
    }
  }

  // Generate a random valid coordinate to attack
  generateRandomCoordinate(gameBoard) {
    const newCoordinate = [];
    let axisX = null;
    let axisY = null;

    // Keep generating a coordinate until it's valid
    axisX = (commonFunctions.getRandomInt(gameBoard._getBoardSize()));
    axisY = (commonFunctions.getRandomInt(gameBoard._getBoardSize()));

    // Prevent that a grid cell is attacked more than once
    this._validateSentAttacks(axisX, axisY);

    // Add valid coordinate to list
    newCoordinate.push(axisX, axisY);

    return newCoordinate;
  }

  // Send a attack to a specific grid cell
  sendAttack(gameBoard, opponent, axisX, axisY) {

    // Check if gameboard value is actually a gameboard
    validateInput.validateGameBoard(gameBoard);

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(gameBoard._getBoardSize(), axisX, axisY);

    // Prevent that a grid cell is attacked more than once
    this._validateSentAttacks(axisX, axisY);

    // Send valided coordinates to a validated gameboard
    gameBoard.receiveAttack(axisX, axisY, this, opponent);

    // Store attacked coordinates
    this._setSentAttacks(axisX, axisY);

    return true;
  }
}

module.exports = Player;
