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

/***/ "./src/componentsDOM/gameboardDOM.js":
/*!*******************************************!*\
  !*** ./src/componentsDOM/gameboardDOM.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ../modules/battleship.js */ \"./src/modules/battleship.js\");\nconst utilsDOM = __webpack_require__(/*! ./utilsDOM.js */ \"./src/componentsDOM/utilsDOM.js\");\n\nconst BOARD_SIZE = 10;\n\nclass GameboardDOM {\n  constructor(element) {\n    this.element = document.querySelector(element); // Corresponding gameboard holder in the DOM\n    this.boardSize = BOARD_SIZE; // Width and height\n  }\n\n  // Return the board element\n  _getBoard() {\n    return this.element;\n  }\n\n  // Return the board size\n  _getBoardSize() {\n    return this.boardSize;\n  }\n\n  // Add cell elements to the gameboard element\n  _addCellToBoard(cell) {\n    this._getBoard().append(cell);\n  }\n\n  // Create grid of cells, based on the grid of the given main gameboard\n  generateGridCells(gameboard, player) {\n\n    // Create a new cell in the DOM for each grid cell on the main gameboard\n    for (let i = this._getBoardSize(); i > 0; i--) {\n      for (let j = 0; j < this._getBoardSize(); j++) {\n\n        // New cell element in the DOM\n        const cell = utilsDOM.createNewElement('div');\n\n        // Set coordinates as data-attribute value\n        utilsDOM.setCellDataCoordinateAttribute(cell, i, j);\n\n        // Validate the cell grid value at the current coordinates\n        if (gameboard.getGrid()[j][i - 1] instanceof Ship) {\n          // Grid cell contains a ship\n\n          // Set data-attribute so it can be recognized as ship\n          utilsDOM.setCellDataShipAttribute(cell);\n\n          // Add 'ship'-class to highlight players ships\n          utilsDOM.addElementClass(cell, 'gridcell-ship');\n\n        } else { // Grid cell is empty\n\n          // Add default style if cell is empty\n          utilsDOM.addElementClass(cell, 'gridcell');\n        }\n\n        // Listen for attacks\n        utilsDOM.setEventListener(player, cell);\n\n        // Add cell to the DOM-gameboard\n        this._addCellToBoard(cell);\n      }\n    }\n  }\n}\n\nmodule.exports = GameboardDOM;\n\n\n\n//# sourceURL=webpack://battleship/./src/componentsDOM/gameboardDOM.js?");

/***/ }),

