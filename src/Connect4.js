import { click } from "@testing-library/user-event/dist/click";
import { GameEngine, Board } from "./GameEngine";
import { cloneElement } from "react";
import { render } from "react-dom";
export class Connect4 extends GameEngine {
  currState = null;
  currPlayer = 0;
  prevStates = [];
  numberOfPlayers = 2;
  numberOfInputs = 1;

  initializor() {
    const _ = require('lodash');
    let inputs = [];
    this.drawer(this.currState);
    document.addEventListener('click', (event)=>{
      if(event.target.className === "square"){
        inputs.push(event.target.value);
        if(inputs.length === this.numberOfInputs){
          this.currState = this.controller(this.currState, inputs);
          this.drawer(this.currState);
          inputs = [];
        }
      }
    })
  }

  drawer(gameState) {
    if(gameState === null){
        render(
          <div className="game">
            <button width={`${400 / 10}px`} height={`${400 / 10}px`} onClick={() => this.undo()}>undo</button>
            <div className="game-board">
              <Board row={6} col={7} onSquareClick={null} />
            </div>
          </div>
        );
    }
    const colors = ['#0000ff', '#FF0000', '#ffff00']
    if(gameState !== null){
      for(let i=0;i<gameState.length-1;i++){
        for(let j=0;j<gameState[0].length;j++){
          document.getElementById((5-i)*7+j).style.backgroundColor = colors[gameState[j][i]];
        }
      }
    }
    
  }

  controller(gameState, gameMove) {
    gameMove = gameMove.map((item) => parseInt(item)%7)
    if(gameState === null){
      gameState = new Array(7).fill(0).map(() => new Array(7).fill(0));
    }
    if(gameState[gameMove[0]][6] !== 6){
      gameState[gameMove[0]][gameState[gameMove[0]][6]] = this.currPlayer+1;
      gameState[gameMove[0]][6]++;
      this.currPlayer = (this.currPlayer+1)%this.numberOfPlayers; ///improve later maybe add it to the gameState
    }
    return gameState;
  }

  undo(){
    this.currState = this.prevStates.slice();
    this.drawer(this.currState);
    this.flag = !this.flag;
  }
}