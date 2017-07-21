import React, { Component } from 'react';
import '../styles/Board.css';
import { pieceImages } from './chessHelpers.js'

const pieceSize = 50; //piece rendered as is 50px by 50px in CSS

class Piece extends Component {
  constructor (props) {
    super(props)
    this.state = {
      interaction: "grabbable",
      dragging: false
    };
  }
  makeClass (state) {
    let className = "Piece";
    if (state.interaction) {className += " "+state.interaction}
    if (state.dragging) {className += " dragging"}
    return className;
  }

  mouseDown (e) {
    this.setState({interaction: "grabbing"})
  }

  mouseUp (e) {
    this.setState({interaction: "grabbable"})
  }

  dragStart (e) {
    let transferImage = document.createElement("img");
    transferImage.src = pieceImages[this.props.color][this.props.name];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(transferImage, pieceSize/2, pieceSize/2);
    e.dataTransfer.setData("text/plain", this.props.coord);
    
    this.setState({dragging: true});
  }

  drag (e) {
    //not used currently but maybe in the future
  }

  dragEnd (e) {
    this.setState({
      dragging: false,
      interaction: "grabbable",
    });
  }

  render () {
    return (
      <div 
        className={this.makeClass(this.state)}
        draggable="true"
        onMouseDown={this.mouseDown.bind(this)}
        onMouseUp={this.mouseUp.bind(this)}        
        onDragStart={this.dragStart.bind(this)}
        onDrag={this.drag.bind(this)}
        onDragEnd={this.dragEnd.bind(this)}
      >
        <img
          className="Piece-img"
          draggable="false"
          src={pieceImages[this.props.color][this.props.name]}
          alt={this.props.name +"-"+ this.props.color || ""}
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
