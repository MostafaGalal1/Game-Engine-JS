import React from 'react';
import GameEngine from "./GameEngine";
import Board from "./Board";
import Empty from './pieces/Empty';

export default class Chess extends GameEngine{
    init(gameState){
        return (
            <Board rows={8} cols={8} colorSwitch={true} colorOne={"#ffce9e"} colorTwo={"#d18b47"} board={gameState.board}/>
        );
    }

    drawer(gameState){
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                var im = document.getElementById(`${i}-${j}`);
                im.src = gameState.board[i][j].image;
            }
        }
    }

    getPosition(position) {
        const column = position.charCodeAt(0) - 97;
        const row = 8 - parseInt(position.charCodeAt(1) - 48);
        return [row, column];
    }

    controller(gameState, gameMove) { 
        gameMove = this.getPosition(gameMove);
        if (gameState.pieceSelected[0] === -1 && gameState.pieceSelected[1] === -1){
            if (gameState.board[gameMove[0]][gameMove[1]].getPlayer() !== gameState.currentPlayer) {
                alert("wrong turn");
                return false;
            }
            gameState.pieceSelected = gameMove;
            return false;
        } else {
            let src = gameState.pieceSelected;
            if (gameState.board[src[0]][src[1]].isValidMove(src, gameMove, gameState)){
                console.log(gameMove);
                const mat = gameState.board.map(row => [...row]);
                mat[gameMove[0]][gameMove[1]] = mat[src[0]][src[1]];
                mat[src[0]][src[1]] = new Empty('');
                gameState.board = mat;
                this.drawer(gameState);
                gameState.pieceSelected = [-1, -1];
                return true;
            }
            alert("wrong move");
            gameState.pieceSelected = [-1, -1];
            return false;
        }
    }
}