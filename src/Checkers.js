import { GameEngine } from "./GameEngine";
import { Board } from "./GameEngine";

export class Checkers extends GameEngine{
    currState = null;
    prevStates = [];
    initializor() {
      this.currState = this.controller(null, null);
    }
  
    drawer(totalState) {
      let gameMove = [];
      let elements = document.querySelectorAll('[name="game-squares"]');
      if(elements.length === 0){
        const ReactDOM = require('react-dom/client');
        const container = document.getElementById('root'); /////change laterrrrrrrrr when finishing up to 'game'
        const root = ReactDOM.createRoot(container);
        const handleSquareChoose = event => {
          gameMove.push([parseInt(event.target.value/8), parseInt(event.target.value%8)]);
          if(gameMove.length === 2){
            totalState = this.controller(totalState, gameMove);
            gameMove = [];
          }
          document.querySelectorAll('[name="moves"]')[0].innerHTML = gameMove.length;
          document.querySelectorAll('[name="turn"]')[0].innerHTML = (totalState.turn)? 'red' : 'black';
        }
        root.render(
          <div className="game">
            <h1 name="moves">{gameMove.length}</h1>
            <h1 name="turn">{totalState.turn}</h1>
            <button width={`${400 / 10}px`} height={`${400 / 10}px`} onClick={() => {this.drawer(totalState);console.log(totalState);}}>rerender</button>
            <div className="game-board">
                <Board row={8} col={8} name={"game-squares"} onSquareClick={handleSquareChoose} />
            </div>
          </div>
        );
      }

      elements = document.querySelectorAll('[name="game-squares"]');
      if(elements.length === 0){
        return;
      }
      function setColor(cell, i, j){
        if(cell === 0){
          if((i*7+j)%2){
            return '#a05d16'
          }
          return '#d7a058';
        }else{
          if(cell.type === 'man')
            return (cell.team == 'black')? '#000000': '#ff0000';
          else if(cell.type === 'king')
            return (cell.team == 'black')? '#717171': '#ff8080';
        }
      }
      console.log(totalState);
      if(totalState !== null){
        for(let i=0;i<totalState.mat.length;i++){
          for(let j=0;j<totalState.mat[0].length;j++){
              elements[(i*8)+j].style.backgroundColor = setColor(totalState.mat[i][j], i, j);
            }; 
          }
      }
     
    }
  
    controller(totalState, gameMove) {
      class Man{
        team = '';
        coord = [];
        type = 'man';
        constructor(team){
          this.team = team;
        }
        move(gameMove){
          console.log(totalState);
          if((this.team === 'red') && ((gameMove[1][0]-gameMove[0][0] !== 1) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 1) || !totalState.turn)){
            console.log('aaaaaaaaaaaaa');
            return -1;
          }
          if((this.team === 'black') && ((gameMove[1][0]-gameMove[0][0] !== -1) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 1) || totalState.turn)){
            console.log('wwww');
            return -1;
          }
          if((this.team === 'black') && gameMove[1][0] == 0){
            totalState.mat[gameMove[1][0]][gameMove[1][1]] = new King('black');  
          }else if((this.team === 'red') && gameMove[1][0] == 7){
            totalState.mat[gameMove[1][0]][gameMove[1][1]] = new King('red');
          }else{
            totalState.mat[gameMove[1][0]][gameMove[1][1]] = this;
          }
          totalState.mat[gameMove[0][0]][gameMove[0][1]] = 0;
          totalState.turn = !totalState.turn;
          return 0;
        }
        kill(gameMove){
          // will need to do a while loop to keep killing if multiple deaths can occur
          console.log(gameMove);
          if((this.team === 'red') && ((gameMove[1][0]-gameMove[0][0] !== 2) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 2) || !totalState.turn)){
            console.log('aaaaaaaaaaaaa');
            return -1;
          }
          if((this.team === 'black') && ((gameMove[1][0]-gameMove[0][0] !== -2) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 2) || totalState.turn)){
            console.log('wwww');
            return -1;
          }
          console.log('asd');
          
          if(totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] instanceof Man
            && ((this.team==='black' && totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team=='red') 
            || (this.team==='red' && totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team=='black'))){
            totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] = 0;
            if((this.team === 'black') && gameMove[1][0] == 0){
              totalState.mat[gameMove[1][0]][gameMove[1][1]] = new King('black');  
            }else if((this.team === 'red') && gameMove[1][0] == 7){
              totalState.mat[gameMove[1][0]][gameMove[1][1]] = new King('red');
            }else{
              totalState.mat[gameMove[1][0]][gameMove[1][1]] = this;
            }
            totalState.mat[gameMove[0][0]][gameMove[0][1]] = 0;
          }
        }
      }
      class King extends Man{
        constructor(team){
          super(team);
          this.type = 'king';
        }
        move(gameMove){
          console.log(totalState);
          if(((Math.abs(gameMove[1][0]-gameMove[0][0]) !== 1) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 1) || (!totalState.turn && (this.team === 'red')) || (totalState.turn && (this.team === 'black')))){
            console.log('aaaaaaaaaaaaa');
            return -1;
          }
          totalState.mat[gameMove[1][0]][gameMove[1][1]] = this;
          totalState.mat[gameMove[0][0]][gameMove[0][1]] = 0;
          totalState.turn = !totalState.turn;
          return 0;
        }
        kill(gameMove){
          // will need to do a while loop to keep killing if multiple deaths can occur
          console.log(gameMove);
          if(((Math.abs(gameMove[1][0]-gameMove[0][0]) !== 2) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 2) || (!totalState.turn && (this.team === 'red')) || (totalState.turn && (this.team === 'black')))){
            console.log('aaaaaaaaaaaaa');
            return -1;
          }

          if(totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] instanceof Man
          && ((this.team==='black' && totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team=='red') 
            || (this.team==='red' && totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team=='black'))){
            totalState.mat[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] = 0;
            totalState.mat[gameMove[1][0]][gameMove[1][1]] = this;
            totalState.mat[gameMove[0][0]][gameMove[0][1]] = 0;
          }
        }
      }


      if(totalState == null){
        totalState = {
          mat: new Array(8).fill(0).map((row, i) => new Array(8).fill(0).map((value, j) => {
            if((i+j)%2 === 1){
              if(i<3){
                return new Man('red', [i][j]);
              }else if(i>4){
                return new Man('black', [i][j]);
              }
            }
            return 0;
          })),
          turn: false
        };
        
        this.drawer(totalState);
        return totalState;
      }
      let gameState = totalState.mat;
      if((gameState[gameMove[0][0]][gameMove[0][1]] !==0) && (gameState[gameMove[1][0]][gameMove[1][1]] === 0)){ 
        if(Math.abs(gameMove[1][0]-gameMove[0][0]) === 1){gameState[gameMove[0][0]][gameMove[0][1]].move(gameMove);}
        if(Math.abs(gameMove[1][0]-gameMove[0][0]) === 2){gameState[gameMove[0][0]][gameMove[0][1]].kill(gameMove);}
      };

      ///eating left
      this.drawer(totalState);
      return totalState;
    }
  
    undo(){
      this.currState = this.prevStates.slice();
      this.drawer(this.currState);
      this.flag = !this.flag;
    }
}