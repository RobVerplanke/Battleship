const Ship = require('../modules/battleship.js');

// Create new cell
function createNewElement(element) {
  return document.createElement(element);
}

// Set coordinates as data-attribute so game control can determine which coordinatea was being attacked
function setCellDataCoordinateAttribute(cell, axisX, axisY) {
  cell.setAttribute('data-coordinate', [axisY, axisX - 1]);
}

// Set data-attribute on cells that contain a ship for game control to determine if a attack hit a ship or not
function setCellDataShipAttribute(cell) {
  cell.setAttribute('data-hasShip', true);
}

// Get the cell-element in the DOM so it can be use when an attack from that cell must be send
function getCellByCoordinate(axisX, axisY, gameboardDOM) {
  const gameboardElement = gameboardDOM.getBoard();
  const cell = gameboardElement.querySelector(`[data-coordinate="${[axisY, axisX]}"]`);

  return cell;
}

// Used to add a corresponding class to the cell that was attacked
function addElementClass(element, className) {
  element.classList.add(className);
}

// Used to add a corresponding class to the cell that was attacked
function removeElementClass(element, className) {
  element.classList.remove(className);
}

// Update the playernames above the corresponding gameboards
function updatePlayerNames(playerNameOne, playerNameTwo) {
  const nameOne = playerNameOne;
  const nameTwo = playerNameTwo;
  const nameHolderPlayerOne = document.querySelector('#player-one-name');
  const nameHolderPlayerTwo = document.querySelector('#player-two-name');

  nameHolderPlayerOne.innerHTML = `<p>${nameOne}</p>`;
  nameHolderPlayerTwo.innerHTML = `<p>${nameTwo}</p>`;
}

// Change color of playernames to visually indicate who's turn it is
function togglePlayersActiveColors() {
  const nameHolderPlayerOne = document.querySelector('#player-one-name');
  const nameHolderPlayerTwo = document.querySelector('#player-two-name');

  nameHolderPlayerOne.classList.toggle('player-active');
  nameHolderPlayerOne.classList.toggle('player-inactive');

  nameHolderPlayerTwo.classList.toggle('player-active');
  nameHolderPlayerTwo.classList.toggle('player-inactive');
}

// Set the value of an attacked cell that was empty to 'X'
function setMissedCellContent(cell) {
  const currentCell = cell;
  currentCell.innerHTML = '&times';
}

// Called when a cell is attacked to set the corresponding class
function addCellClass(cell) {

  // Visually hihglight attacked cell when it contains a ship
  if (cell.getAttribute('data-hasShip')) {

    // Add class
    addElementClass(cell, 'gridcell-ship-hit');

  } else { // Visually deactivate attacked cell when it's empty

    // Mark cell with a 'X' and change background color
    setMissedCellContent(cell);
    addElementClass(cell, 'gridcell-missed');
  }
}

// Adds a sunken ship to the list of sunken ships
function validateCellValue(allSunkenShipsList, cellValue) {
  const newList = allSunkenShipsList;

  if (cellValue instanceof Ship) { // Cell contains (part of) a ship
    const ship = cellValue;

    // Add sunken ship to list
    if (ship.isSunk()) newList.add(ship);
  }

  return newList;
}

function sendAttack(currentPlayer, cell) {
  // Get the corresponing coordinates as string
  const coordinates = cell.getAttribute('data-coordinate');

  // Send attack request from active player to game control
  currentPlayer.sendAttack(Number(coordinates[0]), Number(coordinates[2]), cell);
}


// Listen for attacks on the cell
function setEventListener(currentPlayer, cell) {
  cell.addEventListener('click', () => {
    sendAttack(currentPlayer, cell);
  });
}

// Disable the gameboards after the game is over so players can't place attacks anymore
function disablePointerEvents() {
  const mainElement = document.querySelector('.main');
  mainElement.classList.remove('enable-gameboard');
  mainElement.classList.add('disable-gameboard');
}

// Enable gameboards again after the pop-up message is clicked away
function enablePointerEvents() {
  const mainElement = document.querySelector('.main');
  mainElement.classList.remove('disable-gameboard');
  mainElement.classList.add('enable-gameboard');
}

// Display the name of the winner in the game-over popup window
function announceWinner(player) {
  const popupContent = document.querySelector('#popup-content');
  const popupWindow = document.querySelector('#popup-message');

  addElementClass(popupWindow, 'enable-popup-message');
  popupContent.innerHTML = `${player.name} won this round`;

  disablePointerEvents(); // Disable gameboards
}

