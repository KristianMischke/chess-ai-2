// Computer makes a move with eval choice and depth level
var makeMove = function(eval, depth=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  var move = calcBestMove(eval, depth, game, game.turn())[1];
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(evalW=eval_1, depthW=3, evalB=eval_1, depthB=3) {
  if(clearFlag) {
    console.log("clearing board");
    board.start();
    game.clear();
    return;
  }
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  var eval = game.turn() === 'w' ? evalW : evalB;
  var depth = game.turn() === 'w' ? depthW : depthB;
  makeMove(eval, depth);
  window.setTimeout(function() {
    playGame(evalW, depthW, evalB, depthB);
  }, 250);
};

var clearFlag = false;
var resetBoard = function() {
  clearFlag = true;
}

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(eval_1, 3);
  }, 250);
};
