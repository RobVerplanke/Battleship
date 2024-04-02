/* eslint-disable class-methods-use-this */
const validateInput = require('./utils/validateInput.js');
const utils = require('./utils/utils.js');

const BOARD_SIZE = 10;

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

  // Check if it's players turn to play
  _getActiveState() {
    return this.active;
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
  generateRandomCoordinate() {
    const newCoordinate = [];
    let axisX = null;
    let axisY = null;

    // Keep generating a coordinate until it's valid
    axisX = utils.getRandomInt(BOARD_SIZE);
    axisY = utils.getRandomInt(BOARD_SIZE);

    // Prevent that a grid cell is attacked more than once
    this._validateSentAttacks(axisX, axisY);

    // Add valid coordinate to list
    newCoordinate.push(axisX, axisY);

    return newCoordinate;
  }

  // Send a attack to a specific grid cell
  sendAttack(axisX, axisY) {

    // Only allowed to play when it's players turn
    if (!this._getActiveState()) throw new Error('It\'s not your turn!');

    // Check if values are valid coordinates on the board
    validateInput.validateCoordinates(axisX, axisY, BOARD_SIZE);

    // Prevent that a grid cell is attacked more than once
    this._validateSentAttacks(axisX, axisY);

    // Send attack to opponents gameboard

    // Store attacked coordinates
    this._setSentAttacks(axisX, axisY);

    // Switch players turns
    this.toggleActiveState();

    return true;
  }
}

module.exports = Player;
