import Piece from './Piece.js';

export default class King extends Piece {
  constructor(player) {
    super(player, 'king');
    this.dx = [-1, 1, -1, 1, 1, 0, -1, 0];
    this.dy = [-1, 1, 1, -1, 0, 1, 0, -1];
  }

  isValidMove(src, dst, state) {
    if (state.board[dst[0]][dst[1]].getPlayer() === state.currentPlayer)
        return false;

    for (let i = 0; i < 8; i++){
        if (src[0] + this.dx[i] === dst[0] && src[1] + this.dy[i] === dst[1])
            return true;
    }
  }
}