// Remove buttons that are not necessary anymore after the game is started
function disableRandomPlacementButtonTwo() {
  const randomButtonTwo = document.querySelector('#options-player-two-random-button');

  randomButtonTwo.classList.remove('random-button-enable');
  randomButtonTwo.classList.add('random-button-disable');

}

// Remove buttons that are not necessary anymore after the game is started
function disableRandomPlacementButtons() {
  const randomButtonOne = document.querySelector('#options-player-one-random-button');
  const randomButtonTwo = document.querySelector('#options-player-two-random-button');

  randomButtonOne.classList.remove('random-button-enable');
  randomButtonOne.classList.add('random-button-disable');
  randomButtonTwo.classList.remove('random-button-enable');
  randomButtonTwo.classList.add('random-button-disable');

}

// Show the random placement buttons when the game is not started so players can keep replacing their ships
function enableRandomPlacementButtons() {
  const randomButtonOne = document.querySelector('#options-player-one-random-button');
  const randomButtonTwo = document.querySelector('#options-player-two-random-button');

  randomButtonOne.classList.remove('random-button-disable');
  randomButtonOne.classList.add('random-button-enable');
  randomButtonTwo.classList.remove('random-button-disable');
  randomButtonTwo.classList.add('random-button-enable');
}

// Remove buttons that are not necessary anymore after the game is started
function disableComputerButton() {
  const computerButton = document.querySelector('#player-two-computer-button');

  computerButton.classList.remove('computer-button-enable');
  computerButton.classList.add('computer-button-disable');
}

// Let the human players choose to place all ships at random positions
function activateRandomButton(gameControl) {
  const randomButtonOne = document.querySelector('#options-player-one-random-button');
  const randomButtonTwo = document.querySelector('#options-player-two-random-button');

  randomButtonOne.addEventListener('click', () => {
    gameControl.gameboardOne.clearGrid();
    gameControl.gameboardOne.placeShipsRandomly();
    gameControl.gameboardDOMOne.clearGameboard();
    gameControl.gameboardDOMOne.generateGridCells(gameControl.gameboardOne, gameControl.playerTwo, gameControl.playerOne);

  });

  randomButtonTwo.addEventListener('click', () => {
    gameControl.gameboardTwo.clearGrid();
    gameControl.gameboardTwo.placeShipsRandomly();
    gameControl.gameboardDOMTwo.clearGameboard();
    gameControl.gameboardDOMTwo.generateGridCells(gameControl.gameboardTwo, gameControl.playerOne, gameControl.playerTwo);

  });

}

// Let the player be able to play against the computer by clicking the computer button
function activateComputerButton(gameControl) {
  const computerButton = document.querySelector('#player-two-computer-button');

  computerButton.classList.add('computer-button-enable');
  computerButton.classList.remove('computer-button-disable');

  // Remove button after clicking it let the AI place ships randomly
  computerButton.addEventListener('click', () => {
    disableComputerButton();
    disableRandomPlacementButtonTwo();

    gameControl.playerTwo.setIsHumanState(); // Player two is AI now
    gameControl.gameboardTwo.clearGrid(); // Empty the current gameboard
    gameControl.gameboardTwo.placeShipsRandomly(); // Place all ships at random positions
    gameControl.gameboardDOMTwo.clearGameboard(); // Hide the gameboard
    gameControl.gameboardDOMTwo.generateGridCells(gameControl.gameboardTwo, gameControl.playerOne, gameControl.playerTwo);
  });
}

// Reload the page after one of the reset buttons is clicked
function activateResetButtons() {
  const newGameButton = document.querySelector('#newgame-button');
  const resetButton = document.querySelector('#popup-reset-button');

  newGameButton.addEventListener('click', () => {
    window.location.reload();
  });

  resetButton.addEventListener('click', () => {
    window.location.reload();
  });
}

module.exports = {
  createNewElement,
  setCellDataCoordinateAttribute,
  setCellDataShipAttribute,
  getCellByCoordinate,
  addElementClass,
  removeElementClass,
  updatePlayerNames,
  togglePlayersActiveColors,
  addCellClass,
  setMissedCellContent,
  validateCellValue,
  setEventListener,
  disableRandomPlacementButtons,
  enableRandomPlacementButtons,
  disableComputerButton,
  disablePointerEvents,
  enablePointerEvents,
  activateComputerButton,
  announceWinner,
  activateRandomButton,
  activateResetButtons,
};
