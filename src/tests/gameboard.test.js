/* global describe, it, expect */

const Gameboard = require('../modules/gameboard.js');
const Ship = require('../modules/battleship.js');

// beforeEach(() => {
//     jest.clearAllMocks();
// });


describe('Gameboard', () => {

  describe('placeShip', () => {
  
    it('throws error when input is empty', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip(); // No arguments given
      }).toThrow('Input is incomplete');
    });

    it('throws error when only one coordinate value is given', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1); // Only one argument given
      }).toThrow('Input is incomplete');
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
    
    it('throws error when coordinate is not a number', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip('axisX', 'axisY', 5, 'horizontal'); // Coordinate is not a number
      }).toThrow('Input is not a number');
    });

    it('throws error when size is not a number', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip(1, 2, 'size', 'horizontal'); // Ship size is not a number
      }).toThrow('Invalid ship size');
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

    it('can place a ship vertically', () => {
      const gameBoard = new Gameboard();

      const axisX = 1;
      const axisY = 2;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'vertical'); // Orientation is vertical

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX][axisY + i]).toEqual({ size: 5, orientation: 'vertical', hits: null, sunk: false });
      }
    });

    it('can place a ship horizontally', () => {
      const gameBoard = new Gameboard();

      const axisX = 1;
      const axisY = 2;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'horizontal'); // Orientation is horizontal

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX + i][axisY]).toEqual({ size: 5, orientation: 'horizontal', hits: null, sunk: false });
      }
    });

    it('can place a ship vertically at the edge of the board', () => {
      const gameBoard = new Gameboard();

      const axisX = 9;
      const axisY = 0;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'vertical'); // Orientation is vertical

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX][axisY + i]).toEqual({ size: 5, orientation: 'vertical', hits: null, sunk: false });
      }
    });

    it('can place a ship horizontally at the edge of the board', () => {
      const gameBoard = new Gameboard();

      const axisX = 0;
      const axisY = 0;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'horizontal'); // Orientation is horizontal

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX + 1][axisY]).toEqual({ size: 5, orientation: 'horizontal', hits: null, sunk: false });
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
      }).toThrow('Input is incomplete');
    })

    it('throws error if only one coordinate is given', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(1); // Only one argument given
      }).toThrow('Input is incomplete');
    })

    it('throws error if coordinates are not numbers', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(1, 'axisY'); // Input contains not a number
      }).toThrow('Input is not a number');
    })

    it('throws error if coordinates are outside board boundaries', () => {
      const gameBoard = new Gameboard();
  
      expect(() => {
        gameBoard.receiveAttack(11, 2); // Coordinate outside board
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

    it('should call the hit() method of the corresponding ship', () => {
      const gameBoard = new Gameboard();
      const ship = new Ship(3);

      // const mockShip = jest.spyOn()
  
      gameBoard.placeShip(1, 2, 3, 'horizontal'); // Place target
      gameBoard.receiveAttack(1, 2); // Hit the ship

      
    })
  });

});