/***/ "./src/componentsDOM/utilsDOM.js":
/*!***************************************!*\
  !*** ./src/componentsDOM/utilsDOM.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ../modules/battleship.js */ \"./src/modules/battleship.js\");\n\n// Create new cell\nfunction createNewElement(element) {\n  return document.createElement(element);\n}\n\n// Set coordinates as data-attribute value\nfunction setCellDataCoordinateAttribute(cell, axisX, axisY) {\n  cell.setAttribute('data-coordinate', [axisY, axisX - 1]);\n}\n\n// Set data-attribute on cells that contain a ship\nfunction setCellDataShipAttribute(cell) {\n  cell.setAttribute('data-hasShip', true);\n}\n\n// Add a class to the give element\nfunction addElementClass(element, className) {\n  element.classList.add(className);\n}\n\n// Set the value of an attacked cell that was empty to 'X'\nfunction setMissedCellContent(cell) {\n  const currentCell = cell;\n  currentCell.innerHTML = '&times';\n}\n\n// Called when a cell is attacked to set the corresponding class\nfunction addCellClass(cell) {\n\n  // Visually hihglight attacked cell when it contains a ship\n  if (cell.getAttribute('data-hasShip')) {\n\n    // Add class\n    addElementClass(cell, 'gridcell-ship-hit');\n\n  } else { // Visually deactivate attacked cell when it's empty\n\n    // Mark cell with a 'X' and change background color\n    setMissedCellContent(cell);\n    addElementClass(cell, 'gridcell-missed');\n  }\n}\n\n// Adds a sunken ship to the list of sunken ships\nfunction validateCellValue(allSunkenShipsList, cellValue) {\n  const newList = allSunkenShipsList;\n\n  if (cellValue instanceof Ship) { // Cell contains (part of) a ship\n    const ship = cellValue;\n\n    // Add sunken ship to list\n    if (ship.isSunk()) newList.add(ship);\n  }\n\n  return newList;\n}\n\n// Listen for attacks on the cell\nfunction setEventListener(currentPlayer, cell) {\n  cell.addEventListener('click', () => {\n\n    // Get the corresponing coordinates as string\n    const coordinates = cell.getAttribute('data-coordinate');\n\n    // Send attack request from active player to game control\n    currentPlayer.sendAttack(Number(coordinates[0]), Number(coordinates[2]), cell);\n  });\n}\n\nmodule.exports = {\n  createNewElement,\n  setCellDataCoordinateAttribute,\n  setCellDataShipAttribute,\n  addElementClass,\n  addCellClass,\n  setMissedCellContent,\n  validateCellValue,\n  setEventListener,\n};\n\n\n//# sourceURL=webpack://battleship/./src/componentsDOM/utilsDOM.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameController = __webpack_require__(/*! ./modules/gameControl.js */ \"./src/modules/gameControl.js\");\nconst Gameboard = __webpack_require__(/*! ./modules/gameboard.js */ \"./src/modules/gameboard.js\");\nconst Player = __webpack_require__(/*! ./modules/player.js */ \"./src/modules/player.js\");\nconst GameboardDOM = __webpack_require__(/*! ./componentsDOM/gameboardDOM.js */ \"./src/componentsDOM/gameboardDOM.js\");\n\nconst gameControl = new GameController();\n\n// Create new players and attach the game controller to it\nconst playerOne = new Player(gameControl, 'Player one');\nconst playerTwo = new Player(gameControl, 'Player two');\n\n// Create new main gameboards with its corresponding opponent\nconst gameboardOne = new Gameboard();\nconst gameboardTwo = new Gameboard();\n\n// Create new gameboards in the DOM\nconst gameboardDOMOne = new GameboardDOM('#player-one-gameboard');\nconst gameboardDOMTwo = new GameboardDOM('#player-two-gameboard');\n\n/*\n\nPlace ships on each board for TESTING!!! *******************************************\n\n*/\n\n\ngameboardOne.placeShip(0, 0, 2, 'horizontal');\ngameboardOne.placeShip(3, 0, 3, 'vertical');\ngameboardOne.placeShip(7, 0, 3, 'horizontal');\ngameboardOne.placeShip(0, 5, 4, 'vertical');\ngameboardOne.placeShip(5, 6, 5, 'horizontal');\n\n// Plaats schepen op het spelbord\ngameboardTwo.placeShip(0, 0, 2, 'horizontal');\ngameboardTwo.placeShip(3, 0, 3, 'vertical');\ngameboardTwo.placeShip(7, 0, 3, 'horizontal');\ngameboardTwo.placeShip(0, 5, 4, 'vertical');\ngameboardTwo.placeShip(5, 5, 5, 'horizontal');\n\n\n// Initialize both gameboards in the DOM\ngameboardDOMOne.generateGridCells(gameboardOne, playerTwo);\ngameboardDOMTwo.generateGridCells(gameboardTwo, playerOne);\n\n/*\n\n**************************************************************************************\n\n*/\n\n// Player one begins\nplayerOne.active = true;\nplayerTwo.active = false;\n\n// Start the game\ngameControl.startGame(\n  playerOne,\n  playerTwo,\n  gameboardOne,\n  gameboardTwo,\n  gameboardDOMOne,\n  gameboardDOMTwo,\n);\n\n\nmodule.exports = gameControl;\n\n\n// Create the main loop, the game loop should set up a new game by creating Players and Gameboards.\n// You need methods to render the gameboards and to take user input for attacking.\n// For attacks, let the user click on a coordinate in the enemy Gameboard.\n\n\n// The game loop should step through the game turn by turn using only methods from other objects.\n// If at any point you are tempted to write a new function inside the game loop, step back and figure out\n// which class or module that function should belong to.\n\n// Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/battleship.js":
/*!***********************************!*\
  !*** ./src/modules/battleship.js ***!
  \***********************************/
