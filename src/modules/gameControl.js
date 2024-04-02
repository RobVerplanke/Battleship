const Gameboard = require('./gameboard.js');
const Player = require('./player.js');
const GameboardDOM = require('../componentsDOM/gameboardDOM.js');

class GameControl {
  constructor() {
    this.playerOne = new Player('Player one'); // Players
    this.playerTwo = new Player('Player two');

    this.gameboardOne = new Gameboard(this.playerTwo); // Main gameboards with corresponding opponent
    this.gameboardTwo = new Gameboard(this.playerOne);

    this.gameboardDOMOne = new GameboardDOM('#player-one-gameboard', this.playerTwo); // Gameboards in the DOM
    this.gameboardDOMTwo = new GameboardDOM('#player-two-gameboard', this.playerOne);
  }

  activateGameboard(gameboard) {
    gameboard.toggleActiveState();
  }

  activatePlayer(player) {
    player.toggleActiveState();
  }

  // switch players

  // toggle active gameboard

}


module.exports = GameControl;
