/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/componentsDOM/gameboard.js":
/*!****************************************!*\
  !*** ./src/componentsDOM/gameboard.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ../modules/battleship.js */ \"./src/modules/battleship.js\");\n\n// Fill the gameboard in the DOM with a grid based on the grid of the gameboard instance\nfunction generateGridCells(gameboardInstance, opponentGameBoardDOM, activePlayer, opponent) {\n\n  // Iterate through the grid of the gameboard instance\n  for (let i = gameboardInstance.getBoardSize(); i > 0; i--) {\n    for (let j = 0; j < gameboardInstance.getBoardSize(); j++) {\n\n      const cell = document.createElement('div'); // Create a new cell for each grid coordinate\n      cell.classList.add('gridcell'); // Set default style on each cell\n      cell.setAttribute('data-coordinate', [j, i - 1]); // Attach coordinates to data attribute\n\n      // Add event listener that listens for attacks on the cell\n      cell.addEventListener('click', () => {\n        activePlayer.sendAttack(gameboardInstance, opponent, opponentGameBoardDOM, j, i - 1); // Active player places attack\n      });\n\n      // The grid of the gameboard instance contains a ship at the current coordinate\n      if (gameboardInstance.getGrid()[j][i - 1] instanceof Ship) {\n        cell.classList.add('gridcell-ship'); // Adjust style of the corresponding cell\n      }\n\n      opponentGameBoardDOM.append(cell); // Add cell to the gameboard in the DOM\n    }\n  }\n}\n\n// Add a class to the selected cell grid\nfunction setCellClass(OpponentGameboard, axisX, axisY, className) {\n  const coordinate = [axisX, axisY];\n  const currentCell = document.querySelector(`#${OpponentGameboard.id} [data-coordinate=\"${coordinate}\"]`);\n\n  currentCell.classList.add(className);\n}\n\nmodule.exports = {\n  generateGridCells,\n  setCellClass,\n};\n\n\n//# sourceURL=webpack://battleship/./src/componentsDOM/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Gameboard = __webpack_require__(/*! ./modules/gameboard.js */ \"./src/modules/gameboard.js\");\nconst Player = __webpack_require__(/*! ./modules/player.js */ \"./src/modules/player.js\");\nconst gameboardDOM = __webpack_require__(/*! ./componentsDOM/gameboard.js */ \"./src/componentsDOM/gameboard.js\");\n\n// Create the main loop, the game loop should set up a new game by creating Players and Gameboards.\n// You need methods to render the gameboards and to take user input for attacking.\n// For attacks, let the user click on a coordinate in the enemy Gameboard.\n\n// Create both gameboards and players\nconst gameboardInstanceOne = new Gameboard();\nconst gameboardInstanceTwo = new Gameboard();\nconst playerOne = new Player();\nconst playerTwo = new Player();\n\nplayerOne.toggleActiveState(); // Player one begins\n\n// Place ships on each board for testing\ngameboardInstanceOne.placeShip(7, 5, 3, 'vertical');\ngameboardInstanceTwo.placeShip(2, 2, 5, 'horizontal');\n\n// Get the gameboard holders on the webpage\nconst gameBoardDOMOne = document.querySelector('#player-one-gameboard');\nconst gameBoardDOMTwo = document.querySelector('#player-two-gameboard');\n\n// Copy each value from the gameboard instance to the corresponding cell on the webpage\ngameboardDOM.generateGridCells(gameboardInstanceOne, gameBoardDOMOne, playerTwo, playerOne, gameBoardDOMTwo);\ngameboardDOM.generateGridCells(gameboardInstanceTwo, gameBoardDOMTwo, playerOne, playerTwo, gameBoardDOMOne);\n\n\n// The game loop should step through the game turn by turn using only methods from other objects.\n// If at any point you are tempted to write a new function inside the game loop, step back and figure out\n// which class or module that function should belong to.\n\n// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/battleship.js":
/*!***********************************!*\
  !*** ./src/modules/battleship.js ***!
  \***********************************/
