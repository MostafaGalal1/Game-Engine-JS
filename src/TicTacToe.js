import GameEngine from "./GameEngine";
import Board from "./Board";
import React from 'react';
import XOPiece from "./XOpieces/XOPiece";


export default class TicTacToe {

    state = {
        currentPlayer: 'x',
        board: [
            [new XOPiece(), new XOPiece(), new XOPiece()],
            [new XOPiece(), new XOPiece(), new XOPiece()],
            [new XOPiece(), new XOPiece(), new XOPiece()]  
        ]
    };
    
    drawer() {
        return (
            <div className="game">
                <Board rows={3} cols={3} colorSwitch={true} colorOne={"#eee"} colorTwo={"#ddd"} board={this.state.board} action={this.controller.bind(this)} />
            </div>
        );
    }

    controller(move) {
        if (!this.state.board[move[0]][move[1]].getPlayer()) {
            this.state.board[move[0]][move[1]].setPlayer(this.state.currentPlayer);
            this.setState({ currentPlayer: this.state.currentPlayer === 'x' ? 'o' : 'x' });
        }    
    }

    render() {
        return (this.drawer());
    }
}