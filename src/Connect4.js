import GameEngine from "./GameEngine";
import Board from "./Board";
import C4Piece from "./Connect4Pieces/C4Piece";
export class Connect4 extends GameEngine {
  init(gameState) {
    return (
        <div className="game">
            <Board rows={6} cols={7} colorSwitch={true} colorOne={"#0000ff"} colorTwo={"#0000ff"} board={gameState.board} />
        </div>
    );

  }



  drawer(gameState) {
    for(let i=0;i<gameState.board.length-1;i++){
      for(let j=0;j<gameState.board[0].length;j++){
        console.log(gameState.board[i][j].image);
        
        document.getElementById(`${gameState.board.length-2-i}-${j}`).src = gameState.board[j][i].image;
      }
    }
  }


  controller(gameState, gameMove) {
    console.log(gameMove);
    if(!/^\+?(0|[1-9]\d*)$/.test(gameMove) || (gameMove>7 || gameMove<1)){
      alert("bad input, please, enter a number from 1 to 7\nnote the colums are numbered from left to right.")
      return false;
    }
    gameMove = parseInt(gameMove)-1;
    if(gameState.board[gameMove][6].count !== 6){
      gameState.board[gameMove][gameState.board[gameMove][6].count] = gameState.currentPlayer === 'w'? new C4Piece(true):new C4Piece(false);
      gameState.board[gameMove][6].count++;
      console.log(gameState.board);
      this.drawer(gameState);
      return true; ///improve later maybe add it to the gameState
    }
    alert("invalid move, col full")
    return false;
  }
}