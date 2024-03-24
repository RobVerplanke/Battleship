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

// beforeEach(() => {
//     jest.clearAllMocks();
// });

describe('Gameboard', () => {

  describe('placeShip', () => {
  });

  it('throws error when input is empty', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(); // No arguments given
    }).toThrow('Input is empty');
  });
  
  it('throws error when coordinate value is to low', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(-1, 2, 1); // X-axis is -1
      gameBoard.placeShip(1, 12, 1); // Y-axis is 12
    }).toThrow('Invalid coordinate');
  });

  it('throws error when shipsize is invalid', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(1, 2, 0); // Ship size is 0
      gameBoard.placeShip(1, 2, 6); // Ship size is 6
    }).toThrow('Invalid ship size');
  });

  it('places a ship of size one at the correct coordinates when input is valid', () => {
    const gameBoard = new Gameboard();

    gameBoard.placeShip(1, 2, 1, 'horizontal'); // (X-axis, Y-axis, ship size, orientation)

    expect(gameBoard.grid[1][2]).toEqual({ size: 1, hit: null, sunk: false });
  });

  it('can place a ship larger than size one vertically', () => {
    const gameBoard = new Gameboard();

    gameBoard.placeShip(1, 2, 2, 'vertical'); // Orientation is vertical

    expect(gameBoard.grid[1][2]).toEqual({ size: 2, hit: null, sunk: false });
    expect(gameBoard.grid[1][3]).toEqual({ size: 2, hit: null, sunk: false });
  });

  it('can place a ship larger than size one horizontally', () => {
    const gameBoard = new Gameboard();

    gameBoard.placeShip(1, 2, 5, 'horizontal'); // Orientation is vertical

    expect(gameBoard.grid[1][2]).toEqual({ size: 5, hit: null, sunk: false });
    expect(gameBoard.grid[2][2]).toEqual({ size: 5, hit: null, sunk: false });
    expect(gameBoard.grid[3][2]).toEqual({ size: 5, hit: null, sunk: false });
    expect(gameBoard.grid[4][2]).toEqual({ size: 5, hit: null, sunk: false });
    expect(gameBoard.grid[5][2]).toEqual({ size: 5, hit: null, sunk: false });

  });

});