/***/ ((module) => {

eval("class Ship {\n  constructor(size, orientation) {\n    this.size = size; // Length of ship\n    this.orientation = orientation; // Placed horizontally or vertically\n    this.hits = 0; // Tracks amount of attacks taken\n    this.sunk = false; // Indicates whether ship is sunk\n  }\n\n  // Increase number of hits taken\n  hit() {\n    this.hits += 1;\n  }\n\n  setIsSunkState(newState) {\n    this.sunk = newState;\n  }\n\n  // Checks if ship is sunk\n  isSunk() {\n    if (this.hits === this.size) { // Amount of received hits is equal to ship size\n      this.setIsSunkState(true); // If ship has sunk, set its sunk state\n      return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack://battleship/./src/modules/battleship.js?");

/***/ }),

/***/ "./src/modules/gameControl.js":
/*!************************************!*\
  !*** ./src/modules/gameControl.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable class-methods-use-this */\nconst validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\");\nconst utils = __webpack_require__(/*! ./utils/utils.js */ \"./src/modules/utils/utils.js\");\nconst utilsDOM = __webpack_require__(/*! ../componentsDOM/utilsDOM.js */ \"./src/componentsDOM/utilsDOM.js\");\n\n\nclass GameController {\n  constructor(\n    playerOne = {}, // Properties are empty by default\n    playerTwo = {},\n    gameBoardOne = {},\n    gameBoardTwo = {},\n    gameboardDOMOne = {},\n    gameboardDOMTwo = {},\n  ) {\n\n    this.boardSize = 10; // Default gameboard size\n\n    // Create a new set of players\n    this.playerOne = playerOne;\n    this.playerTwo = playerTwo;\n\n    // Create new main gameboards\n    this.gameboardOne = gameBoardOne;\n    this.gameboardTwo = gameBoardTwo;\n\n    // Set gameboard size of both gameboards\n    this.gameboardOne.boardSize = this.boardSize;\n    this.gameboardTwo.boardSize = this.boardSize;\n\n    // Create new gameboards in the DOM\n    this.gameboardDOMOne = gameboardDOMOne;\n    this.gameboardDOMTwo = gameboardDOMTwo;\n  }\n\n\n  // Switch players turns\n  _togglePlayersActiveStates() {\n    this.playerOne.active = !this.playerOne.active;\n    this.playerTwo.active = !this.playerTwo.active;\n  }\n\n  // Returns the opponents gameboard\n  _getOpponentGameboard(currentPlayer) {\n    return (currentPlayer === this.playerOne) ? this.gameboardTwo : this.gameboardOne;\n  }\n\n  getBoardSize() {\n    return this.boardSize;\n  }\n\n  // Handle incoming attack\n  receiveAttackRequest(axisX, axisY, curentPlayer, cell) {\n\n    // Check if current player is actve\n    validateInput.validatePlayerActiveState(curentPlayer);\n\n    // Validate coordinate values\n    validateInput.validateCoordinates(axisX, axisY);\n\n    // Check if cell is not already attacked\n    validateInput.validateSentAttacks(curentPlayer, axisX, axisY);\n\n    // Send validated data to perform the attack\n    this._performAttack(axisX, axisY, this._getOpponentGameboard(curentPlayer), cell);\n  }\n\n  // Send hit message to corresponding gameboard\n  _performAttack(axisX, axisY, targetGameboard, cell) {\n\n    // Send attack to corresponding gameboard\n    targetGameboard.receiveAttack(axisX, axisY);\n\n    // Set the style of a cell after a attack\n    utilsDOM.addCellClass(cell);\n\n    // Check if all ships sunk on one of the gameboards\n    utils.isGameOver(this.gameboardOne, this.gameboardTwo);\n\n    // Switch players turns\n    this._togglePlayersActiveStates();\n  }\n\n  // Initialize the game\n  startGame(\n    playerOne,\n    playerTwo,\n    gameboardOne,\n    gameboardTwo,\n    gameboardDOMOne,\n    gameboardDOMTwo,\n  ) {\n    this.playerOne = playerOne;\n    this.playerTwo = playerTwo;\n    this.gameboardOne = gameboardOne;\n    this.gameboardTwo = gameboardTwo;\n    this.gameboardDOMOne = gameboardDOMOne;\n    this.gameboardDOMTwo = gameboardDOMTwo;\n  }\n}\n\nmodule.exports = GameController;\n\n\n//# sourceURL=webpack://battleship/./src/modules/gameControl.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable global-require */\n/* eslint-disable class-methods-use-this */\n\nconst Ship = __webpack_require__(/*! ./battleship.js */ \"./src/modules/battleship.js\");\n\nconst validatePlacement = __webpack_require__(/*! ./utils/validatePlacement.js */ \"./src/modules/utils/validatePlacement.js\");\nconst utils = __webpack_require__(/*! ./utils/utils.js */ \"./src/modules/utils/utils.js\");\nconst utilsDOM = __webpack_require__(/*! ../componentsDOM/utilsDOM.js */ \"./src/componentsDOM/utilsDOM.js\");\n\nconst SHIP_AMOUNT = 5; // Default amount of ships for each player\n\nclass Gameboard {\n  constructor() {\n    this.grid = []; // The game board represented as a 2D array\n    this.boardSize = 10;\n    this.allShipsSunk = false; // Indicates whether or not all ships are sunk\n\n    this._buildGameBoard(); // Initialize the game board\n  }\n\n  // Build the game board as a 2D-array grid\n  _buildGameBoard() {\n    for (let i = 0; i < this.getBoardSize(); i++) {\n      this.getGrid()[i] = [];\n      for (let j = 0; j < this.getBoardSize(); j++) {\n        this._setCellValue(i, j, 'empty'); // Initialize each cell value as 'empty'\n      }\n    }\n  }\n\n  // Return size of the board\n  getBoardSize() {\n    return this.boardSize;\n  }\n\n  // Return the grid array\n  getGrid() {\n    return this.grid;\n  }\n\n  // Returns the value of the corresponding grid cell\n  _getCellValue(axisX, axisY) {\n    return this.getGrid()[axisX][axisY];\n  }\n\n  // Set the value of a single cell\n  _setCellValue(axisX, axisY, value) {\n    this.getGrid()[axisX][axisY] = value;\n  }\n\n  // Return whether or not al ships are sunk\n  getAllShipsSunkState() {\n    return this.allShipsSunk;\n  }\n\n  // Set wheter or not all the ships on the are sunk\n  _setAllShipsSunkState(newState) {\n    this.allShipsSunk = newState;\n  }\n\n  // Return up to date list of all sunken ships\n  _getAllSunkenShips() {\n    const allSunkenShipsList = new Set();\n\n    // Iterate through grid cells and store every ship that is sunk\n    for (let i = 0; i < this.getBoardSize(); i++) {\n      for (let j = 0; j < this.getBoardSize(); j++) {\n\n        // Add sunken ships to the list\n        utilsDOM.validateCellValue(allSunkenShipsList, this.getGrid()[i][j]);\n      }\n    }\n    return allSunkenShipsList;\n  }\n\n  // Validate whether or not all ships on the board are sunk\n  _validateAllShipsSunkState() {\n\n    // List of all sunken ships\n    const allSunkenShipsList = this._getAllSunkenShips();\n\n    // Check if the amount of sunken ships is the same as the total amount of ships\n    if (allSunkenShipsList.size === SHIP_AMOUNT) {\n\n      // All ships on the gameboard are sunken\n      this._setAllShipsSunkState(true);\n      return true;\n    }\n    return false;\n  }\n\n  // Send hit message to attacked ship and check if it sunk as a result of this hit,\n  _sendHit(gameBoard, targetedShip) {\n\n    // Send a 'hit' message to the ship that was attacked\n    targetedShip.hit();\n\n    // If the ship has sunk, check if all ships are sunk now\n    if (targetedShip.isSunk()) gameBoard._validateAllShipsSunkState();\n  }\n\n\n  // Add a ship to the grid at the given coordinates\n  _addShipToGrid(axisX, axisY, shipSize, orientation) {\n    const newShip = utils.shipFactory(shipSize, orientation);\n\n    if (orientation === 'horizontal') { // Spread ship horizontally over grid cells\n      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX + i, axisY, newShip);\n    } else if (orientation === 'vertical') { // Spread ship vertically over grid cells\n      for (let i = 0; i < shipSize; i++) this._setCellValue(axisX, axisY + i, newShip);\n    }\n  }\n\n  // Check input, create a new ship instance and add it to the grid\n  placeShip(axisX, axisY, shipSize, orientation) {\n\n    // Import must be placed here for tests to work\n    const validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\");\n\n    // Check if values are valid coordinates on the board\n    validateInput.validateCoordinates(axisX, axisY);\n\n    // Check if size of ship is valid\n    validateInput.validateShipSize(shipSize);\n\n    // Check if orientation is valid\n    validateInput.validateOrientation(orientation);\n\n    // Validate placement: Prevent that ships are placed outside the board boundaries\n    validatePlacement.checkBoardBoundaries(this.getBoardSize(), axisX, axisY, shipSize, orientation);\n\n    // Validate placement: Prevent that ships overlap each other\n    validatePlacement.checkShipOverlap(this, axisX, axisY, shipSize, orientation);\n\n    // All values and the placement conditions are validated: add ship to the grid\n    this._addShipToGrid(axisX, axisY, shipSize, orientation);\n  }\n\n  // Gameboard reveived a attack, determine whether or not a ship was hit\n  receiveAttack(axisX, axisY) {\n\n    // Import must be placed here for tests to work\n    const validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\");\n\n    // Check if values are valid coordinates on the board\n    validateInput.validateCoordinates(axisX, axisY);\n\n    // Validate the cell that received an attack, it can only be 'empty' or a ship\n    const attackedCell = this._getCellValue(axisX, axisY);\n\n    if (attackedCell instanceof Ship) { // The cell contains a ship\n\n      // Send 'hit' message to the corresponding ship\n      this._sendHit(this, attackedCell);\n      return true;\n    }\n\n    // The attack didn't hit a ship\n    return false;\n  }\n}\n\nmodule.exports = Gameboard;\n\n\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable class-methods-use-this */\n\nconst validateInput = __webpack_require__(/*! ./utils/validateInput.js */ \"./src/modules/utils/validateInput.js\");\nconst utils = __webpack_require__(/*! ./utils/utils.js */ \"./src/modules/utils/utils.js\");\n\nclass Player {\n  constructor(gameControl, name = 'Player') {\n    this.name = name; // Players name becomes 'Player' if no name was given\n    this.gameControl = gameControl; // Set the current game controller\n    this.active = false; // Determines this player is active\n    this.sentAttacks = []; // Store coordinates of all previous attacks\n    this.isHuman = true; // A player can be human or computer\n  }\n\n  // Get coordinates of all the placed attacks\n  getSentAttacks() {\n    return this.sentAttacks;\n  }\n\n  // Store attacked coordinates\n  _setSentAttacks(axisX, axisY) {\n    this.sentAttacks.push([axisX, axisY]);\n  }\n\n  // Check if it's players turn to play\n  isActive() {\n    return this.active;\n  }\n\n  // Switch turns between players\n  toggleActiveState() {\n    this.active = !this.active;\n  }\n\n  // Generate a random valid coordinate to attack\n  generateRandomCoordinate() {\n    const newCoordinate = [];\n    let axisX = 0;\n    let axisY = 0;\n\n    // Keep generating a coordinate until it is valid\n    while (validateInput.validateSentAttacks(this, axisX, axisY) === false) {\n      axisX = utils.getRandomInt(this.gameControl.getBoardSize());\n      axisY = utils.getRandomInt(this.gameControl.getBoardSize());\n    }\n\n    // Add valid coordinate to list\n    newCoordinate.push(axisX, axisY);\n\n    return newCoordinate;\n  }\n\n  // Send a attack to a specific grid cell\n  sendAttack(axisX, axisY, cell) {\n\n    // Check if values are valid coordinates on the board\n    validateInput.validateCoordinates(axisX, axisY);\n\n    // Send attack to the game controller\n    this.gameControl.receiveAttackRequest(axisX, axisY, this, cell);\n\n    // Store attacked coordinates\n    this._setSentAttacks(axisX, axisY);\n\n    return false;\n  }\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/utils/utils.js":
