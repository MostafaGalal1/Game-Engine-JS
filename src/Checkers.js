import Board from "./Board";
import CheckersKing from "./CheckersPieces/CheckersKing";
import GameEngine from "./GameEngine";

export class Checkers extends GameEngine{

    init(gameState) {
      return (
          <div className="game">
              <Board rows={9} cols={9} colorSwitch={true} colorOne={"#592500"} colorTwo={"#e5b587"} board={gameState.board} />
          </div>
      );
    }
  
    numberCell(elem, num){
      if(elem === null)
        return;
      elem = elem.parentElement;
      elem.style.backgroundColor = '#592500';
      elem.style.fontSize = '50px';
      elem.style.color = 'white'
      elem.innerText = num;
    }

    drawer(gameState) {
      for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
          if(gameState.board[i][j]===0){
            document.getElementById(`${i}-${j}`).style.display = 'none';
          }else{
            let ele = document.getElementById(`${i}-${j}`);
            ele.style.display = 'block';
            ele.src = (gameState.board[i][j]===0)? '' : gameState.board[i][j].image;
          }
        };
        this.numberCell(document.getElementById(`${8}-${i}`), String.fromCharCode('A'.charCodeAt(0) + i));
        this.numberCell(document.getElementById(`${i}-${8}`), 8-i);
      }
    }

    getPosition(position) {
      const column = position.charCodeAt(0) - 97;
      const row = 8 - parseInt(position.charCodeAt(1) - 48);
      if(column>8 || column<0 || row>8 || row<0 || isNaN(column) || isNaN(row))
        return false;
      return [row, column];
    }
  
    controller(totalState, gameMove) {
      console.log(totalState.board.toString());
      let parsedMove = gameMove.split(" ").map((pos) => this.getPosition(pos));
      let gameState = totalState.board;
      if(parsedMove[0] === false || parsedMove[1] === false || parsedMove.length !== 2){
        return false;
      }
      let res = 0;
      if((gameState[parsedMove[0][0]][parsedMove[0][1]] !==0) && (gameState[parsedMove[1][0]][parsedMove[1][1]] === 0)){ 
        if(Math.abs(parsedMove[1][0]-parsedMove[0][0]) === 1){res = gameState[parsedMove[0][0]][parsedMove[0][1]].move(parsedMove, totalState);}
        if(Math.abs(parsedMove[1][0]-parsedMove[0][0]) === 2){res = gameState[parsedMove[0][0]][parsedMove[0][1]].kill(parsedMove, totalState);}
        switch(res % 10){
          case 1:
            totalState.board[parsedMove[1][0]][parsedMove[1][1]] = new CheckersKing('black');
            return res <= 10;
          case 2:
            totalState.board[parsedMove[1][0]][parsedMove[1][1]] = new CheckersKing('red');
            return res <= 10;
          case 3:
            return res <= 10;
          default:
            return false;
        }
      }else{
        alert("invalid move");
        return false;
      };
    }
}