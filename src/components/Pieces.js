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
    transferImage.src = pieceImages[this.props.color][this.props.pieceName];
    e.dataTransfer.setDragImage(transferImage, pieceSize/2, pieceSize/2);
    this.setState({dragging: true});
  }

  drag (e) {
    //not currently in use, but might be soon
  }

  dragEnd (e) {
    document.body.classList.remove("grabbing");
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