/*!************************************!*\
  !*** ./src/modules/utils/utils.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ../battleship.js */ \"./src/modules/battleship.js\");\n\n// Used for creating ship 'parts' when one ship has to be placed over multiple cells\nfunction shipFactory(shipSize, orientation) {\n  return new Ship(shipSize, orientation);\n}\n\n// Generate random number within gameboard boundaries\nfunction getRandomInt(boardSize) {\n  return Math.floor(Math.random() * boardSize);\n}\n\n// Reports when all ships on one of the boards are sunken\nfunction isGameOver(gameboardOne, gameboardTwo) {\n  if (gameboardOne.getAllShipsSunkState() || gameboardTwo.getAllShipsSunkState()) {\n    throw new Error('Game over!');\n  }\n}\n\nmodule.exports = {\n  shipFactory,\n  getRandomInt,\n  isGameOver,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/utils.js?");

/***/ }),

/***/ "./src/modules/utils/validateInput.js":
/*!********************************************!*\
  !*** ./src/modules/utils/validateInput.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable max-len */\n\nconst Gameboard = __webpack_require__(/*! ../gameboard.js */ \"./src/modules/gameboard.js\"); // Only used to validate data-type\n\n// Check if given coordinates are actual coordinates on the board\nfunction validateCoordinates(axisX, axisY, boardSize = 10) {\n\n  // Values are undefined or not a number\n  if (axisX === undefined || axisY === undefined\n    || typeof axisX !== 'number' || typeof axisY !== 'number') {\n    throw new Error('Input is invalid'); // Check for valid datatype\n  }\n\n  // Values must fit on the gameboard\n  if (axisX < 0 || axisX >= boardSize || axisY < 0 || axisY >= boardSize) {\n    throw new Error('Coordinate exceeds board boundaries'); // Check for invalid coordinates\n  }\n}\n\n// Check if given ship size is a valid size\nfunction validateShipSize(size) {\n  if (size === undefined || typeof size !== 'number' || size < 2 || size > 5) {\n    throw new Error('Invalid ship size'); // Check for empty input\n  }\n}\n\n// Check if given orientation is a valid orientation\nfunction validateOrientation(orientation) {\n  if (orientation !== 'horizontal' && orientation !== 'vertical') {\n    throw new Error('Invalid orientation'); // Check for valid orientation\n  }\n}\n\n// Check if gameboard is defined and an instance of the Gameboard class\nfunction validateGameBoard(gameBoard) {\n  if (gameBoard === undefined) throw new Error('Input is incomplete');\n  if (!(gameBoard instanceof Gameboard)) throw new Error('Input is invalid');\n}\n\n// Check if players are defined and objects\nfunction validatePlayerValue(player) {\n  if (player === undefined || typeof player !== 'object') throw new Error('Missing player');\n}\n\n// Compare coordinate with coordinates that were already attacked by player\nfunction validateSentAttacks(player, axisX, axisY) {\n  if (player.getSentAttacks().find((coordinate) => JSON.stringify(coordinate) === JSON.stringify([axisX, axisY]))) {\n    throw new Error('Cell already attacked!');\n  }\n}\n\n// Throw error when player is not active\nfunction validatePlayerActiveState(player) {\n  if (!player.isActive()) throw new Error('It\\'s not your turn!');\n}\n\nmodule.exports = {\n  validateCoordinates,\n  validateOrientation,\n  validateShipSize,\n  validateGameBoard,\n  validatePlayerValue,\n  validateSentAttacks,\n  validatePlayerActiveState,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/validateInput.js?");

