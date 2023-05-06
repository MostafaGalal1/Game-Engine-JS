

export default class CheckersMan{
    type = 'man';
    constructor(team){
      this.team = team;
      this.image = (team === 'red')?'/assets/wn.png':'/assets/bn.png';
    }
    move(gameMove, totalState){
      console.log(totalState);
      if(((this.team === 'red') && ((gameMove[1][0]-gameMove[0][0] !== 1) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 1) || totalState.currentPlayer === 'b'))
			|| ((this.team === 'black') && ((gameMove[1][0]-gameMove[0][0] !== -1) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 1) || totalState.currentPlayer === 'w'))){
        return -1;
      }
			let state = -1;
      if((this.team === 'black') && gameMove[1][0] === 0){
				state = 1;
        // totalState.board[gameMove[1][0]][gameMove[1][1]] = new King('black');  
      }else if((this.team === 'red') && gameMove[1][0] === 7){
				state = 2;
        // totalState.board[gameMove[1][0]][gameMove[1][1]] = new King('red');
      }else{
				state = 3;
        totalState.board[gameMove[1][0]][gameMove[1][1]] = this;
      }
      totalState.board[gameMove[0][0]][gameMove[0][1]] = 0;
      return state;
    }

    kill(gameMove, totalState){
      // will need to do a while loop to keep killing if multiple deaths can occur
      console.log(gameMove);
      if(((this.team === 'red') && ((gameMove[1][0]-gameMove[0][0] !== 2) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 2) || totalState.currentPlayer === 'b'))
      || ((this.team === 'black') && ((gameMove[1][0]-gameMove[0][0] !== -2) || (Math.abs(gameMove[1][1]-gameMove[0][1]) !== 2) || totalState.currentPlayer === 'w'))){
        return -1;
      }
      if(totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] instanceof CheckersMan
        && ((this.team==='black' && totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team==='red') 
        || (this.team==='red' && totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)].team==='black'))){
        let state = -1;
        totalState.board[parseInt((gameMove[0][0]+gameMove[1][0])/2)][parseInt((gameMove[0][1]+gameMove[1][1])/2)] = 0;
        if((this.team === 'black') && gameMove[1][0] === 0){
            state = 11;
          // totalState.board[gameMove[1][0]][gameMove[1][1]] = new King('black');  
        }
        else if((this.team === 'red') && gameMove[1][0] === 7){
            state = 12;
        //   totalState.board[gameMove[1][0]][gameMove[1][1]] = new King('red');
        }
        else{
            state = 13;
            totalState.board[gameMove[1][0]][gameMove[1][1]] = this;
        }
        totalState.board[gameMove[0][0]][gameMove[0][1]] = 0;
        return state;
      }
      return -1;
    }
  }