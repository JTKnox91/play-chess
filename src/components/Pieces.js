import React, { Component } from 'react';
import '../styles/Board.css';

const pieceImages = {
  "light": {
    "king": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    "queen": "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
    "bishop": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    "knight": "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    "rook": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    "pawn": "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
  },
  "dark": {
    "king": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
    "queen": "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
    "bishop": "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    "knight": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    "rook": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    "pawn": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
  }
};

class Piece extends Component {

  render() {
    return (
      <div className="Piece">
        <img
          className="Piece-img"
          src={pieceImages[this.props.color][this.props.pieceName]}
          alt={this.props.pieceName +"-"+ this.props.color || ""}
        />
      </div>
    )
  }
}

/*
class King extends Piece {
  
}

class Queen extends Piece {

}

class Bishop extends Piece {

}

class Knight extends Piece {

}

class Rook extends Piece {

}

class Pawn extends Piece {

}
*/

export default Piece;
