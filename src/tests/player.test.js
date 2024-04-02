const Player = require('../modules/player.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Player', () => {

    it('creates a new player with a default name when no name was given', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();

        expect(newPlayer.name).toBe('Player'); // No name is given
    })

    it('creates a new player with correct name value', () => {
        const newPlayer = new Player('Testname');
        newPlayer.toggleActiveState();

        expect(newPlayer.name).toBe('Testname'); // Name is stored
    })

    it('should contain the method sendAttack()', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();
        
        expect(() => {
            newPlayer.sendAttack(); // Method to send an attack does excist
        }).toBeDefined();
    })

    it('has the roles human or computer', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();
       
        expect(newPlayer.isHuman).toBeTruthy(); // Playe has human role
    })

    it('should throw error if no arguments are given', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();
        
        expect(() => { 
            newPlayer.sendAttack(); // No arguments given
        }).toThrow('Input is invalid');
    })

    it('should throw error if one argument is given', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();
        
        expect(() => {
            newPlayer.sendAttack('argument'); // Only one string given
        }).toThrow('Input is invalid');

        expect(() => {
            newPlayer.sendAttack(1); // Only one number given
        }).toThrow('Input is invalid');
    })

    it('should throw error if one argument isn\'t a number', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();
        
        expect(() => {
            newPlayer.sendAttack('argument', 1); // One string, one number given
        }).toThrow('Input is invalid');

        expect(() => {
            newPlayer.sendAttack(1, 'argument'); // One number, one string given
        }).toThrow('Input is invalid');
    })

    it('can generate a random valid coordinate', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();

        // Generate a valid random coordinate
        const randomCoordinate = newPlayer.generateRandomCoordinate();
    
        // Check if the first value is between 0 and 9
        expect(randomCoordinate[0]).toBeGreaterThanOrEqual(0);
        expect(randomCoordinate[0]).toBeLessThanOrEqual(9);
    
        // Check if the second value is between 0 and 9
        expect(randomCoordinate[1]).toBeGreaterThanOrEqual(0);
        expect(randomCoordinate[1]).toBeLessThanOrEqual(9);
    })

    it('prevents to generate a coordinate that was already attacked', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();

        // Generate a valid random coordinate
        const randomCoordinate = newPlayer.generateRandomCoordinate();
        const axisX = randomCoordinate[0];
        const axisY = randomCoordinate[1];

        // Place an atack on the generated coordinate
        newPlayer.sendAttack(axisX, axisY);

        expect(() => { // Atack the same cell again
           newPlayer.toggleActiveState();
           newPlayer.sendAttack(axisX, axisY);
        }).toThrow('Cell already attacked!');
    })

    it('should prevent player places two attacks or more in a row', () => {
        const newPlayer = new Player();
        newPlayer.toggleActiveState();
        
        newPlayer.sendAttack(1, 2); // Send an attack
               
        expect(() => {
            newPlayer.sendAttack(2, 3);
        }).toThrow('It\'s not your turn!'); // Directly place antoher attack
    })   
})