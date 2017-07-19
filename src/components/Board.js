import React, { Component } from 'react';
import '../styles/Board.css';
import Piece from '../components/Pieces.js';

const startingPositions = {
  "a8": {color: "dark", pieceName: "rook"},
  "b8": {color: "dark", pieceName: "knight"},
  "c8": {color: "dark", pieceName: "bishop"},
  "d8": {color: "dark", pieceName: "king"},
  "e8": {color: "dark", pieceName: "queen"},
  "f8": {color: "dark", pieceName: "bishop"},
  "g8": {color: "dark", pieceName: "knight"},
  "h8": {color: "dark", pieceName: "rook"},
  "a7": {color: "dark", pieceName: "pawn"},
  "b7": {color: "dark", pieceName: "pawn"},
  "c7": {color: "dark", pieceName: "pawn"},
  "d7": {color: "dark", pieceName: "pawn"},
  "e7": {color: "dark", pieceName: "pawn"},
  "f7": {color: "dark", pieceName: "pawn"},
  "g7": {color: "dark", pieceName: "pawn"},
  "h7": {color: "dark", pieceName: "pawn"},
  "a2": {color: "light", pieceName: "pawn"},
  "b2": {color: "light", pieceName: "pawn"},
  "c2": {color: "light", pieceName: "pawn"},
  "d2": {color: "light", pieceName: "pawn"},
  "e2": {color: "light", pieceName: "pawn"},
  "f2": {color: "light", pieceName: "pawn"},
  "g2": {color: "light", pieceName: "pawn"},
  "h2": {color: "light", pieceName: "pawn"},
  "a1": {color: "light", pieceName: "rook"},
  "b1": {color: "light", pieceName: "knight"},
  "c1": {color: "light", pieceName: "bishop"},
  "d1": {color: "light", pieceName: "king"},
  "e1": {color: "light", pieceName: "queen"},
  "f1": {color: "light", pieceName: "bishop"},
  "g1": {color: "light", pieceName: "knight"},
  "h1": {color: "light", pieceName: "rook"},
};

class Board extends Component {
  makeSquares () {
    let squares = [];
    for (let r = 8; r > 0; r--) {
      for (let c = 0; c < 8; c++) {
        let color = (r + c) % 2 === 0 ? "light" : "dark";
        let coord = String.fromCharCode(("a").charCodeAt()+c) + r; //create chess coordinate, ie "a8"
        squares.push(<Square key={coord} color={color} coord={coord} />);
      }
    }
    return squares;
  }

  render() {
    return (
      <div className="Board">
        {this.makeSquares()}
      </div>
    );
  }
}

class Square extends Component {
  render () {
    let piece = null;
    if (startingPositions[this.props.coord] !== undefined) {
      piece = <Piece
                color={startingPositions[this.props.coord].color}
                pieceName={startingPositions[this.props.coord].pieceName}
                coord={this.props.coord}
              />
    }
    return (
      <div className={"Square Square-"+this.props.color} >{piece}</div>
    );
  }
}

export default Board;
