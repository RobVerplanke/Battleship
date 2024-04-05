const Ship = require('../modules/battleship.js');
const utilsDOM = require('./utilsDOM.js');

const BOARD_SIZE = 10;

class GameboardDOM {
  constructor(element) {
    this.element = document.querySelector(element); // Corresponding gameboard holder in the DOM
    this.boardSize = BOARD_SIZE; // Width and height
  }

  // Return the board element
  _getBoard() {
    return this.element;
  }

  // Return the board size
  _getBoardSize() {
    return this.boardSize;
  }

  // Add cell elements to the gameboard element
  _addCellToBoard(cell) {
    this._getBoard().append(cell);
  }

  // Create grid of cells, based on the grid of the given main gameboard
  generateGridCells(gameboard, player) {

    // Iterate through all grid cells of the main gameboard
    for (let i = this._getBoardSize(); i > 0; i--) {
      for (let j = 0; j < this._getBoardSize(); j++) {
        const cell = utilsDOM.createNewElement('div'); // Create a new cell in the DOM for each grid cell

        // Set coordinates as data-attribute value
        utilsDOM.setCellDataCoordinateAttribute(cell, i, j);

        // Validate the cell grid value at the current coordinates
        if (gameboard.getGrid()[j][i - 1] instanceof Ship) { // Grid cell contains a ship

          utilsDOM.setCellDataShipAttribute(cell); // Set data-attribute so it can be recognized as ship
          utilsDOM.addElementClass(cell, 'gridcell-ship'); // Add 'ship'-class to highlight players ships
          utilsDOM.setEventListener(player, cell); // Listen for attacks

        } else { // Grid cell is empty
          utilsDOM.addElementClass(cell, 'gridcell'); // Add default style if cell is empty
          utilsDOM.setEventListener(player, cell); // Listen for attacks
        }

        // Add cell to the DOM-gameboard
        this._addCellToBoard(cell);
      }
    }
  }
}

module.exports = GameboardDOM;

