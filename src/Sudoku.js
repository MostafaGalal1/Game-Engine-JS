import Board from "./Board";
import GameEngine from "./GameEngine";

export class Sudoku extends GameEngine {
  
  init(gameState) {
    return (
        <div className="game">
            <Board rows={9} cols={9} colorSwitch={true} colorOne={"#aaaaaa"} colorTwo={"#aaaaaa"} board={gameState.board} />
        </div>
    );
  }

  drawer(totalState) {
    console.log(totalState);
    for(let i=0;i<totalState.board.length;i++){
      for(let j=0;j<totalState.board[0].length;j++){
        let elem = document.getElementById(`${i}-${j}`);
        elem.src = "/assets/" + totalState.board[i][j].val + ".svg";
        if(totalState.board[i][j].changable){
          elem.style.filter = "invert(12%) sepia(84%) saturate(4859%) hue-rotate(230deg) brightness(78%) contrast(93%)"
        }
        console.log(elem, );
      }
    }    
  }
  
  getPosition(position) {
    const column = position.charCodeAt(0) - 97;
    const row = 9 - parseInt(position.charCodeAt(1) - 48);
    console.log(column);
    if(column>8 || column<0 || row>8 || row<0 || isNaN(column) || isNaN(row))
      return false;
    return [row, column];
  }


  controller(totalState, gameMove) {
    console.log(gameMove);

    gameMove = gameMove.split(" ")
    let parsedMove = [this.getPosition(gameMove[0])];
    console.log(parsedMove);
    if(!/^\+?(0|[1-9]\d*)$/.test(gameMove[1]) || parsedMove[0]===false || (gameMove[1]>9 || gameMove[1]<1)){
      alert("bad input, please, enter a number from 1 to 9\nnote the colums are numbered from left to right.")
      return false;
    }
    parsedMove.push(parseInt(gameMove[1]));
    console.log(totalState.board[parsedMove[0][0]][parsedMove[0][1]]);
    if(!totalState.board[parsedMove[0][0]][parsedMove[0][1]].changable){
      alert("can't change a preset value");
      return false;
    }
    let gameState = totalState.board;
    console.log(gameState);

    let valid = true;
    gameState[parsedMove[0][0]][parsedMove[0][1]].val = parsedMove[1];
    let vertOff = parseInt(parsedMove[0][0]/3)*3;
    let horiOff = parseInt(parsedMove[0][1]/3)*3;
    
    for(let i=0;i<gameState.length;i++){
        if((i !== parsedMove[0][1]) && (gameState[parsedMove[0][0]][i].val === parsedMove[1])){
            console.log(gameState[parsedMove[0][0]][i]);
            valid = false;
            break;
        }
        
        if((i !== parsedMove[0][0]) && (gameState[i][parsedMove[0][1]].val === parsedMove[1])){
            valid = false;
            break;
        }
        
        //still needs to check the smaller square will do later
        if((parseInt(i/3)+vertOff !== parsedMove[0][0]) && (parseInt(i%3)+horiOff !== parsedMove[0][1]) && (gameState[parseInt(i/3)+vertOff][parseInt(i%3)+horiOff].val === parsedMove[1])){
            valid = false;
            break;
        }
    }

    //improve later and add it to game state to let the drawer know
    if(!valid){ // you have the choice to either not permit the move or do it (maybe add indicater to let him know of his mistake)
      alert("not valid move");
    }
    return false;
  }

}