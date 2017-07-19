import React from 'react';
import ReactDOM from 'react-dom';
import Piece from '../components/Pieces';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Piece
	color="dark"
	pieceName="king"
	coord="f8"
  />, div);
  ReactDOM.render(<Piece
	color="light"
	pieceName="king"
	coord="e1"
  />, div);			
});