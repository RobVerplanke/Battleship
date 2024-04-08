/* eslint-disable class-methods-use-this */

const validateInput = require('./utils/validateInput.js');
const utils = require('./utils/utils.js');

class Player {
  constructor(gameControl, name = 'Player') {
    this.name = name; // Players name becomes 'Player' if no name was given
    this.gameControl = gameControl; // Set the current game controller
    this.active = false; // Determines this player is active
    this.sentAttacks = []; // Store coordinates of all previous attacks
    this.isHuman = true; // A player can be human or computer
  }

  // Used to dertermine if a cell is already been attacked
  getSentAttacks() {
    return this.sentAttacks;
  }

  // Keep track of every attacked coordinate
  _setSentAttacks(axisX, axisY) {
    this.sentAttacks.push([axisX, axisY]);
  }

  // Used by game control to validate if it's players turn to play
  isActive() {
    return this.active;
  }

  // Switch turns between players after each valid attack
  toggleActiveState() {
    this.active = !this.active;
  }

  // Generate a random valid coordinate to attack
  generateRandomCoordinate() {
    const newCoordinate = [];
    let axisX = 0;
    let axisY = 0;

    // Keep generating a coordinate until it is valid
    while (validateInput.validateSentAttacks(this, axisX, axisY) === false) {
      axisX = utils.getRandomInt(this.gameControl.getBoardSize());
      axisY = utils.getRandomInt(this.gameControl.getBoardSize());
    }

    // Add valid coordinate to list
    newCoordinate.push(axisX, axisY);

    return newCoordinate;
  }

  // Send a attack to a specific grid cell
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
