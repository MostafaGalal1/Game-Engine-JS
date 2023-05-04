import Piece from './Piece.js';
import Empty from './Empty.js';

export default class Pawn extends Piece {
  constructor(player) {
    super(player, 'pawn');
    this.firstMove = true;
    this.direction = this.player === 'w' ? -1 : 1;
    this.startingRow = this.player === 'w' ? 6 : 1;
  }

  isValidMove(src, dst, state) {
    if (state.board[dst[0]][dst[1]].getPlayer() === state.currentPlayer)
      return false;

    if (src[1] === dst[1]) {
      if (!(state.board[dst[0]][dst[1]] instanceof Empty))
        return false;

      if (dst[0] - src[0] === this.direction) {
        return true;
      } else if (dst[0] - src[0] === 2 * this.direction && src[0] === this.startingRow) {
        const middleSquare = [src[0] + this.direction, src[1]];
        if (state.board[middleSquare[0]][middleSquare[1]] instanceof Empty) {
          return true;
        }
      }
    } else if (Math.abs(src[1] - dst[1]) === 1) {
      if (!(state.board[dst[0]][dst[1]] instanceof Empty) && dst[0] - src[0] === this.direction) {
        return true;
      }
    }

    return false;
  }
}