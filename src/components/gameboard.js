// const gridOne = document.querySelector('#player-one-gameboard');
// const gridTwo = document.querySelector('#player-two-gameboard');

// for (let i = 0; i < 100; i++) {
//   const cell = document.createElement('div');
//   cell.classList.add('gridcell');
//   gridOne.append(cell);
// }

// for (let i = 0; i < 100; i++) {
//   const cell = document.createElement('div');
//   cell.classList.add('gridcell');
//   gridTwo.append(cell);
// }

// Create a grid of cells
function generateGridCells(array, gameBoard) {

  for (let i = 0; i < array.length; i++) {

    for (let j = 0; j < array.length; j++) {

      const cell = document.createElement('div');
      cell.classList.add('gridcell');

      if (array[i][j] === 'ship') cell.classList.add('gridcell-ship');

      gameBoard.append(cell);
    }
  }
}

module.exports = generateGridCells;
