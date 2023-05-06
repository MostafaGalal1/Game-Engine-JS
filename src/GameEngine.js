export default class GameEngine {
    
    async start(gameState) {
        var gameMove = null;
        const ReactDOM = require('react-dom/client');
        const container = document.getElementById('root'); /////change laterrrrrrrrr when finishing up to 'game'
        const root = ReactDOM.createRoot(container);
        const inputWindow = window.open('/input');
        root.render(
            this.init(gameState)
          );
        setTimeout(() => {
          this.drawer(gameState);
        }, 1000)
        while(true){
          if(gameMove === null){
            try{
              gameMove = await this.getInput("Please, Enter your move.", inputWindow);
            }catch(_){
              console.log('stay safe');
            }
            // console.log(gameMove);
          }
          
          if (this.controller(gameState, gameMove))
              gameState.currentPlayer = gameState.currentPlayer === 'w'? 'b':'w';

          this.drawer(gameState);

          gameMove = null;
        }
    }

    async getInput(message, window) {
      return new Promise((resolve) => {
        const intervalId = setInterval(() => {
          const userInput = window.prompt(message);
          if (userInput !== null) {
            clearInterval(intervalId);
            resolve(userInput);
          }
        }, 100);
      });
    }
    

    drawer(gameState){}

    controller(gameState, gameMove){}
}