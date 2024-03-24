/* global describe, it, expect */

const Gameboard = require('../modules/gameboard.js');

// Mock Ship class
jest.mock('../modules/battleship.js', () => {
  return jest.fn().mockImplementation((size) => {
    return {
      size: size,
      hit: null,
      sunk: false
    }
  })
})

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Gameboard', () => {

  describe('placeShip', () => {
  
    it('throws error when input is empty', () => {
      const gameBoard = new Gameboard();
    
      expect(() => {
        gameBoard.placeShip(); // No arguments given
      }).toThrow('Input is incomplete');
    });

    it('throws error when no size and orientation are given', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(1, 2); // Size and orientation are undefined
      }).toThrow('Input is incomplete');
    });
    
    it('throws error when a coordinate exceeds board boundries', () => {
      const gameBoard = new Gameboard();
      
      expect(() => {
        gameBoard.placeShip(-1, 2, 1); // X-axis is to low
        gameBoard.placeShip(1, 12, 1); // Y-axis is to high
      }).toThrow('Invalid coordinate');
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
      }).toThrow('Input is not a number');
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
        expect(gameBoard.grid[axisX][axisY + i]).toEqual({ size: 5, hit: null, sunk: false });
      }
    });

    it('can place a ship horizontally', () => {
      const gameBoard = new Gameboard();

      const axisX = 1;
      const axisY = 2;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'horizontal'); // Orientation is horizontal

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX + i][axisY]).toEqual({ size: 5, hit: null, sunk: false });
      }
    });

    it('can place a ship vertically at the edge of the board', () => {
      const gameBoard = new Gameboard();

      const axisX = 9;
      const axisY = 0;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'vertical'); // Orientation is vertical

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX][axisY + i]).toEqual({ size: 5, hit: null, sunk: false });
      }
    });

    it('can place a ship horizontally at the edge of the board', () => {
      const gameBoard = new Gameboard();

      const axisX = 0;
      const axisY = 0;
      const size = 5;

      gameBoard.placeShip(axisX, axisY, size, 'horizontal'); // Orientation is horizontal

      for (let i = 0; i < size; i++) {
        expect(gameBoard.grid[axisX + 1][axisY]).toEqual({ size: 5, hit: null, sunk: false });
      }
    });
    
    it('throws error if ship is placed outside of board boundries', () => {
      const gameBoard = new Gameboard();

      expect(() => {
        gameBoard.placeShip(6, 2, 5, 'horizontal'); // Ship exceeds board boundries horizontally
      }).toThrow('Ship exceeds board limits');

      expect(() => {
        gameBoard.placeShip(1, 8, 3, 'vertical'); // Ship exceeds board boundries vertically
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

  });

});
