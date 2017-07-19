import React, { Component } from 'react';
import '../styles/Board.css';

class Board extends Component {
  makeSquares () {
    let squares = [];
    for (let r = 8; r > 0; r--) {
      for (let c = 0; c < 8; c++) {
        let color = (r + c) % 2 === 0 ? "light" : "dark";
        let key = String.fromCharCode(("a").charCodeAt()+c) + r; //create chess coordinate, ie "a8"
        squares.push(<Square key={key} color={color}/>);
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
    return (
      <div className={"Square Square-"+this.props.color}></div>
    );
  }
}

export default Board;
