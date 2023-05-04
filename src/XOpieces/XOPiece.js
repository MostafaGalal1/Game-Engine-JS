export default class XOPiece {
    // constructor() {
    //         this.image = `/assets/none.png`;
    // }
    player="none"
    constructor(player="none") {        
        this.image = `/assets/${player}.png`;
        this.player = player;
    }

    getPlayer() {
        return this.player
    }
    setPlayer(player) {
        this.player = player;
        this.image = `/assets/${player}.png`;

    }
}