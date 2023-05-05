export default class GameEngine {

    start(gameState) {
        var gameMove = null;
        setTimeout(() => {
            while (!gameMove){
                gameMove = prompt("Enter your move");
            }
            
            if (this.controller(gameState, gameMove))
                gameState.currentPlayer = gameState.currentPlayer === 'w'? 'b':'w';
            
            this.drawer(gameState);
            this.start(gameState);
        }, 200);
        return this.init(gameState);
    }

    drawer(gameState){}

    controller(gameState, gameMove){}
}