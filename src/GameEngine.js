export default class GameEngine {

    start(gameState) {
        var gameMove = null;
        setTimeout(() => {
            while (!gameMove){
                gameMove = prompt("Enter your move");
            }
            
            this.controller(gameState, gameMove);
            this.start(gameState);
        }, 200);
        return this.init(gameState);
    }

    drawer(gameState){}

    controller(gameState, gameMove){}
}