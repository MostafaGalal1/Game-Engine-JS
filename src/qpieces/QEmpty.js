import QQueen from "./QQueen";

export default class QEmpty {
  constructor() {
    this.image = '/assets/none.png';
  }

  isValidMove = (move, board) => {
    for (let k = 0; k < 8; k++) {
      if (board[move[0]][k] instanceof QQueen || board[k][move[1]] instanceof QQueen)
        return false;
    }

    for (let k = 0; k < 8; k++) {
      if (this.isOnBoard(move[0]-k, move[1]-k) && board[move[0]-k][move[1]-k] instanceof QQueen)
        return false;
      if (this.isOnBoard(move[0]+k, move[1]+k) && board[move[0]+k][move[1]+k] instanceof QQueen)
        return false;
      if (this.isOnBoard(move[0]-k, move[1]+k) && board[move[0]-k][move[1]+k] instanceof QQueen)
        return false;
      if (this.isOnBoard(move[0]+k, move[1]-k) && board[move[0]+k][move[1]-k] instanceof QQueen)
        return false;
    }

    return true;
  }

  isOnBoard = (i, j) => {
    return i >= 0 && i < 8 && j >= 0 && j < 8;
  }
}