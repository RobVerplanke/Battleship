/* eslint-disable class-methods-use-this */
const validateInput = require('./utils/validateInput.js');
const utils = require('./utils/utils.js');
const utilsDOM = require('../componentsDOM/utilsDOM.js');


class GameController {
  constructor(
    playerOne = {}, // Properties are empty by default
    playerTwo = {},
    gameBoardOne = {},
    gameBoardTwo = {},
    gameboardDOMOne = {},
    gameboardDOMTwo = {},
  ) {

    this.boardSize = 10; // Default gameboard size

    // Create a new set of players
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    // Create new main gameboards
    this.gameboardOne = gameBoardOne;
    this.gameboardTwo = gameBoardTwo;

    // Set gameboard size of both gameboards
    this.gameboardOne.boardSize = this.boardSize;
    this.gameboardTwo.boardSize = this.boardSize;

    // Create new gameboards in the DOM
    this.gameboardDOMOne = gameboardDOMOne;
    this.gameboardDOMTwo = gameboardDOMTwo;
  }


  // Switch players turns
  _togglePlayersActiveStates() {
    this.playerOne.active = !this.playerOne.active;
    this.playerTwo.active = !this.playerTwo.active;
  }

  // Returns the opponents gameboard
  _getOpponentGameboard(currentPlayer) {
    return (currentPlayer === this.playerOne) ? this.gameboardTwo : this.gameboardOne;
  }

  getBoardSize() {
    return this.boardSize;
  }

  // Handle incoming attack
  receiveAttackRequest(axisX, axisY, curentPlayer, cell) {

    // Check if current player is actve
    validateInput.validatePlayerActiveState(curentPlayer);

    // Validate coordinate values
    validateInput.validateCoordinates(axisX, axisY);

    // Check if cell is not already attacked
    validateInput.validateSentAttacks(curentPlayer, axisX, axisY);

    // Send validated data to perform the attack
    this._performAttack(axisX, axisY, this._getOpponentGameboard(curentPlayer), cell);
  }

  // Send hit message to corresponding gameboard
  _performAttack(axisX, axisY, targetGameboard, cell) {

    // Send attack to corresponding gameboard
    targetGameboard.receiveAttack(axisX, axisY);

    // Set the style of a cell after a attack
    utilsDOM.addCellClass(cell);

    // Check if all ships sunk on one of the gameboards
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
