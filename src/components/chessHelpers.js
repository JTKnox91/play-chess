export default void 0;

//staring positings for all the peices plus meta data about the board needed for caluclating legal moves
export const startingPositions = {
    a8: {id: "DR1", color: "dark", name: "rook"},
    b8: {id: "DN1", color: "dark", name: "knight"},
    c8: {id: "DB1", color: "dark", name: "bishop"},
    d8: {id: "DK1", color: "dark", name: "king"},
    e8: {id: "DQ1", color: "dark", name: "queen"},
    f8: {id: "DB2", color: "dark", name: "bishop"},
    g8: {id: "DN2", color: "dark", name: "knight"},
    h8: {id: "DR2", color: "dark", name: "rook"},
    a7: {id: "DP1", color: "dark", name: "pawn"},
    b7: {id: "DP2", color: "dark", name: "pawn"},
    c7: {id: "DP3", color: "dark", name: "pawn"},
    d7: {id: "DP4", color: "dark", name: "pawn"},
    e7: {id: "DP5", color: "dark", name: "pawn"},
    f7: {id: "DP6", color: "dark", name: "pawn"},
    g7: {id: "DP7", color: "dark", name: "pawn"},
    h7: {id: "DP8", color: "dark", name: "pawn"},
    a2: {id: "LP1", color: "light", name: "pawn"},
    b2: {id: "LP2", color: "light", name: "pawn"},
    c2: {id: "LP3", color: "light", name: "pawn"},
    d2: {id: "LP4", color: "light", name: "pawn"},
    e2: {id: "LP5", color: "light", name: "pawn"},
    f2: {id: "LP6", color: "light", name: "pawn"},
    g2: {id: "LP7", color: "light", name: "pawn"},
    h2: {id: "LP8", color: "light", name: "pawn"},
    a1: {id: "LR1", color: "light", name: "rook"},
    b1: {id: "LN1", color: "light", name: "knight"},
    c1: {id: "LB1", color: "light", name: "bishop"},
    d1: {id: "LK1", color: "light", name: "king"},
    e1: {id: "LQ1", color: "light", name: "queen"},
    f1: {id: "LB2", color: "light", name: "bishop"},
    g1: {id: "LN2", color: "light", name: "knight"},
    h1: {id: "LR2", color: "light", name: "rook"},
    a3: null, b3: null, c3: null, d3: null, e3: null, f3: null, g3: null, h3: null,
    a4: null, b4: null, c4: null, d4: null, e4: null, f4: null, g4: null, h4: null,
    a5: null, b5: null, c5: null, d5: null, e5: null, f5: null, g5: null, h5: null,
    a6: null, b6: null, c6: null, d6: null, e6: null, f6: null, g6: null, h6: null,
  //non-coordinate information about the board's pieces
    currentTurn: "light",
    kingHasMoved: {
      light: false,
      dark: false
    },
    kingPosition: {
      light: "d1",
      dark: "d8"
    }
};

//hrefs for iamges files for each piece
export const pieceImages = {
  light: {
    king: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    queen: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
    bishop: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    knight: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    rook: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    pawn: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
  },
  dark: {
    king: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
    queen: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
    bishop: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    knight: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    rook: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    pawn: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
  }
};

/*
  MOVE VALIDATION HELPERS
*/

//calculate the name of a square to move to given a starting coordinate and integers for change in rank and file
//file is horizontal movement, rank is vertical movement
function vectorToCoord (startCoord, fileDiff, rankDiff) {
  let file = startCoord[0];
  let rank = startCoord[1];

  file = String.fromCharCode(file.charCodeAt() + fileDiff);
  if (file < "a" || file > "h") {return  null;}

  rank = (parseInt(rank, 10) + rankDiff).toString(10);
  if (rank < 1 || rank > 8) {return null;}

  return "" + file + rank;
}

//produces an array of possible coords a piece can travel to
//the "direction" should be a vector with horizontal and vertical values of either (-1, 0, 1)
//the function will "follow along" the line of that vector, until it hits a piece or the edge of the board
function directionToRange (startCoord, direction, board) {
  let range = [];
  let selfColor = board[startCoord].color;

  //while coord is still in the board
  let testCoord = vectorToCoord(startCoord, direction[0], direction[1]);
  while (testCoord !== null) { //will auto terminate if exceeeds board
    //if hostile
    if (board[testCoord] && board[testCoord].color !== selfColor) {
      //add testCoord to result
      range.push(testCoord);
      //set testCoord to null to terminate
      testCoord = null;
    
    //if friendly
    } else if (board[testCoord] && board[testCoord].color === selfColor) {
      //terminate without adding coord to range
      testCoord = null;
   
    //if empty square
    } else {
      //add testCoord to result
      range.push(testCoord)
      //increment testCoord
      testCoord = vectorToCoord(testCoord, direction[0], direction[1]);
    }
  }

  return range;
}


