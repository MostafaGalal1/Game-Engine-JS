import Piece from './Piece.js';
import Empty from './Empty.js';

export default class Bishop extends Piece {
  constructor(player) {
    super(player, 'bishop');
  }

  isValidMove(src, dst, state) {
    if (state.board[dst[0]][dst[1]].getPlayer() === state.currentPlayer)
      return false;

    if (Math.abs(src[0] - dst[0]) !== Math.abs(src[1] - dst[1]))
      return false;

    const dx = src[0] < dst[0] ? 1 : -1;
    const dy = src[1] < dst[1] ? 1 : -1;

    let x = src[0] + dx;
    let y = src[1] + dy;

    while (x !== dst[0] && y !== dst[1]) {
      if (!(state.board[x][y] instanceof Empty))
        return false;
      x += dx;
      y += dy;
    }

    return true;
  }
}