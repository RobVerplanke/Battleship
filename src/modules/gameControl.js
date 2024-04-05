/* eslint-disable class-methods-use-this */
const validateInput = require('./utils/validateInput.js');
const utils = require('./utils/utils.js');
const utilsDOM = require('../componentsDOM/utilsDOM.js');


class GameController {
  constructor(
    playerOne = {}, // Properties are empty if arguments are left empty
    playerTwo = {},
    gameBoardOne = {},
    gameBoardTwo = {},
    gameboardDOMOne = {},
    gameboardDOMTwo = {},
  ) {

    // Create a new set of players
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    // Create new main gameboards with its corresponding opponent
    this.gameboardOne = gameBoardOne;
    this.gameboardTwo = gameBoardTwo;

    // Create new gameboards in the DOM
    this.gameboardDOMOne = gameboardDOMOne;
    this.gameboardDOMTwo = gameboardDOMTwo;
  }

  _togglePlayersActiveStates() {
    this.playerOne.active = !this.playerOne.active;
    this.playerTwo.active = !this.playerTwo.active;
  }

  _getOpponentGameboard(currentPlayer) {
    if (currentPlayer === this.playerOne) return this.gameboardTwo;
    if (currentPlayer === this.playerTwo) return this.gameboardOne;
    return false;
  }

  receiveAttackRequest(axisX, axisY, curentPlayer, cell) {

    // Check if current player is actve
    validateInput.validatePlayerActiveState(curentPlayer);

    // Validate coordinate values
    validateInput.validateCoordinates(axisX, axisY);

    // Check if player has not already attacked this cell
    validateInput.validateSentAttacks(axisX, axisY, curentPlayer);

    // Send validated data to perform the attack
    this._performAttack(axisX, axisY, this._getOpponentGameboard(curentPlayer), cell);
  }

  // Send hit message to corresponding gameboard
  _performAttack(axisX, axisY, targetGameboard, cell) {

    // Send attack to corresponding gameboard
    targetGameboard.receiveAttack(axisX, axisY);

    // Visually hihglight attacked cell when it contains a ship
    if (cell.getAttribute('data-hasShip')) {
      utilsDOM.addElementClass(cell, 'gridcell-ship-hit');
    } else { // Visually disable attacked cell when it's empty
      utilsDOM.setElementContent(cell);
      utilsDOM.addElementClass(cell, 'gridcell-missed');
    }

    // Check if all ships sunk on one of the boards
    utils.isGameOver(this.gameboardOne, this.gameboardTwo);

    // Switch players turns
    this._togglePlayersActiveStates();
  }

  // Initialize the game
  startGame(
    playerOne,
    playerTwo,
    gameboardOne,
    gameboardTwo,
    gameboardDOMOne,
    gameboardDOMTwo,
  ) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.gameboardOne = gameboardOne;
    this.gameboardTwo = gameboardTwo;
    this.gameboardDOMOne = gameboardDOMOne;
    this.gameboardDOMTwo = gameboardDOMTwo;
  }
}

module.exports = GameController;