//"range" is an array of vectors (ie. [1,-2] for a knight)
//it is being filtered to remove out of board spaces, and spaces with friendly pieces
function filterRange (fromCoord, range, board) {
  return range.map((vector) => {
    //convert the vectors to coordinates on the board
    return vectorToCoord(fromCoord, vector[0], vector[1]);

  }).filter((toCoord) => {
    //remove squares that go off the board
    if (toCoord === null) {return false;}
    //remove squares with friendly pieces
    if (board[toCoord] && board[toCoord].color === board[fromCoord].color) {return false;}

    return true;
  });
}

function concatNestedArrays (arrays, mapCallback) {
  return arrays.reduce((result, arr) => {
    return result.concat(arr);
  }, []);
}

/*
  PIECE SPECIFIC STUFF
*/

function kingMoves (fromCoord, board) {
  //the vectors for all 8 squares surrounding the king 
  //in this order (for white, or upsidedown as black): TL, TM, TR, ML, MR, BL, BM, BR
  return filterRange(fromCoord, [[-1,1], [0,1], [1,1], [-1,0], [1,0], [-1,-1], [0,-1], [1,-1]], board);
}

function queenMoves (fromCoord, board) {
  //the vectors for all 8 directions surrounding the queen
  //in this order (for white, or upsidedown as black): NW, N, NE, W, E, SW, S, SE
  let directions = [[-1,1], [0,1], [1,1], [-1,0], [1,0], [-1,-1], [0,-1], [1,-1]];
  //expand directions out and concat result
  directions = directions.map((direction) => {
    return directionToRange(fromCoord, direction, board);
  });
  return concatNestedArrays(directions);
}

function bishopMoves (fromCoord, board) {
  //the vectors for all 8 directions surrounding the bishop
  //in this order (for white, or upsidedown as black): NW, NE, SW, SE
  let directions = [[-1,1], [1,1], [-1,-1], [1,-1]];
  //expand directions out and concat result
  directions = directions.map((direction) => {
    return directionToRange(fromCoord, direction, board);
  });
  return concatNestedArrays(directions);
}

function knightMoves (fromCoord, board) {
  //the vectorss for all 8 squares at "L" paths from the kinight
  //in this order (for white, or upsidedown as black): TL, TR, LT, LB, RT, RB, BL, BR
  return filterRange(fromCoord, [[-1,2], [1,2], [-2,1], [-2,-1], [2,1], [2,-1], [-1,-2], [1,-2]], board);
}

function rookMoves (fromCoord, board) {
  //the vectors for all 8 directions surrounding the queen
  //in this order (for white, or upsidedown as black): N, W, E, S
  let directions = [[0,1], [-1,0], [1,0], [0,-1]];
  //expand directions out and concat result
  directions = directions.map((direction) => {
    return directionToRange(fromCoord, direction, board);
  });
  return concatNestedArrays(directions);
}

function pawnMoves (fromCoord, board) {
  let moves = [];

  let selfColor = board[fromCoord].color;
  let forward = selfColor === "light" ? 1 : -1;
  let homeRank = selfColor === "light" ? "2" : "7";

  let oneSpace = vectorToCoord(fromCoord, 0, forward);
  let twoSpace = vectorToCoord(fromCoord, 0, 2*forward);
  let leftDiag = vectorToCoord(fromCoord, -1, forward); //actually right diag if black
  let rightDiag = vectorToCoord(fromCoord, 1, forward); //actually left diag if black

  //if 1st space infront is open add it to the range
  if (oneSpace && board[oneSpace] === null) {moves.push(oneSpace);}

  //if on home rank and 2 spaces in front is open, add it to the range
  if (twoSpace && fromCoord[1] === homeRank && board[oneSpace] === null && board[twoSpace] === null) {moves.push(twoSpace);}

  //if the 1st forward diagonals contain hostiles, add them to the range
  if (leftDiag && board[leftDiag] && board[leftDiag].color !== selfColor) {moves.push(leftDiag);}
  if (rightDiag &&  board[rightDiag] && board[rightDiag].color !== selfColor) {moves.push(rightDiag);}
  return moves;
}

