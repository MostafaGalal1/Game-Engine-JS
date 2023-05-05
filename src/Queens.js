import GameEngine from "./GameEngine";
import Board from "./Board";
import QEmpty from "./qpieces/QEmpty";
import QQueen from "./qpieces/QQueen";

export default class Chess extends GameEngine {
    init(gameState) {
        return (
            <div className="game">
                <Board rows={8} cols={8} colorSwitch={true} colorOne={"#ffce9e"} colorTwo={"#d18b47"} board={gameState.board} />
            </div>
        );
    }

    drawer(gameState) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
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
        if (gameState.board[gameMove[0]][gameMove[1]] instanceof QEmpty && gameState.board[gameMove[0]][gameMove[1]].isValidMove(gameMove, gameState.board)) {
            const mat = gameState.board.map(row => [...row]);
            mat[gameMove[0]][gameMove[1]] = new QQueen();
            gameState.board = mat;
        } else if (gameState.board[gameMove[0]][gameMove[1]] instanceof QQueen) {
            const mat = gameState.board.map(row => [...row]);
            mat[gameMove[0]][gameMove[1]] = new QEmpty();
            gameState.board = mat;
        } else {
            alert("wrong move");
        }
        return false;
    }
}