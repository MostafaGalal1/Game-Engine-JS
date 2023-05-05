import GameEngine from "./GameEngine";
import Board from "./Board";
import XOPiece from "./XOpieces/XOPiece";

export default class TicTacToe extends GameEngine {
    init(gameState) {
        return (
            <div className="game">
                <Board rows={3} cols={3} colorSwitch={true} colorOne={"#ffce9e"} colorTwo={"#d18b47"} board={gameState.board} />
            </div>
        );
    }

    drawer(gameState) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                var im = document.getElementById(`${i}-${j}`);
                im.src = gameState.board[i][j].image;
            }
        }
    }

    getPosition(position) {
        const column = position.charCodeAt(0) - 97;
        const row = 3 - parseInt(position.charCodeAt(1) - 48);
        return [row, column];
    }

    controller(gameState, gameMove) {
        gameMove = this.getPosition(gameMove);
        if (gameState.board[gameMove[0]][gameMove[1]].getPlayer()==="none") {
            const mat = gameState.board.map(row => [...row]);
            mat[gameMove[0]][gameMove[1]] = new XOPiece(gameState.currentPlayer);
            gameState.board = mat;
            this.drawer(gameState);
            return true;
        }
        alert("wrong move");
        return false;
    }
}