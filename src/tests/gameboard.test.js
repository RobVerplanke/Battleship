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
      gameBoard.placeShip(-1, 2, 3); // X-axis is -1
    }).toThrow('Invalid coordinate');
  });

  it('throws error when coordinate value is to high', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(1, 12, 3); // Y-axis is 12
    }).toThrow('Invalid coordinate');
  });

  it('throws error when shipsize is to small', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(1, 2, 0); // Ship size is 0
    }).toThrow('Invalid ship size');
  });

  it('throws error when shipsize is to big', () => {
    const gameBoard = new Gameboard();
  
    expect(() => {
      gameBoard.placeShip(1, 2, 6); // Ship size is 6
    }).toThrow('Invalid ship size');
  });


  it('places a ship at the correct coordinates when input is valid', () => {
      const gameBoard = new Gameboard();

      gameBoard.placeShip(1, 2, 3); // (X-axis, Y-axis, ship size)

      expect(gameBoard.grid[1][2]).toEqual({ size: 3, hit: null, sunk: false });
    });
});