/***/ }),

/***/ "./src/modules/utils/validatePlacement.js":
/*!************************************************!*\
  !*** ./src/modules/utils/validatePlacement.js ***!
  \************************************************/
/***/ ((module) => {

eval("// Check if the complete ship fits on the board at a given coordinate\nfunction checkBoardBoundaries(gameBoard, axisX, axisY, shipSize, orientation) {\n\n  if (orientation === 'horizontal' && axisX + shipSize > gameBoard) {\n    throw new Error('Ship exceeds board limits'); // Exceeds horizontal board boundary\n  }\n\n  if (orientation === 'vertical' && axisY + shipSize > gameBoard) {\n    throw new Error('Ship exceeds board limits'); // Exceeds vertical board boundary\n  }\n}\n\n// Check if the ship overlaps another placed ship\nfunction checkShipOverlap(gameBoard, axisX, axisY, shipSize, orientation) {\n\n  for (let i = 0; i < shipSize; i++) {\n\n    if (orientation === 'horizontal' && gameBoard._getCellValue(axisX + i, axisY) !== 'empty') {\n      // Placing the ship horizontally crosses at least one 'not empty' cell\n      throw new Error('Ships overlapping');\n    }\n\n    if (orientation === 'vertical' && gameBoard._getCellValue(axisX, axisY + i) !== 'empty') {\n      // Placing the ship vertically crosses at least one 'not empty' cell\n      throw new Error('Ships overlapping');\n    }\n  }\n}\n\nmodule.exports = {\n  checkBoardBoundaries,\n  checkShipOverlap,\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/utils/validatePlacement.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;