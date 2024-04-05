/* global describe, it, expect */

const Gameboard = require('../modules/gameboard.js');
const Ship = require('../modules/battleship.js');

beforeEach(() => {
    jest.clearAllMocks();
});


describe('Gameboard', () => {

  describe('placeShip', () => {
  
    it('throws error when input is empty', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip(); // No arguments given
      }).toThrow('Input is invalid');
    });

    it('throws error when only one coordinate value is given', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1); // Only one argument given
      }).toThrow('Input is invalid');
    });

    it('throws error when no size and orientation are given', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2); // Size and orientation are undefined
      }).toThrow('Invalid ship size');
    });
    
    it('throws error when a coordinate exceeds board boundaries', () => {
      const gameBoard = new Gameboard();
      
      expect(() => {
        gameBoard.placeShip(-1, 2, 1); // X-axis is to low
        gameBoard.placeShip(1, 12, 1); // Y-axis is to high
      }).toThrow('Coordinate exceeds board boundaries');
    });
  
    it('throws error when ship size is invalid', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip(1, 2, 1); // Ship size is to small
        gameBoard.placeShip(1, 2, 6); // Ship size is to large
      }).toThrow('Invalid ship size');
    });

    it('throws error when orientation is undefined', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2, 2); // Orientation is undefined
      }).toThrow('Invalid orientation');
    });

    it('throws error when orientation is empty', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2, 2, ''); // Orientation is empty
      }).toThrow('Invalid orientation');
    });

    it('throws error when orientation is not recognized', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2, 3, 'diagonal'); // Orientation not recognized
      }).toThrow('Invalid orientation');
    });

    it('throws error when orientation is a number', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2, 3, 4); // Orientation is a number
      }).toThrow('Invalid orientation');
    });

    it('throws error when size is not a number', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip(1, 2, 'size', 'horizontal'); // Ship size is not a number
      }).toThrow('Invalid ship size');
    });
              
    it('throws error when coordinate is not a number', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip('axisX', 'axisY', 5, 'horizontal'); // Coordinates are not number
      }).toThrow('Input is invalid');
    });

    it('can place a ship vertically', () => {
      const gameBoard = new Gameboard();

      const axisX = 1;
      const axisY = 2;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'vertical'); // Orientation is vertical

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX][axisY + i]).toEqual({ size: 5, orientation: 'vertical', hits: 0, sunk: false });
      }
    });

    it('can place a ship horizontally', () => {
      const gameBoard = new Gameboard();

      const axisX = 1;
      const axisY = 2;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'horizontal'); // Orientation is horizontal

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX + i][axisY]).toEqual({ size: 5, orientation: 'horizontal', hits: 0, sunk: false });
      }
    });

    it('can place a ship vertically at the edge of the board', () => {
      const gameBoard = new Gameboard();

      const axisX = 9;
      const axisY = 0;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'vertical'); // Orientation is vertical

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX][axisY + i]).toEqual({ size: 5, orientation: 'vertical', hits: 0, sunk: false });
      }
    });

    it('can place a ship horizontally at the edge of the board', () => {
      const gameBoard = new Gameboard();

      const axisX = 0;
      const axisY = 0;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'horizontal'); // Orientation is horizontal

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX + 1][axisY]).toEqual({ size: 5, orientation: 'horizontal', hits: 0, sunk: false });
      }
    });
    
    it('throws error if ship is placed outside of board boundaries', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(6, 2, 5, 'horizontal'); // Ship exceeds board boundaries horizontally
      }).toThrow('Ship exceeds board limits');

      expect(() => {
        gameBoard.placeShip(1, 8, 3, 'vertical'); // Ship exceeds board boundaries vertically
      }).toThrow('Ship exceeds board limits');
    })

    it('throws error if ship is completely overlapping an excisting ship', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2, 5, 'horizontal');
        gameBoard.placeShip(1, 2, 5, 'horizontal'); // Ship is completely overlapped
      }).toThrow('Ships overlapping');
    })
    
    it('throws error if ship partially overlaps an excisting ship', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(0, 0, 3, 'vertical');
        gameBoard.placeShip(0, 2, 5, 'vertical'); // Partially overlaps other ship
      }).toThrow('Ships overlapping');
    })

    it('throws error if ship is crossing an excisting ship', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 0, 5, 'vertical');
        gameBoard.placeShip(0, 2, 3, 'horizontal'); // Ship crosses other ship
      }).toThrow('Ships overlapping');
    })
  });


  describe('receiveAttack', () => {

    it('throws error if coordinates are left empty', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(); // Input is empty
      }).toThrow('Input is invalid');
    })

    it('throws error if input is a space', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(' '); // Value is a space
      }).toThrow('Input is invalid');
    })

    it('throws error if only one coordinate is given', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(1); // Only one coordinate
      }).toThrow('Input is invalid');
    })

    it('throws error if input is not a number', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack('axisX'); // One value which is not a number
        gameBoard.receiveAttack('axisX', 'axisY'); // Two values are not numbers
      }).toThrow('Input is invalid');
    })

    it('throws error if one coordinate is not a number', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(1, 'axisY'); // Second value is not a number
        gameBoard.receiveAttack('axisX', 2); // First value is not a number
      }).toThrow('Input is invalid');
    })

    it('throws error if coordinates are outside board boundaries', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(11, 2); // Coordinate outside board
        gameBoard.receiveAttack(1, 12); // Coordinate outside board
        gameBoard.receiveAttack(-1, 2); // Coordinate outside board
        gameBoard.receiveAttack(1, -2); // Coordinate outside board
      }).toThrow('Coordinate exceeds board boundaries');
    })

    it('should return true when an attack hits target', () => {
      const gameBoard = new Gameboard();

      gameBoard.placeShip(1, 2, 3, 'horizontal'); // Place target
      const result = gameBoard.receiveAttack(1, 2); // Hit the target

      expect(result).toBeTruthy();
    })

    it('should return false when an attack missed target', () => {
      const gameBoard = new Gameboard();
  
      gameBoard.placeShip(1, 2, 3, 'horizontal'); // Place target
      const result = gameBoard.receiveAttack(1, 3); // Miss the target

      expect(result).toBeFalsy();
    })

    it('calls hit method on attacked ship', () => {
      const gameBoard = new Gameboard();
      const mockHit = jest.spyOn(gameBoard, '_sendHit'); // Spy on _sendHit method

      gameBoard.placeShip(1, 2, 3, 'horizontal'); // Place target
      gameBoard.receiveAttack(2, 2); // Hit the target
      
      expect(mockHit).toBeCalled(); // _sendHit method is called

    })

    it('updates the hit counter of an attacked ship', () => {
      
      jest.mock('../modules/battleship.js', () => { // Mock the Ship class
        return jest.fn().mockImplementation(() => {
          return {
            hit: jest.fn(),
            hits: 0
          };
        });
      });
      
      const gameBoard = new Gameboard();
      const mockedShip = new Ship(); // Create an mocked instance of the Ship class
  
      // Call _sendHit method with the mocked ship
      gameBoard._sendHit(gameBoard, mockedShip);
  
      // Check if the hits-property of the mocked ship is raised with one
      expect(mockedShip.hits).toBe(1);
    })

    it('should report whether or not all ships are sunk, with all ships on the board', () => {
      const gameBoard = new Gameboard();

      // Place all 5 ships
      gameBoard.placeShip(1, 1, 2, 'vertical'); // Place ship with size 2
      gameBoard.placeShip(4, 2, 3, 'horizontal'); // Place ship with size 3
      gameBoard.placeShip(9, 5, 3, 'vertical'); // Place ship with size 3
      gameBoard.placeShip(3, 6, 4, 'horizontal'); // Place ship with size 4
      gameBoard.placeShip(0, 4, 5, 'vertical'); // Place ship with size 5
      expect(gameBoard.getAllShipsSunkState()).toBeFalsy(); // Not all ship are sunk

      // All ships receive one hit
      gameBoard.receiveAttack(1, 1); // No ship has sunk
      gameBoard.receiveAttack(4, 2);
      gameBoard.receiveAttack(9, 5);
      gameBoard.receiveAttack(3, 6);
      gameBoard.receiveAttack(0, 4);
      expect(gameBoard.getAllShipsSunkState()).toBeFalsy(); // Not all ship are sunk

      // All ships receive a second hit
      gameBoard.receiveAttack(1, 2); // First ship has sunk
      gameBoard.receiveAttack(5, 2);
      gameBoard.receiveAttack(9, 6);
      gameBoard.receiveAttack(4, 6);
      gameBoard.receiveAttack(0, 5);
      expect(gameBoard.getAllShipsSunkState()).toBeFalsy(); // Not all ship are sunk

      // All remaining ships receive a third hit
      gameBoard.receiveAttack(6, 2); // Second ship has sunk
      gameBoard.receiveAttack(9, 7); // Third ship has sunk
      gameBoard.receiveAttack(5, 6);
      gameBoard.receiveAttack(0, 6);
      expect(gameBoard.getAllShipsSunkState()).toBeFalsy(); // Not all ship are sunk

      // All remaining ships receive a fourth hit
      gameBoard.receiveAttack(6, 6); // Fourth ship has sunk
      gameBoard.receiveAttack(0, 7);
      expect(gameBoard.getAllShipsSunkState()).toBeFalsy(); // Not all ship are sunk

      // The gameboard itself should report that not all ships are sunk now
      expect(gameBoard.allShipsSunk).toBeFalsy();

      // Last ship recieves a fifth hit
      gameBoard.receiveAttack(0, 7); // Fifth ship has sunk
      expect(gameBoard.getAllShipsSunkState()).toBeTruthy(); // All ships are sunk

      // The gameboard itself should report that all ships are sunk now
      expect(gameBoard.allShipsSunk).toBeTruthy();
    })
  });
});
