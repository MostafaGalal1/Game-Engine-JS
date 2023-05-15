import { useParams } from "react-router-dom";
import Chess from "./Chess";
import Queens from "./Queens"

import Pawn from "./pieces/Pawn";
import Knight from "./pieces/Knight";
import Empty from "./pieces/Empty";
import King from "./pieces/King";
import Bishop from "./pieces/Bishop";
import Rook from "./pieces/Rook";
import Queen from "./pieces/Queen";
import QEmpty from "./qpieces/QEmpty";
import TicTacToe from "./TicTacToe";
import XOPiece from "./XOpieces/XOPiece";
import EmptyC4 from "./Connect4Pieces/EmptyC4";
import { Checkers } from "./Checkers";
import CheckersMAn from "./CheckersPieces/CheckersMan";
import SudokuCell from "./SudokuCell/SudokuCell";
import { Sudoku } from "./Sudoku";
import SudokuGenerator from "./SudokuGenerator";
import { Connect4 } from "./Connect4";

function getGame(gameName) {
  switch (gameName) {
    case "Chess":
      return {
        gameObject: new Chess(), initState: {
          currentPlayer: 'w',
          pieceSelected: [-1, -1],
          board: [[new Rook('b'), new Knight('b'), new Bishop('b'), new Queen('b'), new King('b'), new Bishop('b'), new Knight('b'), new Rook('b')],
          [new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b')],
          [new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty('')],
          [new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty('')],
          [new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty('')],
          [new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty(''), new Empty('')],
          [new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w')],
          [new Rook('w'), new Knight('w'), new Bishop('w'), new Queen('w'), new King('w'), new Bishop('w'), new Knight('w'), new Rook('w')]]
        }
      };
    case "Queens":
      return {
        gameObject: new Queens(), initState: {
          board: [[new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()],
          [new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty(), new QEmpty()]]
        }
      }
    case "TicTacToe":
      return {
        gameObject: new TicTacToe(), initState: {
          currentPlayer: 'w',
          board: [
            [new XOPiece(), new XOPiece(), new XOPiece()],
            [new XOPiece(), new XOPiece(), new XOPiece()],
            [new XOPiece(), new XOPiece(), new XOPiece()]
          ]
        }
      }
    case "Checkers":
      let temp = new Array(8).fill(0).map((_, i) => new Array(8).fill(0).map((_, j) => {
        if((i+j)%2 === 1){
          if(i<3){
            return new CheckersMAn('red');
          }else if(i>4){
            return new CheckersMAn('black');
          }
        }
        return 0;
      }))
      temp.push(new Array(8).fill(0));
      temp.forEach((row) => row.push(0));
      return{
        gameObject: new Checkers(), initState: {
          currentPlayer: 'w',
          board: temp
        }
      }
    case "Sudoku":
      return{
        gameObject: new Sudoku(), initState: {
          currentPlayer: 'w',
          board: new SudokuGenerator(9, 40).fillValues().map((row) => row.map((val) => new SudokuCell(val, (val===0))))
        }
      }
    case "Connect4":
      return {
        gameObject: new Connect4(), initState: {
          currentPlayer: 'w',
          board: new Array(7).fill(0).map(() => new Array(7).fill(new EmptyC4()))
        }
      }
    default:
    // code to be executed if expression doesn't match any of the values
  }
}

export function GameStarter() {
  const { id } = useParams();
  const { gameObject, initState } = getGame(id);
  gameObject.start(initState);
  // return (await gameObject.start(initState));
};
