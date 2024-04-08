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


  // Switch players turns, called after each validated attack
  _togglePlayersActiveStates() {
    this.playerOne.active = !this.playerOne.active;
    this.playerTwo.active = !this.playerTwo.active;
  }

  // Returns the opponents gameboard
  _getOpponentGameboard(currentPlayer) {
    return (currentPlayer === this.playerOne) ? this.gameboardTwo : this.gameboardOne;
  }

  // Used in validation functions to check if coordinates fit on the gameboard
  getBoardSize() {
    return this.boardSize;
  }

  // After game-over the board can be reset by clearing the stored data in the player and gameboard instances
  // The gameboard in the DOM will be build again based on the empty main gameboard
  resetGame() {

    // Remove all previous attacked coordinates and set player one as active player
    this.playerOne.sentAttacks = [];
    this.playerTwo.sentAttacks = [];
    this.playerOne.active = true;
    this.playerTwo.active = false;

    // Both gameboards begin with no sunken ships
    this.gameboardOne.allShipsSunk = false;
    this.gameboardTwo.allShipsSunk = false;

    // Clear all previous placed ships
    this.gameboardOne.clearGrid();
    this.gameboardTwo.clearGrid();

    // Clear all content from both gameboards in the DOM otherwise the new gameboard would be added and not replaced
    this.gameboardDOMOne.clearGameboard();
    this.gameboardDOMTwo.clearGameboard();

    // Players can place new ships

    // Place new ships after the game is reset
    this.gameboardOne.placeShip(4, 2, 5, 'horizontal');
    this.gameboardTwo.placeShip(6, 6, 2, 'vertical');

    // Initialize both gameboards in the DOM, based on the new (empty) main gameboards
    this.gameboardDOMOne.generateGridCells(this.gameboardOne, this.playerTwo);
    this.gameboardDOMTwo.generateGridCells(this.gameboardTwo, this.playerOne);

    // Make the gameboards clickable again
    utilsDOM.enablePointerEvents();

    // Make player one start

    // Update color of playernames to visualize who's turn it is (green/red)
    utilsDOM.resetActiveNameClass();
  }

  // Called when a player clicks a grid cell on the opponents gameboard in the DOM
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

  // Send the validated coordinates of the attack to the corresponding gameboard
  _performAttack(axisX, axisY, targetGameboard, cell) {

    // Call opponents gameboard with the attacked coordinates
    targetGameboard.receiveAttack(axisX, axisY);

    // Set the style of the attacked cell
    utilsDOM.addCellClass(cell);

    // Determine if game is over by validating both gameboards on their sunken ships state
    if (utils.isGameOver(this.gameboardOne)) utilsDOM.announceWinner(this.playerTwo);
    if (utils.isGameOver(this.gameboardTwo)) utilsDOM.announceWinner(this.playerOne);

    // Switch players turns after each attack
    this._togglePlayersActiveStates();

    // Update color of playernames to visualize who's turn it is (green/red)
    utilsDOM.togglePlayerActiveColors();
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

    // Update player names above the corresponding gameboard
    utilsDOM.updatePlayerNames(this.playerOne.name, this.playerTwo.name);

    // Set event listeners to the option-buttons
    utilsDOM.activateResetButton(this);

    // Give a option to let player one play againts the computer

  }
}

module.exports = GameController;
