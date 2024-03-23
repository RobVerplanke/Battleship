class Ship {
  constructor(size) {
    this.size = size;
    this.hit = null;
    this.sunk = false;
  }

  // Increase number of hits taken
  hit() {
    this.hit++;
  }

  // Return state of the sunk-property
  isSunk() {
    if (this.hit === this.size) return true; // Amount of hits is equal to ship size
    return false;
  }
}

module.exports = Ship;
