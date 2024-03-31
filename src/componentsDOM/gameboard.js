const Ship = require('../modules/battleship.js');

// Fill the gameboard in the DOM with a grid based on the grid of the gameboard instance
function generateGridCells(gameboardInstance, opponentGameBoardDOM, activePlayer, opponent) {

  // Iterate through the grid of the gameboard instance
  for (let i = gameboardInstance.getBoardSize(); i > 0; i--) {
    for (let j = 0; j < gameboardInstance.getBoardSize(); j++) {

      const cell = document.createElement('div'); // Create a new cell for each grid coordinate
      cell.classList.add('gridcell'); // Set default style on each cell
      cell.setAttribute('data-coordinate', [j, i - 1]); // Attach coordinates to data attribute

      // Add event listener that listens for attacks on the cell
      cell.addEventListener('click', () => {
        activePlayer.sendAttack(gameboardInstance, opponent, opponentGameBoardDOM, j, i - 1); // Active player places attack
      });

      // The grid of the gameboard instance contains a ship at the current coordinate
      if (gameboardInstance.getGrid()[j][i - 1] instanceof Ship) {
        cell.classList.add('gridcell-ship'); // Adjust style of the corresponding cell
      }

      opponentGameBoardDOM.append(cell); // Add cell to the gameboard in the DOM
    }
  }
}

// Add a class to the selected cell grid
function setCellClass(OpponentGameboard, axisX, axisY, className) {
  const coordinate = [axisX, axisY];
  const currentCell = document.querySelector(`#${OpponentGameboard.id} [data-coordinate="${coordinate}"]`);

  currentCell.classList.add(className);
}

module.exports = {
  generateGridCells,
  setCellClass,
};
