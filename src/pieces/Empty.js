import Piece from './Piece.js';

export default class Empty extends Piece {
  constructor(player) {
    super(player, 'none');
  }

  isValidMove(src, dst, state) {
    return false;
  }
}