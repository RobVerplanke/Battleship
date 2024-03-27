class Ship {
  constructor(size, orientation) {
    this.size = size; // Length of ship
    this.orientation = orientation; // Placed horizontally or vertically
    this.hits = 0; // Tracks amount of attacks taken
    this.sunk = false; // Indicates whether ship is sunk
  }

  // Increase number of hits taken
  hit() {
    this.hits += 1;
  }

  setIsSunkState(newState) {
    this.sunk = newState;
  }

  // Checks if ship is sunk
  isSunk() {
    if (this.hits === this.size) { // Amount of received hits is equal to ship size
      this.setIsSunkState(true); // If ship has sunk, set its sunk state
      return true;
    }
    return false;
  }
}

module.exports = Ship;
