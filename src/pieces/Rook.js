import Piece from './Piece.js';
import Empty from './Empty.js';

export default class Rook extends Piece {
  constructor(player) {
    super(player, 'rook');
  }

  isValidMove(src, dst, state) {
    if (state.board[dst[0]][dst[1]].getPlayer() === state.currentPlayer)
      return false;

    if (src[0] === dst[0] || src[1] === dst[1]) {
      const xDir = src[0] < dst[0] ? 1 : src[0] > dst[0] ? -1 : 0;
      const yDir = src[1] < dst[1] ? 1 : src[1] > dst[1] ? -1 : 0;

      let x = src[0] + xDir;
      let y = src[1] + yDir;

      while (x !== dst[0] || y !== dst[1]) {
        if (!(state.board[x][y] instanceof Empty))
          return false;
        x += xDir;
        y += yDir;
      }

      return true;
    }

    return false;
  }
}