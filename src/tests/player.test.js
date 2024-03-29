const Player = require('../modules/player.js');
const Gameboard = require('../modules/gameboard.js');
const Ship = require('../modules/battleship.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Player', () => {

    it('creates a new player with a default name when no name was given', () => {
        const newPlayer = new Player();

        expect(newPlayer.name).toBe('Player'); // No name is given
    })

    it('creates a new player with correct name value', () => {
        const newPlayer = new Player('Testname');

        expect(newPlayer.name).toBe('Testname'); // Name is stored
    })

    it('should contain the method sendAttack()', () => {
        const newPlayer = new Player();
        
        expect(() => {
            newPlayer.sendAttack(); // Method to send an attack does excist
        }).toBeDefined();
    })

    it('should throw error if no arguments are given', () => {
        const newPlayer = new Player();
        
        expect(() => { 
            newPlayer.sendAttack(); // No arguments given
        }).toThrow('Input is incomplete');
    })

    it('should throw error if one argument is given', () => {
        const newPlayer = new Player();
        const gameBoard = new Gameboard();
        
        expect(() => {
            newPlayer.sendAttack('argument'); // Only one string given
        }).toThrow('Input is invalid');

        expect(() => {
            newPlayer.sendAttack(1); // Only one number given
        }).toThrow('Input is invalid');

        expect(() => {
            newPlayer.sendAttack(gameBoard); // Only a valid gameboard given
        }).toThrow('Input is invalid');
    })

    it('should throw error if two argumenta are given', () => {
        const newPlayer = new Player();
        
        expect(() => {
            newPlayer.sendAttack('argument', 1); // Two arguments given
        }).toThrow('Input is invalid');

        expect(() => {
            newPlayer.sendAttack(1, 'argument'); // Two arguments given
        }).toThrow('Input is invalid');
    })

    it('should throw error if only coordinates are given', () => {
        const newPlayer = new Player();
        
        expect(() => {
            newPlayer.sendAttack(1, 2); // Only coordinates given
        }).toThrow('Input is invalid');
    })

    it('should throw error if gameboard is not a instance of the Gameboard class', () => {
        const newPlayer = new Player();
        const testBoard = {};
        
        expect(() => {
            newPlayer.sendAttack(testBoard, 1, 2); // Invalid gameboard given
        }).toThrow('Input is invalid');
    })

    it('can send a attack message to a gameboard', () => {
        const mockedGameBoard = new Gameboard();
        const mockReceiveAttack = jest.spyOn(mockedGameBoard, 'receiveAttack'); // Spy on receiveAttack method
        const newPlayer = new Player();
        const opponent = new Player(); // Dummy

        newPlayer.sendAttack(mockedGameBoard, opponent, 1, 2);

        expect(mockReceiveAttack).toBeCalled();
    })

    it('places a missed attack on a gameboard with no ships', () => {
        
        // Mock the Gameboard
        jest.mock('../modules/gameboard.js', () => {
            return jest.fn().mockImplementation(() => {
              return {
                missedAttacks: new Set()
              };
            });
        });
        
        const gameBoard = new Gameboard();
        const newPlayer = new Player();
        const opponent = new Player(); // Dummy

        // Send an attack
        newPlayer.sendAttack(gameBoard, opponent, 1, 1); // Doesn't hit a ship
    
        // Check if the hits-property of the mocked ship is raised with one
        expect(Array.from(gameBoard.missedAttacks)).toEqual([[1, 1]]);
    })

    it('should call the sendHit method in case of a hit send by a player', () => {
        const gameBoard = new Gameboard();
        const mockHit = jest.spyOn(gameBoard, '_sendHit');
        const newPlayer = new Player();
        const opponent = new Player(); // Dummy
        
        // Place ship
        gameBoard.placeShip(1, 2, 3, 'horizontal');

        // Send an player attack
        newPlayer.sendAttack(gameBoard, opponent, 1, 2); // Hit the ship
    
        // The method _sendhit is called after a hit
        expect(mockHit).toHaveBeenCalled();
    })

    it('toggles players active-state after each attack', () => {
        const playerOne = new Player('Player one');
        const playerTwo = new Player('Player two');
        const gameBoardOne = new Gameboard();
        const gameBoardTwo = new Gameboard();

        // Set player one as active player
        playerOne.toggleActiveState();
        
        expect(playerOne.active).toBeTruthy(); // Active state is true
        expect(playerTwo.active).toBeFalsy(); // Active state is false

        //Player one attacks gameboard of player two
        playerOne.sendAttack(gameBoardTwo, playerTwo, 1, 1);

        expect(playerOne.active).toBeFalsy(); // Active state is false
        expect(playerTwo.active).toBeTruthy(); // Active state is true

        // Player two atacks gameboard of player one
        playerTwo.sendAttack(gameBoardOne, playerOne, 1, 1);

        expect(playerOne.active).toBeTruthy(); // Active state is true
        expect(playerTwo.active).toBeFalsy(); // Active state is false
    })

    it('should prevent that a grid cell is attacked more than once', () => {
        const playerOne = new Player('Player one');
        const playerTwo = new Player('Player two');
        const gameBoard = new Gameboard();

        // Attack a cell grid
        playerOne.sendAttack(gameBoard, playerTwo, 1, 2);
       
        expect(() => {
           playerOne.sendAttack(gameBoard, playerTwo, 1, 2); // Attack the same cell twice
        }).toThrow('Cell already attacked!');

        expect(() => {
            playerOne.sendAttack(gameBoard, playerTwo, 1, 2); // Attack the same cell three times
         }).toThrow('Cell already attacked!');
    })

    it('has the roles human or computer', () => {
        const playerOne = new Player();
       
        expect(playerOne.isHuman).toBeTruthy(); // Playe has human role

        playerOne.setPlayerAsComputer(); // Change role to cumputer

        expect(playerOne.isHuman).toBeFalsy(); // Player has the computer role

    })

    it('can generate a random valid coordinate', () => {
        const playerOne = new Player();
        const gameBoard = new Gameboard();
    
        // Generate a valid random coordinate
        const randomCoordinate = playerOne.generateRandomCoordinate(gameBoard);
    
        // Check if the first value is between 0 and 9
        expect(randomCoordinate[0]).toBeGreaterThanOrEqual(0);
        expect(randomCoordinate[0]).toBeLessThanOrEqual(9);
    
        // Check if the second value is between 0 and 9
        expect(randomCoordinate[1]).toBeGreaterThanOrEqual(0);
        expect(randomCoordinate[1]).toBeLessThanOrEqual(9);
    })
    
    it('prevents to generate a coordinate that was already attacked', () => {
        const playerOne = new Player();
        const playerTwo = new Player(); // Dummy
        const gameBoard = new Gameboard();

        // Generate a valid random coordinate
        const randomCoordinate = playerOne.generateRandomCoordinate(gameBoard);
        const axisX = randomCoordinate[0];
        const axisY = randomCoordinate[1];
    
        // Place an atack on the generated coordinate
        playerOne.sendAttack(gameBoard, playerTwo, axisX, axisY);

        expect(() => { // Atack the same cell again
            playerOne.sendAttack(gameBoard, playerTwo, axisX, axisY);
        }).toThrow('Cell already attacked!');
    })

    it('should store the random generated missed attack to missed attacks list', () => {
        const playerOne = new Player();
        const playerTwo = new Player(); // Dummy
        const gameBoard = new Gameboard();

        // Generate a valid random coordinate
        const randomCoordinate = playerOne.generateRandomCoordinate(gameBoard);
        const axisX = randomCoordinate[0];
        const axisY = randomCoordinate[1];
    
        // Place an atack on the generated coordinate
        playerOne.sendAttack(gameBoard, playerTwo, axisX, axisY);

        // Get the list with all missed attacks
        const missedAttacks = gameBoard._getMissedAttacks();

        // Missed random attack is stored in game board
        expect(missedAttacks.values(randomCoordinate)).toBeTruthy();
    })
})