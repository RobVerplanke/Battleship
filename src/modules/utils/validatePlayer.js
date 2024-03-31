// Check if playernames are defined and are objects
function validatePlayers(playerOne, playerTwo) {
  if (playerOne === undefined || typeof playerOne !== 'object'
      || playerTwo === undefined || typeof playerTwo !== 'object') {
    throw new Error('Missing player');
  }
}

function validateActivePlayer(activePlayer) {
  if (activePlayer.active === false) return false;
  return true;
}

module.exports = {
  validatePlayers,
  validateActivePlayer,
};
