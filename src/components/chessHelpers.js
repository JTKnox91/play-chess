export default void 0;

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
    kingHasMovedLight: false,
    kingHasMovedDark: false,
};
// Object.defineProperty(startingPositions, "currentTurn", {enumerable: false, value: "light"});
// Object.defineProperty(startingPositions, "kingHasMovedLight", {enumerable: false, value: false});
// Object.defineProperty(startingPositions, "kingHasMovedDark", {enumerable: false, value: false});

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

export function validMoves (fromCoord, board) {
  //test content returns all 
  if (board[fromCoord].color === board.currentTurn) {
    return new Set(Object.keys(board));
  } else {
    return new Set(null);
  }
};