/*
  CHECK IF FRIENDY KING IS IN CHECK
*/
//"friendlyKing" is the coord of the friendly king
function findKingPosition(board) {
  for (let rank of ["1", "2", "3", "4", "5", "6", "7", "8"]) {
    for (let file of ["a", "b", "c", "d", "e", "f", "g", "h"]) {
      let piece = board[file+rank]
      if (piece && piece.name === "king" && piece.color === board.currentTurn) {return file + rank;}
    }
  }
}

function boardInCheck (board) {
  debugger;
  let selfColor = board.currentTurn;
  let kingPosition = findKingPosition(board);

  //check immediate diagonals for pawns
  let forward = selfColor === "light" ? 1 : -1;

  let lPawn = board[vectorToCoord(kingPosition, -1, forward)]; //right pawn for black
  let rPawn = board[vectorToCoord(kingPosition, 1, forward)]; //left pawn for black

  if (lPawn && lPawn.color !== selfColor && lPawn.name === "pawn") {return true;}
  if (rPawn && rPawn.color !== selfColor && rPawn.name === "pawn") {return true;}

  //check full diagonal directionsfor bishops and queens
  let diagDirs = [[1,1], [-1,1], [1,-1], [-1,-1]];
  for (let dir of diagDirs) {
    let testCoord = vectorToCoord(kingPosition, dir[0], dir[1]);
    while (testCoord) {
      let piece = board[testCoord];

      //if friendly stop the loop
      if (piece && piece.color === selfColor) {
        testCoord = null;

      //if hostile, stop the loop. return true if correct piece type
      } else if (piece && piece.color !== selfColor) {
        if (piece.name === "bishop" || piece.name === "queen") {
          return true;
        } else {
          testCoord = null;
        }

      //if empty keep iterating
      } else {
        testCoord = vectorToCoord(testCoord, dir[0], dir[1])
      }
    }
  }

  //check lateral directions for rooks and queens
  let latDirs = [[1,0], [0,1], [-1,0], [0,-1]];
  for (let dir of latDirs) {
    let testCoord = vectorToCoord(kingPosition, dir[0], dir[1]);
    while (testCoord) {
      let piece = board[testCoord];

      //if friendly stop the loop
      if (piece && piece.color === selfColor) {
        testCoord = null;

      //if hostile, stop the loop. return true if correct piece type
      } else if (piece && piece.color !== selfColor) {
        if (piece.name === "rook" || piece.name === "queen") {
          return true;
        } else {
          testCoord = null;
        }

      //if empty keep iterating
      } else {
        testCoord = vectorToCoord(testCoord, dir[0], dir[1])
      }
    }
  }

  //check L paths for knights
  let lPaths = [[-1,2], [1,2], [-2,1], [-2,-1], [2,1], [2,-1], [-1,-2], [1,-2]];
  for (let path of lPaths) {
    let piece = vectorToCoord(kingPosition, path[0], path[1]);
    if (piece && piece.name === "knight" && piece.color !== selfColor) {return true;}
  }

  return false;
}

//makes a move on the board, sees if the board is in check, then ondoes the move
function checkTester (fromCoord, toCoord, board) {
  let tempPiece = board[toCoord];
  board[toCoord] = board[fromCoord];
  board[fromCoord] = null;

  let check = boardInCheck(board);
  
  board[fromCoord] = board[toCoord];
  board[toCoord] = tempPiece;

  return check;
}

/*
  MOVE VALIDATION MAIN
*/

//calculate weather a move is legal
export function validMoves (fromCoord, board) {
  let name = board[fromCoord].name;
  let color = board[fromCoord].color;

  //if piece is of the right color
  if (color === board.currentTurn) {

    //get range of vectors depending on peice type
    let options = {
      "king": kingMoves,
      "queen": queenMoves,
      "bishop": bishopMoves,
      "knight": knightMoves,
      "rook": rookMoves,
      "pawn": pawnMoves,
    };
    let coordRange = options[name](fromCoord, board);
    console.log("coordRange before checkTester", coordRange);
    
    //check if friendly king in check
    coordRange = coordRange.filter((toCoord) => {
      //make the move, see if in check, undo the move
      //return weather the booard was in check
      return !checkTester(fromCoord, toCoord, board);
    });
    console.log("coordRange after checkTester", coordRange);

    return new Set(coordRange);
  }

  return new Set(null);
};