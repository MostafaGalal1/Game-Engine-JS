export default class GameEngine {
    inputWindow = window.open('/input')
    start(gameState) {
        var gameMove = null;
        setTimeout(() => {
            while (!gameMove){
                gameMove = this.inputWindow.prompt("Please, Enter your move.")
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