/***/ ((module) => {

eval("class Ship {\n  constructor(size, orientation) {\n    this.size = size; // Length of ship\n    this.orientation = orientation; // Placed horizontally or vertically\n    this.hits = 0; // Tracks amount of attacks taken\n    this.sunk = false; // Indicates whether ship is sunk\n  }\n\n  // Increase number of hits taken\n  hit() {\n    this.hits += 1;\n  }\n\n  setIsSunkState(newState) {\n    this.sunk = newState;\n  }\n\n  // Checks if ship is sunk\n  isSunk() {\n    if (this.hits === this.size) { // Amount of received hits is equal to ship size\n      this.setIsSunkState(true); // If ship has sunk, set its sunk state\n      return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack://battleship/./src/modules/battleship.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable class-methods-use-this */\nconst Ship = __webpack_require__(/*! ./battleship.js */ \"./src/modules/battleship.js\");\n// const validateInput = require('./utils/validateInput.js'); // Necessary for external calls\nconst validatePlacement = __webpack_require__(/*! ./utils/validatePlacement.js */ \"./src/modules/utils/validatePlacement.js\");\nconst validatePlayer = __webpack_require__(/*! ./utils/validatePlayer.js */ \"./src/modules/utils/validatePlayer.js\");\nconst gameboardDOM = __webpack_require__(/*! ../componentsDOM/gameboard.js */ \"./src/componentsDOM/gameboard.js\");\nconst utils = __webpack_require__(/*! ./utils/utils.js */ \"./src/modules/utils/utils.js\");\n\nconst SHIP_AMOUNT = 5; // Default amount of ships for each player\nconst BOARD_SIZE = 10; // Default dimensions for the game board\n\nclass Gameboard {\n  constructor() {\n    this.boardSize = BOARD_SIZE; // Width and height\n    this.grid = []; // The game board represented as a 2D array\n    this.missedAttacks = new Set(); // Tracks missed attacks\n    this.allShipsSunk = false; // Indicates whether or not all ships have sunk\n\n    this._buildGameBoard(); // Initialize the game board\n  }\n\n  // Build the game board as a 2D-array grid\n  _buildGameBoard() {\n    for (let i = 0; i < this.getBoardSize(); i++) {\n      this.getGrid()[i] = [];\n      for (let j = 0; j < this.getBoardSize(); j++) {\n        this._setCellValue(i, j, 'empty'); // Initialize each cell as 'empty'\n      }\n    }\n  }\n\n  // Return size of the board\n  getBoardSize() {\n    return this.boardSize;\n  }\n\n  _setBoardSize(newSize) {\n    this.boardSize = newSize;\n  }\n\n  // Return the grid array\n  getGrid() {\n    return this.grid;\n  }\n\n  // Clear the gameboard from grid cells\n  _clearGrid() {\n    this.grid = [];\n  }\n\n  // Returns the value of the corresponding grid cell\n  _getCellValue(axisX, axisY) {\n    return this.getGrid()[axisX][axisY];\n  }\n\n  // Set the value of a single cell\n  _setCellValue(axisX, axisY, value) {\n    this.getGrid()[axisX][axisY] = value;\n  }\n\n  // Return the 'missed attacks' array\n  _getMissedAttacks() {\n    return this.missedAttacks;\n  }\n\n  // Store coordinate of a missed received attack\n  _setMissedAttacks(axisX, axisY) {\n    this._getMissedAttacks().add([axisX, axisY]);\n  }\n\n  // Return whether or not al ships are sunk\n  getAllShipsSunkState() {\n    return this.allShipsSunk;\n  }\n\n  // Called when last ship on the board has sunk\n  _setAllShipsSunkState(newState) {\n    this.allShipsSunk = newState;\n  }\n\n  // Switch turns between players, called after each received attack\n  switchPlayers(playerOne, playerTwo) {\n    playerOne.toggleActiveState();\n    playerTwo.toggleActiveState();\n  }\n\n  // Iterate through grid cells and store every ship that is sunk\n  _getAllSunkenShips() {\n    const allSunkenShipsList = new Set(); // List of all sunken ships\n\n    for (let i = 0; i < this.getBoardSize(); i++) {\n      for (let j = 0; j < this.getBoardSize(); j++) {\n        utils.validateCellValue(allSunkenShipsList, this.getGrid()[i][j]);\n      }\n    }\n    return allSunkenShipsList;\n  }\n\n  // Validate whether or not all ships on the board are sunk\n  _validateAllShipsSunkState() {\n    const allSunkenShipsList = this._getAllSunkenShips(); // List of all sunken ships\n\n    // Check if the amount of sunken ships is the same as the total amount of ships\n    if (allSunkenShipsList.size === SHIP_AMOUNT && !this.getAllShipsSunkState()) {\n      this._setAllShipsSunkState(true); // Send message to the gameboard that all ships are sunk\n      return true;\n    }\n    return false;\n  }\n\n  // Send hit message to attacked ship, check if it sunk as a result of this hit,\n  // then validate whether or not it was the last surviving ship on the board\n  _sendHit(gameBoard, targetedShip) {\n    targetedShip.hit(); // Send a 'hit' message to the ship that was attacked\n\n    // If the ship has sunk, check if all ships are sunk now\n    if (targetedShip.isSunk()) gameBoard._validateAllShipsSunkState();\n  }\n\n\n  // Add a ship to the grid at the given coordinates\n  _addShipToGrid(axisX, axisY, shipSize, orientation) {\n    const newShip = utils.shipFactory(shipSize, orientation);\n\n    if (orientation === 'horizontal') { // Spread ship horizontally over grid cells\n      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX + i, axisY, newShip);\n    } else if (orientation === 'vertical') { // Spread ship vertically over grid cells\n      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX, axisY + i, newShip);\n    }\n  }\n\n\n  // Check input, create a new ship instance and add it to the grid\n  placeShip(axisX, axisY, shipSize, orientation) {\n\n    // eslint-disable-next-line global-require\n    const validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\"); // Necessary for external calls\n\n    // Check if values are valid coordinates on the board\n    validateInput.validateCoordinates(this.getBoardSize(), axisX, axisY);\n\n    // Check if size of ship is valid\n    validateInput.validateShipSize(shipSize);\n\n    // Check if orientation is valid\n    validateInput.validateOrientation(orientation);\n\n    // Validate placement: Prevent that ships are placed outside the board boundaries\n    validatePlacement.checkBoardBoundaries(this.getBoardSize(), axisX, axisY, shipSize, orientation);\n\n    // Validate placement: Prevent that ships overlap each other\n    validatePlacement.checkShipOverlap(this, axisX, axisY, shipSize, orientation);\n\n    // All values and the placement conditions are validated, add a ship to the grid\n    this._addShipToGrid(axisX, axisY, shipSize, orientation);\n  }\n\n\n  // Gameboard reveived an attack, determine whether or not an attack was succesful, switch players\n  // In case of a hit tell the ship it was hit, else store the coordinates of the missed attack\n  receiveAttack(axisX, axisY, activePlayer, opponent, opponentGameBoardDOM) {\n\n    // eslint-disable-next-line global-require\n    const validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\"); // Necessary to import here for external calls\n\n    // Check if values are valid coordinates on the board\n    validateInput.validateCoordinates(this.getBoardSize(), axisX, axisY);\n\n    // Check if player values are defined\n    validatePlayer.validatePlayers(activePlayer, opponent);\n\n    // Check the cell that reveived an attack, it can only be 'empty' or a ship\n    const attackedCell = this._getCellValue(axisX, axisY);\n\n    // Switch turns between players\n    this.switchPlayers(activePlayer, opponent);\n\n    if (attackedCell instanceof Ship) { // The attack hit a ship\n      const gameBoard = this;\n      this._sendHit(gameBoard, attackedCell); // Send 'hit' message to the corresponding ship\n      gameboardDOM.setCellClass(opponentGameBoardDOM, axisX, axisY, 'gridcell-ship-hit'); // Set cell style\n      return true;\n    }\n\n    // Attack didn't hit a ship\n    this._setMissedAttacks(axisX, axisY); // Store coordinates of the missed attack\n    gameboardDOM.setCellClass(opponentGameBoardDOM, axisX, axisY, 'gridcell-missed'); // Set cell style\n\n    return false;\n  }\n}\n\nmodule.exports = Gameboard;\n\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable class-methods-use-this */\nconst validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\");\nconst validatePlayer = __webpack_require__(/*! ./utils/validatePlayer.js */ \"./src/modules/utils/validatePlayer.js\");\nconst utils = __webpack_require__(/*! ./utils/utils.js */ \"./src/modules/utils/utils.js\");\n\nclass Player {\n  constructor(name = 'Player') {\n    this.name = name; // Players name becomes 'Player' if no name was given\n    this.active = false; // Determines this player is active\n    this.sentAttacks = []; // Store coordinates of all previous attacks\n    this.isHuman = true; // A player can be human or computer\n  }\n\n  // Get coordinates of all the placed attacks in this round\n  _getSentAttacks() {\n    return this.sentAttacks;\n  }\n\n  // Store attacked coordinates\n  _setSentAttacks(axisX, axisY) {\n    this.sentAttacks.push([axisX, axisY]);\n  }\n\n  // Switch role and play as computer from now on\n  setPlayerAsComputer() {\n    this.isHuman = false;\n    this.name = 'Computer';\n  }\n\n  // Check if it's players turn to play\n  _getActiveState() {\n    return this.active;\n  }\n\n  // Switch turns between players\n  toggleActiveState() {\n    this.active = !this.active;\n  }\n\n  // Compare coordinate with coordinates that were already attacked\n  _validateSentAttacks(axisX, axisY) {\n    if (this._getSentAttacks().find((coordinate) => JSON.stringify(coordinate) === JSON.stringify([axisX, axisY]))) {\n      throw new Error('Cell already attacked!');\n    }\n  }\n\n  // Generate a random valid coordinate to attack\n  generateRandomCoordinate(gameBoard) {\n    const newCoordinate = [];\n    let axisX = null;\n    let axisY = null;\n\n    // Keep generating a coordinate until it's valid\n    axisX = (utils.getRandomInt(gameBoard.getBoardSize()));\n    axisY = (utils.getRandomInt(gameBoard.getBoardSize()));\n\n    // Prevent that a grid cell is attacked more than once\n    this._validateSentAttacks(axisX, axisY);\n\n    // Add valid coordinate to list\n    newCoordinate.push(axisX, axisY);\n\n    return newCoordinate;\n  }\n\n  // Send a attack to a specific grid cell\n  sendAttack(gameBoard, opponent, opponentGameBoardDOM, axisX, axisY) {\n\n    // Check if it's current players turn to play\n    if (!validatePlayer.validateActivePlayer(this)) return false;\n\n    // Check if gameboard value is actually a gameboard\n    validateInput.validateGameBoard(gameBoard);\n\n    // Check if values are valid coordinates on the board\n    validateInput.validateCoordinates(gameBoard.getBoardSize(), axisX, axisY);\n\n    // Prevent that a grid cell is attacked more than once\n    this._validateSentAttacks(axisX, axisY);\n\n    // Send valided coordinates to a validated gameboard\n    gameBoard.receiveAttack(axisX, axisY, this, opponent, opponentGameBoardDOM);\n\n    // Store attacked coordinates\n    this._setSentAttacks(axisX, axisY);\n\n    return true;\n  }\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/utils/utils.js":
/*!************************************!*\
  !*** ./src/modules/utils/utils.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ../battleship.js */ \"./src/modules/battleship.js\");\n\n// Used for creating ship 'parts' when one ship has to be placed over multiple cells\nfunction shipFactory(shipSize, orientation) {\n  return new Ship(shipSize, orientation);\n}\n\n// Generate random number within gameboard boundaries\nfunction getRandomInt(boardSize) {\n  return Math.floor(Math.random() * boardSize);\n}\n\n// Adds a sunken ship to the list of all sunken ships\nfunction validateCellValue(allSunkenShipsList, cellValue) {\n  const newList = allSunkenShipsList;\n\n  if (cellValue instanceof Ship) { // Cell contains (part of) a ship\n    const ship = cellValue;\n    if (ship.isSunk()) newList.add(ship); // Add sunken ship to list\n  }\n\n  return newList;\n}\n\n// Reports when all ships on one of the boards are sunken\nfunction isGameOver(gameboardOne, gameboardTwo) {\n  return gameboardOne.getAllShipsSunkState() || gameboardTwo.getAllShipsSunkState();\n}\n\nmodule.exports = {\n  shipFactory,\n  validateCellValue,\n  getRandomInt,\n  isGameOver,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/utils.js?");

/***/ }),

