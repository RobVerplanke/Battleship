/* global describe, it, expect */

const gameboard = require('../modules/gameboard.js');

describe('gameboard', () => {

  it('should exist', () => {
    const newBoard = new Gameboard();
    expect(newBoard).toBeDefined();
  });
});
