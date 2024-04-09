const Ship = require('../modules/battleship.js');
const utilsDOM = require('./utilsDOM.js');

const BOARD_SIZE = 10;

class GameboardDOM {
  constructor(element) {
    this.element = document.querySelector(element); // Corresponding gameboard holder in the DOM
    this.boardSize = BOARD_SIZE; // Width and height
  }

  clearGameboard() {
    this.element.innerHTML = '';
  }

  // Called when a new cell has to be added to the gameboard
  getBoard() {
    return this.element;
  }

  // Used to set the max boundaries of a gameboard when building it
  _getBoardSize() {
    return this.boardSize;
  }

  // Add a cell element to the gameboard element
  _addCellToBoard(cell) {
    this.getBoard().append(cell);
  }

  // Create grid of cells, based on the grid of the given main gameboard
  generateGridCells(gameboard, player) {

    // Create a new cell in the DOM for each grid cell on the main gameboard
    for (let i = this._getBoardSize(); i > 0; i--) {
      for (let j = 0; j < this._getBoardSize(); j++) {

        // New cell element in the DOM
        const cell = utilsDOM.createNewElement('div');

        // Set coordinates as data-attribute value
        utilsDOM.setCellDataCoordinateAttribute(cell, i, j);

        // Validate the cell grid value at the current coordinates
        if (gameboard.getGrid()[j][i - 1] instanceof Ship) {
          // Grid cell contains a ship

          // Set data-attribute so it can be recognized as ship
          utilsDOM.setCellDataShipAttribute(cell);

          // Add 'ship'-class to highlight players ships
          utilsDOM.addElementClass(cell, 'gridcell-ship');

        } else { // Grid cell is empty

          // Add default style if cell is empty
          utilsDOM.addElementClass(cell, 'gridcell');
        }

        // Listen for attacks
        utilsDOM.setEventListener(player, cell);

        // Add cell to the DOM-gameboard
        this._addCellToBoard(cell);
      }
    }
  }
}

module.exports = GameboardDOM;