/***/ "./src/modules/utils/validateInput.js":
/*!********************************************!*\
  !*** ./src/modules/utils/validateInput.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable max-len */\n\nconst Gameboard = __webpack_require__(/*! ../gameboard.js */ \"./src/modules/gameboard.js\"); // Only used to check if a gameboard argument is a instance of this class\n\n// Check if given coordinates are actual coordinates on the board\nfunction validateCoordinates(boardSize, axisX, axisY) {\n\n  if (axisX === undefined || axisY === undefined\n    || typeof axisX !== 'number' || typeof axisY !== 'number') {\n    throw new Error('Input is invalid'); // Check for valid datatype\n  }\n\n  if (axisX < 0 || axisX >= boardSize || axisY < 0 || axisY >= boardSize) {\n    throw new Error('Coordinate exceeds board boundaries'); // Check for invalid coordinates\n  }\n}\n\n// Check if size is a valid size\nfunction validateShipSize(size) {\n\n  if (size === undefined || typeof size !== 'number' || size < 2 || size > 5) {\n    throw new Error('Invalid ship size'); // Check for empty input\n  }\n}\n\n// Check if given orientation is a valid orientation\nfunction validateOrientation(orientation) {\n  if (orientation !== 'horizontal' && orientation !== 'vertical') {\n    throw new Error('Invalid orientation'); // Check for valid orientation\n  }\n}\n\n// Check if gameboard is defined and a instance of the Gameboard class\nfunction validateGameBoard(gameBoard) {\n  if (gameBoard === undefined) throw new Error('Input is incomplete');\n  if (!(gameBoard instanceof Gameboard)) throw new Error('Input is invalid');\n}\n\n// Check if playernames are defined and are objects\nfunction validatePlayers(playerOne, playerTwo) {\n  if (playerOne === undefined || typeof playerOne !== 'object'\n    || playerTwo === undefined || typeof playerTwo !== 'object') {\n    throw new Error('Missing player');\n  }\n}\n\nfunction validateActivePlayer(activePlayer) {\n  console.log('Not your turn!');\n  if (!activePlayer.active) throw new Error('Not your turn!');\n}\n\nmodule.exports = {\n  validateCoordinates,\n  validateOrientation,\n  validateShipSize,\n  validateGameBoard,\n  validatePlayers,\n  validateActivePlayer,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/validateInput.js?");

