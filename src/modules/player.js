/* eslint-disable class-methods-use-this */

const validateInput = require('./utils/validateInput.js');
const utils = require('./utils/utils.js');

const BOARD_SIZE = 10;

class Player {
  constructor(gameControl, name = 'Player') {
    this.name = name; // Players name becomes 'Player' if no name was given
    this.gameControl = gameControl; // Set the current game controller
    this.active = false; // Determines this player is active
    this.sentAttacks = []; // Store coordinates of all previous attacks
    this.isHuman = true; // A player can be human or computer
  }

  // Get coordinates of all the placed attacks
  getSentAttacks() {
    return this.sentAttacks;
  }

  // Store attacked coordinates
  _setSentAttacks(axisX, axisY) {
    this.sentAttacks.push([axisX, axisY]);
  }

  // Check if it's players turn to play
  isActive() {
    return this.active;
  }

  // Switch turns between players
  toggleActiveState() {
    this.active = !this.active;
  }

  // Compare coordinate with coordinates that were already attacked
  _validateSentAttacks(axisX, axisY) {
    if (this.getSentAttacks().find((coordinate) => JSON.stringify(coordinate) === JSON.stringify([axisX, axisY]))) {
      throw new Error('Cell already attacked!');
    }
  }

  // Generate a random valid coordinate to attack
  generateRandomCoordinate() {
    const newCoordinate = [];
    let axisX = 0;
    let axisY = 0;

    // Keep generating a coordinate until it's valid
    while (this._validateSentAttacks(axisX, axisY) === false) {
      axisX = utils.getRandomInt(BOARD_SIZE);
      axisY = utils.getRandomInt(BOARD_SIZE);
    }

    // Add valid coordinate to list
    newCoordinate.push(axisX, axisY);

    return newCoordinate;
  }

  // Send an attack to a specific grid cell
  sendAttack(axisX, axisY, cell) {

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(axisX, axisY);

    // Send attack to the game controller
    this.gameControl.receiveAttackRequest(axisX, axisY, this, cell);

    // Store attacked coordinates
    this._setSentAttacks(axisX, axisY);

    return false;
  }
}

module.exports = Player;
