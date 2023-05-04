export default class Piece {
    constructor(player, image) {
      this.player = player;
      this.image = `/assets/${player+image}.png`;
    }
  
    getPlayer() {
      return this.player
    }
  }