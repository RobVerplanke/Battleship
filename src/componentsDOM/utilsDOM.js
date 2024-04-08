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

// Used to add a corresponding class to the cell that was attacked
function addElementClass(element, className) {
  element.classList.add(className);
}

// Used to add a corresponding class to the cell that was attacked
function removeElementClass(element, className) {
  element.classList.remove(className);
}

function updatePlayerNames(playerNameOne, playerNameTwo) {
  const nameOne = playerNameOne;
  const nameTwo = playerNameTwo;
  const nameHolderPlayerOne = document.querySelector('#player-one-name');
  const nameHolderPlayerTwo = document.querySelector('#player-two-name');

  nameHolderPlayerOne.innerHTML = `<p>${nameOne}</p>`;
  nameHolderPlayerTwo.innerHTML = `<p>${nameTwo}</p>`;
}

function resetActiveNameClass() {
  const nameHolderPlayerOne = document.querySelector('#player-one-name');
  const nameHolderPlayerTwo = document.querySelector('#player-two-name');

  nameHolderPlayerOne.classList.remove('player-inactive');
  nameHolderPlayerOne.classList.add('player-active');

  nameHolderPlayerTwo.classList.remove('player-active');
  nameHolderPlayerTwo.classList.add('player-inactive');

}

function togglePlayerActiveColors() {
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

function activateResetButton(gameController) {
  const resetButtons = document.querySelectorAll('.reset-button');
  const popupWindow = document.querySelector('#popup-message');

  // When clicked on a reset butten, make the game-over popup disapear (when enabled) and reset the game
  resetButtons.forEach((resetButton) => {
    resetButton.addEventListener('click', () => {
      removeElementClass(popupWindow, 'enable-popup-message');
      addElementClass(popupWindow, 'disable-popup-message');
      gameController.resetGame();
    });
  });
}

module.exports = {
  createNewElement,
  setCellDataCoordinateAttribute,
  setCellDataShipAttribute,
  addElementClass,
  updatePlayerNames,
  resetActiveNameClass,
  togglePlayerActiveColors,
  addCellClass,
  setMissedCellContent,
  validateCellValue,
  setEventListener,
  disablePointerEvents,
  enablePointerEvents,
  announceWinner,
  activateResetButton,
};
