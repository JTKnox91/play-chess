import React, { Component } from 'react';
import '../styles/Board.css';
import Piece from './Pieces.js';
import { startingPositions } from './chessHelpers.js'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = startingPositions;
  }

  makeSquares () {
    let squares = [];
    for (let r = 8; r > 0; r--) {
      for (let c = 0; c < 8; c++) {
        let color = (r + c) % 2 === 0 ? "light" : "dark";
        let coord = String.fromCharCode(("a").charCodeAt()+c) + r; //create chess coordinate, ie "a8"
        let piece = this.state[coord];
        squares.push(
          <Square
            key={coord}
            color={color}
            coord={coord}
            piece={piece}
            movePiece={this.movePiece.bind(this)}
          />
        );
      }
    }
    return squares;
  }

  movePiece(fromCoord, toCoord) {
    this.setState({
      [toCoord]: this.state[fromCoord],
      [fromCoord]: null,
    });
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

  allowDrop (e) {
    e.preventDefault();
  }

  placePiece (e) {
    e.preventDefault();
    let fromCoord = e.dataTransfer.getData("text/plain");
    let toCoord = this.props.coord;
    this.props.movePiece(fromCoord, toCoord);
  }

  render () {
    let piece = this.props.piece ? (
      <Piece
        color={this.props.piece.color}
        name={this.props.piece.name}
        coord={this.props.coord}
      />
    ) : null;
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
