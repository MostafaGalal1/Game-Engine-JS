import Empty from './Empty.js';
import Piece from './Piece.js';

export default class Queen extends Piece {
  constructor(player) {
    super(player, 'queen');
  }

  isValidMove(src, dst, state) {
    if (state.board[dst[0]][dst[1]].getPlayer() === state.currentPlayer)
        return false;

    if (src[0] === dst[0] || src[1] === dst[1]) {
      const dx = src[0] === dst[0] ? 0 : src[0] < dst[0] ? 1 : -1;
      const dy = src[1] === dst[1] ? 0 : src[1] < dst[1] ? 1 : -1;
      let x = src[0] + dx;
      let y = src[1] + dy;

      while (x !== dst[0] || y !== dst[1]) {
        if (!(state.board[x][y] instanceof Empty)) {
          return false;
        }
        x += dx;
        y += dy;
      }
      return true;
    }

    if (Math.abs(src[0] - dst[0]) === Math.abs(src[1] - dst[1])) {
      const dx = src[0] < dst[0] ? 1 : -1;
      const dy = src[1] < dst[1] ? 1 : -1;
      let x = src[0] + dx;
      let y = src[1] + dy;

      while (x !== dst[0] || y !== dst[1]) {
        if (!(state.board[x][y] instanceof Empty)) {
          return false;
        }
        x += dx;
        y += dy;
      }
      return true;
    }

    return false;
  }
}