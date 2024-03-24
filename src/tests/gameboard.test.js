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
  });

  it('throws error when input is empty', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(); // No arguments given
    }).toThrow('Input is empty');
  });
  
  it('throws error when a coordinate exceeds board boundries', () => {
    const gameBoard = new Gameboard();
    
    expect(() => {
      gameBoard.placeShip(-1, 2, 1); // X-axis is to low
      gameBoard.placeShip(1, 12, 1); // Y-axis is to high
    }).toThrow('Invalid coordinate');
  });
  
  it('throws error when ship size is invalid', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(1, 2, 1); // Size is to small
      gameBoard.placeShip(1, 2, 6); // Size is to large
    }).toThrow('Invalid ship size');
  });
  
  it('throws error when orientation is empty', () => {
    const gameBoard = new Gameboard();

    expect(() => {
      gameBoard.placeShip(1, 2, 2, ''); // Orientation is empty
    }).toThrow('Invalid orientation');
  });

  it('throws error when orientation is undefined', () => {
    const gameBoard = new Gameboard();

    expect(() => {
      gameBoard.placeShip(1, 2, 2); // Orientation is undefined
    }).toThrow('Invalid orientation');
  });

  it('throws error when orientation is invalid', () => {
    const gameBoard = new Gameboard();

    expect(() => {
      gameBoard.placeShip(1, 2, 2, 'diagonal'); // Orientation is invalid
    }).toThrow('Invalid orientation');
  });

  it('places a ship at the correct coordinates when input is valid', () => {
    const gameBoard = new Gameboard();

    gameBoard.placeShip(1, 2, 2, 'horizontal'); // (X-axis, Y-axis, size, orientation)

    expect(gameBoard.grid[1][2]).toEqual({ size: 2, hit: null, sunk: false });
    expect(gameBoard.grid[2][2]).toEqual({ size: 2, hit: null, sunk: false });
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

  // Test if ship is placed within board boundries

});
