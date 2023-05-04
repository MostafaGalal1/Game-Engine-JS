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

function getGame(gameName) {
  switch (gameName) {
    case "Chess":
      return {gameObject: new Chess(), initState: {
        currentPlayer: 'w',
        pieceSelected: [-1, -1],
        board: [[new Rook('b'),new Knight('b'),new Bishop('b'),new Queen('b'),new King('b'),new Bishop('b'),new Knight('b'),new Rook('b')],
                [new Pawn('b'),new Pawn('b'),new Pawn('b'),new Pawn('b'),new Pawn('b'),new Pawn('b'),new Pawn('b'),new Pawn('b')],
                [new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty('')],
                [new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty('')],
                [new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty('')],
                [new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty(''),new Empty('')],
                [new Pawn('w'),new Pawn('w'),new Pawn('w'),new Pawn('w'),new Pawn('w'),new Pawn('w'),new Pawn('w'),new Pawn('w')],
                [new Rook('w'),new Knight('w'),new Bishop('w'),new Queen('w'),new King('w'),new Bishop('w'),new Knight('w'),new Rook('w')]]
}};
    case "Queens":
      return{gameObject: new Queens(), initState: { board: [[new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()],
        [new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty(),new QEmpty()]]
}}
    default:
      // code to be executed if expression doesn't match any of the values
  }
}

export function GameStarter(){
  const { id } = useParams();
  const { gameObject, initState } = getGame(id);
  return (gameObject.start(initState));
};
