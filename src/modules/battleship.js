class Ship {
  constructor(size) {
    this.size = size; // Length of ship
    this.hits = null; // Tracks amount of attacks taken
    this.sunk = false; // Indicates whether ship is sunk
  }

  // Increase number of hits taken
  hit() {
    this.hit++;
  }

  // Checks if ship is sunk
  isSunk() {
    if (this.hit === this.size) return true; // Amount of hits is equal to ship size
    return false;
  }
}

module.exports = Ship;
