import { click } from "@testing-library/user-event/dist/click";
import { GameEngine, Board } from "./GameEngine";
import { cloneElement, useEffect, useState } from "react";
import { floor, to } from "mathjs";
import { waitFor } from "@testing-library/react";
import { SudokuGenerator } from "./SudokuGenerator";
export class Sudoku extends GameEngine {
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
        gameMove[0] = [parseInt(event.target.value/9), parseInt(event.target.value%9)];
      }
      const handleNumberInput = event => {
        gameMove[1] = parseInt(event.target.value)+1;
        if(gameMove[0] !== undefined){
          totalState = this.controller(totalState, gameMove);
        }
      }
      
        root.render(
          <div className="game">
            <button width={`${400 / 10}px`} height={`${400 / 10}px`} onClick={() => this.undo()}>undo</button>
            <button width={`${400 / 10}px`} height={`${400 / 10}px`} onClick={() => this.drawer(totalState)}>rerender</button>
            <div className="game-board">
                <Board row={9} col={9} name={"game-squares"} onSquareClick={handleSquareChoose} />
            </div>
            <div className="keypad">
                <Board row={3} col={3} name={"keypad"} onSquareClick={handleNumberInput} />
            </div>
          </div>
        );

    }
        
    
    elements = document.querySelectorAll('[name="game-squares"]');
    if(elements.length === 0){
      return;
    }
    if(totalState !== null){
      for(let i=0;i<totalState.mat.length;i++){
        for(let j=0;j<totalState.mat[0].length;j++){
          elements[i*9+j].innerHTML = (totalState.mat[i][j] !== 0)? totalState.mat[i][j]: '';
          if(totalState.emmu[i][j]){
            elements[i*9+j].style.color = 'blue'
          }
        }
      }
    }

    
  }

  controller(totalState, gameMove) {
    if(totalState === null){ /// not supposed to happen since we will feed it the starting state later but just in case
        let sudoku = new SudokuGenerator(9, 40)
        sudoku.fillValues();
        totalState = {
          mat: sudoku.mat,
          emmu: new Array(9).fill(false).map((row)=> new Array(9).fill(false))
        };
        sudoku.mat.forEach((row, i) => row.forEach((value, j) => {totalState.emmu[i][j] = (value===0)? false: true}))
        this.drawer(totalState);
        return totalState;
    }
    if(totalState.emmu[gameMove[0][0]][gameMove[0][1]]){
      alert("can't change a preset value");
      return totalState;
    }
    let gameState = totalState.mat;
    console.log(gameState);
    let valid = true;
    gameState[gameMove[0][0]][gameMove[0][1]] = gameMove[1];
    let vertOff = parseInt(gameMove[0][0]/3)*3;
    let horiOff = parseInt(gameMove[0][1]/3)*3;
    
    for(let i=0;i<gameState.length;i++){
        if((i !== gameMove[0][1]) && (gameState[gameMove[0][0]][i] === gameMove[1])){
            console.log(gameState[gameMove[0][0]][i]);
            valid = false;
            break;
        }
        if((i !== gameMove[0][0]) && (gameState[i][gameMove[0][1]] === gameMove[1])){
            valid = false;
            break;
        }
        

        //still needs to check the smaller square will do later
        if((parseInt(i/3)+vertOff !== gameMove[0][0]) && (parseInt(i%3)+horiOff !== gameMove[0][1]) && (gameState[parseInt(i/3)+vertOff][parseInt(i%3)+horiOff] === gameMove[1])){
            valid = false;
            break;
          }
    }

    //improve later and add it to game state to let the drawer know
    if(!valid){ // you have the choice to either not permit the move or do it (maybe add indicater to let him know of his mistake)
      alert("not valid move");
    }
    this.drawer(totalState);
    return totalState;
  }

  undo(){
    this.currState = this.prevStates.slice();
    this.drawer(this.currState);
    this.flag = !this.flag;
  }
}