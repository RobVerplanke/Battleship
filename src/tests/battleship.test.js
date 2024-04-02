/* global describe, it, expect */

const Ship = require('../modules/battleship.js');

describe('ship', () => {

  it('should Eexist', () => {
    const ship = new Ship();
    expect(ship).toBeDefined();
  });

  

});
