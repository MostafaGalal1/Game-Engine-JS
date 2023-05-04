export default class XOPiece {
    constructor() {        
            this.image = `/assets/none.png`;
    }

    getPlayer() {
        return this.player
    }
    setPlayer(player) {
        this.player = player;
        this.image = `/assets/${player}.png`;

    }
}