import CheckersMan from "./CheckersMan";

export default class CheckersKing extends CheckersMan{
    constructor(team){
      super(team);
      this.type = 'king';
      this.image = (team === 'red')?'/assets/wk.png':'/assets/bk.png';
    }

    move(gameMove, totalState){
      console.log(totalState);
      if(((Math.abs(gameMove[1][0]-gameMove[0][0]) !== 1) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 1)
          || (totalState.currentPlayer === 'b' && (this.team === 'red')) || (totalState.currentPlayer === 'w' && (this.team === 'black')))){
        return -1;
      }
    //   totalState.board[gameMove[1][0]][gameMove[1][1]] = this;
      totalState.board[gameMove[0][0]][gameMove[0][1]] = 0;
      return 3;
    }

    kill(gameMove, totalState){
      // will need to do a while loop to keep killing if multiple deaths can occur
      if(((Math.abs(gameMove[1][0]-gameMove[0][0]) !== 2) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 2)
          || (totalState.currentPlayer === 'b' && (this.team === 'red')) || (totalState.currentPlayer === 'w' && (this.team === 'black')))){
        return -1;
      }

      if(totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] instanceof CheckersMan
      && ((this.team==='black' && totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team==='red') 
        || (this.team==='red' && totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team==='black'))){
        totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] = 0;
        totalState.board[gameMove[1][0]][gameMove[1][1]] = this;
        totalState.board[gameMove[0][0]][gameMove[0][1]] = 0;
        return 13;
      }
      return -1;
    }
  }