/***/ }),

/***/ "./src/modules/utils/validatePlacement.js":
/*!************************************************!*\
  !*** ./src/modules/utils/validatePlacement.js ***!
  \************************************************/
/***/ ((module) => {

eval("// Check if the complete ship fits on the board at a given coordinate\nfunction checkBoardBoundaries(gameBoard, axisX, axisY, shipSize, orientation) {\n\n  if (orientation === 'horizontal' && axisX + shipSize > gameBoard) { // Exceeds horizontal board boundary\n    throw new Error('Ship exceeds board limits');\n  }\n\n  if (orientation === 'vertical' && axisY + shipSize > gameBoard) { // Exceeds vertical board boundary\n    throw new Error('Ship exceeds board limits');\n  }\n}\n\n// Check if the ship overlaps another placed ship\nfunction checkShipOverlap(gameBoard, axisX, axisY, shipSize, orientation) {\n\n  for (let i = 0; i < shipSize; i++) { // Check the state of the cells in wich the ship is going to be placed\n\n    if (orientation === 'horizontal' && gameBoard._getCellValue(axisX + i, axisY) !== 'empty') {\n      // Placing the ship horizontally crosses at least one 'not empty' cell\n      throw new Error('Ships overlapping');\n    }\n\n    if (orientation === 'vertical' && gameBoard._getCellValue(axisX, axisY + i) !== 'empty') {\n      // Placing the ship vertically crosses at least one 'not empty' cell\n      throw new Error('Ships overlapping');\n    }\n  }\n}\n\nmodule.exports = {\n  checkBoardBoundaries,\n  checkShipOverlap,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/validatePlacement.js?");

/***/ }),

/***/ "./src/modules/utils/validatePlayer.js":
/*!*********************************************!*\
  !*** ./src/modules/utils/validatePlayer.js ***!
  \*********************************************/
/***/ ((module) => {

eval("// Check if playernames are defined and are objects\nfunction validatePlayers(playerOne, playerTwo) {\n  if (playerOne === undefined || typeof playerOne !== 'object'\n      || playerTwo === undefined || typeof playerTwo !== 'object') {\n    throw new Error('Missing player');\n  }\n}\n\nfunction validateActivePlayer(activePlayer) {\n  if (activePlayer.active === false) return false;\n  return true;\n}\n\nmodule.exports = {\n  validatePlayers,\n  validateActivePlayer,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/validatePlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;