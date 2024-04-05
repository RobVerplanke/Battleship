/** @jest-environment jsdom */
/* global describe, it, expect */

const GameController = require('../modules/gameControl.js');
const Gameboard = require('../modules/gameboard.js');
const Player = require('../modules/player.js');

beforeEach(() => {
    jest.clearAllMocks();
})


describe('Game controller', () => {

    it('should exist', () => {
        newGameControl = new GameController();
    
        expect(newGameControl).toBeDefined();
    })

    it('contains two players, two gameboards and two DOM-gameboards', () => {
        newGameControl = new GameController();

        expect(newGameControl.playerOne).toBeDefined();
        expect(newGameControl.playerTwo).toBeDefined();
        expect(newGameControl.gameboardOne).toBeDefined();
        expect(newGameControl.gameboardTwo).toBeDefined();
        expect(newGameControl.gameboardDOMOne).toBeDefined();
        expect(newGameControl.gameboardDOMTwo).toBeDefined();
    })

    it('should handle a invalid incoming attack request', () => {
        newGameControl = new GameController();

        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerOne.active = true; // Make playe active
        
        const axisX = 11;
        const axisY = 2;

        // Send invalid attack
        expect(() => { 
            newGameControl.receiveAttackRequest(axisX, axisY, newGameControl.playerOne); // Coordinates exceed board
        }).toThrow('Coordinate exceeds board boundaries');
        
    })

    it('should by default deactivate both players', () => {
        const newGameControl = new GameController();

        // Create new players in the controller
        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerTwo = new Player(newGameControl, 'Player two');

        // Initial active states must be false
        expect(newGameControl.playerOne.active).toBeFalsy();
        expect(newGameControl.playerTwo.active).toBeFalsy();
    })

    it('should by default deactivate both gameboard', () => {
        const newGameControl = new GameController();

        // Initial active states must be false
        newGameControl.gameboardOne = new Gameboard('gameboardOne');
        newGameControl.gameboardTwo = new Gameboard('gameboardTwo');

        // Initial active states must be false
        expect(newGameControl.gameboardOne.active).toBeFalsy();
        expect(newGameControl.gameboardTwo.active).toBeFalsy();
    })

    it('should only allow player ONE to attack gameboard TWO', () => {
        const newGameControl = new GameController();
        const cell = document.createElement('div');

        // Add data-attribute to DOM-element
        cell.setAttribute('data-hasShip', 'true');
        
        // Create new players in the controller
        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerTwo = new Player(newGameControl, 'Player two');
        
        // Mock gameboard class
        jest.mock('../modules/gameboard.js');

        // Create new mock gameboards in the controller
        newGameControl.gameboardOne = new Gameboard('gameboardOne');
        newGameControl.gameboardTwo = new Gameboard('gameboardTwo');

        // Spy on receiveAttack method
        const mockReceiveAttackOne = jest.spyOn(newGameControl.gameboardOne, 'receiveAttack');
        const mockReceiveAttackTwo = jest.spyOn(newGameControl.gameboardTwo, 'receiveAttack');
        
        const axisX = 1;
        const axisY = 2;
        
        // Receive attack request from player one
        newGameControl.playerOne.active = true; // Make player one active
        newGameControl.receiveAttackRequest(axisX, axisY, newGameControl.playerOne, cell);

        expect(mockReceiveAttackOne).not.toHaveBeenCalled(); // Gameboard one is not called
        expect(mockReceiveAttackTwo).toHaveBeenCalledWith(1, 2); // Gameboard to is called
    })

    it('should only allow player TWO to attack gameboard ONE', () => {
        const newGameControl = new GameController();
        const cell = document.createElement('div');

        // Add data-attribute to DOM-element
        cell.setAttribute('data-hasShip', 'true');
        
        // Create new players in the controller
        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerTwo = new Player(newGameControl, 'Player two');
        
        // Mock gameboard class
        jest.mock('../modules/gameboard.js');

        // Create new mock gameboards in the controller
        newGameControl.gameboardOne = new Gameboard('gameboardOne');
        newGameControl.gameboardTwo = new Gameboard('gameboardTwo');

        // Spy on receiveAttack method
        const mockReceiveAttackOne = jest.spyOn(newGameControl.gameboardOne, 'receiveAttack');
        const mockReceiveAttackTwo = jest.spyOn(newGameControl.gameboardTwo, 'receiveAttack');
        
        const axisX = 3;
        const axisY = 4;
        
        // Receive attack request from player two
        newGameControl.playerTwo.active = true; // Make player two active
        newGameControl.receiveAttackRequest(axisX, axisY, newGameControl.playerTwo, cell);

        expect(mockReceiveAttackTwo).not.toHaveBeenCalled(); // Gameboard one is not called
        expect(mockReceiveAttackOne).toHaveBeenCalledWith(3, 4); // Gameboard to is called
    })

    it('should switch players turns after each attack', () => {
        const newGameControl = new GameController();
        const cell = document.createElement('div');

        // Add data-attribute to DOM-element
        cell.setAttribute('data-hasShip', 'true');

        // Create new players in the controller
        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerTwo = new Player(newGameControl, 'Player two');

        // Create new gameboards in the controller
        newGameControl.gameboardOne = new Gameboard('gameboardOne');
        newGameControl.gameboardTwo = new Gameboard('gameboardTwo');

        const axisX = 1;
        const axisY = 2;
        
        // Player one places a attack
        newGameControl.playerOne.active = true; // Make player one active
        newGameControl.receiveAttackRequest(axisX, axisY, newGameControl.playerOne, cell);

        expect(newGameControl.playerOne.active).toBeFalsy(); // Player one is not active
        expect(newGameControl.playerTwo.active).toBeTruthy(); // Player two is active
    })

    it('prevents that a cell can be attacked more than once', () => {
        const newGameControl = new GameController();
        const cell = document.createElement('div');

        // Add data-attribute to DOM-element
        cell.setAttribute('data-hasShip', 'true');

        // Create new player in the controller
        newGameControl.playerOne = new Player(newGameControl, 'Player one');

        // Create new gameboards in the controller
        newGameControl.gameboardOne = new Gameboard('gameboardOne');
        newGameControl.gameboardTwo = new Gameboard('gameboardTwo');

        const axisX = 1;
        const axisY = 2;
        
        // Player one places a attack
        newGameControl.playerOne.active = true; // Make player one active
        newGameControl.playerOne.sendAttack(axisX, axisY, cell);

        // Player one attacks same cell
        newGameControl.playerOne.active = true; // Make player one active
        expect(() => {
            newGameControl.playerOne.sendAttack(axisX, axisY, cell);
        }).toThrow('Cell already attacked!');
    })

    it('should only let active player place an attack', () => {
        const newGameControl = new GameController();
        const cell = document.createElement('div');

        // Add data-attribute to DOM-element
        cell.setAttribute('data-hasShip', 'true');

        // Create new players in the controller
        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerTwo = new Player(newGameControl, 'Player two');

        // Create new gameboards in the controller
        newGameControl.gameboardOne = new Gameboard('gameboardOne');
        newGameControl.gameboardTwo = new Gameboard('gameboardTwo');

        const axisX = 1;
        const axisY = 2;

        newGameControl.playerOne.active = true; // Make player one active
        newGameControl.playerOne.sendAttack(axisX, axisY, cell); // Place an attack

        expect(() => {
            newGameControl.playerOne.sendAttack(3, 4, cell); // Directly place an other attack

        }).toThrow('It\'s not your turn!');      
    })

    it('should report when all ships are sunken', () => {
        const newGameControl = new GameController();
        const cell = document.createElement('div');

        // Add data-attribute to DOM-element
        cell.setAttribute('data-hasShip', 'true');

        newGameControl.gameboardOne = new Gameboard();
        newGameControl.gameboardTwo = new Gameboard();

        newGameControl.playerOne = new Player(newGameControl, 'Player one');
        newGameControl.playerTwo = new Player(newGameControl, 'Player two');

        // Place five ships
        newGameControl.gameboardTwo.placeShip(0, 0, 2, 'horizontal');
        newGameControl.gameboardTwo.placeShip(3, 0, 3, 'vertical');
        newGameControl.gameboardTwo.placeShip(7, 0, 3, 'horizontal');
        newGameControl.gameboardTwo.placeShip(0, 5, 4, 'vertical');
        newGameControl.gameboardTwo.placeShip(5, 5, 5, 'horizontal');
        
        // Attack all 5 ship
        newGameControl.playerOne.active = true; // Make player one active
        newGameControl.playerOne.sendAttack(0, 0, cell); // Hits ship 1 (1x2)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(1, 0, cell); // Hits ship 1 (2x2)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(3, 0, cell); // Hits ship 2 (1x3)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(3, 1, cell); // Hits ship 2 (2x3)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(3, 2, cell); // Hits ship 2 (3x3)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(7, 0, cell); // Hits ship 3 (1x3)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(8, 0, cell); // Hits ship 3 (2x3)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(9, 0, cell); // Hits ship 3 (3x3)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(0, 5, cell); // Hits ship 4 (1x4)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(0, 6, cell); // Hits ship 4 (2x4)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(0, 7, cell); // Hits ship 4 (3x4)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(0, 8, cell); // Hits ship 4 (4x4)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(5, 5, cell); // Hits ship 5 (1x5)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(6, 5, cell); // Hits ship 5 (2x5)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(7, 5, cell); // Hits ship 5 (3x5)
        newGameControl.playerOne.active = true;
        newGameControl.playerOne.sendAttack(8, 5, cell); // Hits ship 5 (4x5)
        newGameControl.playerOne.active = true;

        expect(() => {
            newGameControl.playerOne.sendAttack(9, 5, cell); // Hits ship 5 (5x5)
        }).toThrow('Game over!');
    }) 

// Controleer of de gamecontroller het einde van het spel detecteert en de juiste acties onderneemt,
// zoals het aankondigen van de winnaar of het beëindigen van het spel.

})