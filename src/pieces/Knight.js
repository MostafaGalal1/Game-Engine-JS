import Piece from './Piece.js';

export default class Knight extends Piece {
  constructor(player) {
    super(player, 'knight');
    this.dx = [-2, -2 ,-1, -1, 1, 1, 2, 2];
    this.dy = [-1, 1, -2, 2, -2, 2, -1, 1];
  }

  isValidMove(src, dst, state) {
    console.log(state.board[dst[0]][dst[1]].getPlayer(), state.currentPlayer);
    if (state.board[dst[0]][dst[1]].getPlayer() === state.currentPlayer)
        return false;

    for (let i = 0; i < 8; i++){
        if (src[0] + this.dx[i] === dst[0] && src[1] + this.dy[i] === dst[1])
            return true;
    }
  }
}