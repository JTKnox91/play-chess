import React, { Component } from 'react';
import '../styles/Board.css';
import Piece from '../components/Pieces.js';

const startingPositions = {
  "a8": {color: "dark", name: "rook"},
  "b8": {color: "dark", name: "knight"},
  "c8": {color: "dark", name: "bishop"},
  "d8": {color: "dark", name: "king"},
  "e8": {color: "dark", name: "queen"},
  "f8": {color: "dark", name: "bishop"},
  "g8": {color: "dark", name: "knight"},
  "h8": {color: "dark", name: "rook"},
  "a7": {color: "dark", name: "pawn"},
  "b7": {color: "dark", name: "pawn"},
  "c7": {color: "dark", name: "pawn"},
  "d7": {color: "dark", name: "pawn"},
  "e7": {color: "dark", name: "pawn"},
  "f7": {color: "dark", name: "pawn"},
  "g7": {color: "dark", name: "pawn"},
  "h7": {color: "dark", name: "pawn"},
  "a2": {color: "light", name: "pawn"},
  "b2": {color: "light", name: "pawn"},
  "c2": {color: "light", name: "pawn"},
  "d2": {color: "light", name: "pawn"},
  "e2": {color: "light", name: "pawn"},
  "f2": {color: "light", name: "pawn"},
  "g2": {color: "light", name: "pawn"},
  "h2": {color: "light", name: "pawn"},
  "a1": {color: "light", name: "rook"},
  "b1": {color: "light", name: "knight"},
  "c1": {color: "light", name: "bishop"},
  "d1": {color: "light", name: "king"},
  "e1": {color: "light", name: "queen"},
  "f1": {color: "light", name: "bishop"},
  "g1": {color: "light", name: "knight"},
  "h1": {color: "light", name: "rook"},
};

class Board extends Component {
  makeSquares () {
    let squares = [];
    for (let r = 8; r > 0; r--) {
      for (let c = 0; c < 8; c++) {
        let color = (r + c) % 2 === 0 ? "light" : "dark";
        let coord = String.fromCharCode(("a").charCodeAt()+c) + r; //create chess coordinate, ie "a8"
        let piece = startingPositions[coord] || null;
        squares.push(
          <Square
            key={coord}
            color={color}
            coord={coord}
            piece={piece}
          />
        );
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
  constructor (props) {
    super(props);
    this.state = {
      isEmpty: !this.props.piece,
      piece: this.props.piece
    };
  }

  allowDrop (e) {
    e.preventDefault();
  }

  placePiece (e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("application/json");
    let piece = JSON.parse(data);
    this.setState({
      isEmpty: false,
      piece: piece
    });
  }

  removePiece () {
    this.setState({
      isEmpty: true,
      piece: null
    });
  }

  render () {
    let piece = this.state.isEmpty ? null : (
      <Piece
        color={this.state.piece.color}
        name={this.state.piece.name}
        coord={this.props.coord}
        removeSelf={this.removePiece.bind(this)}
      />
    );
    return (
      <div 
        className={"Square Square-"+this.props.color}
        onDragOver={this.allowDrop.bind(this)}
        onDrop={this.placePiece.bind(this)}
      >{piece}</div>
    );
  }
}

export default Board;
