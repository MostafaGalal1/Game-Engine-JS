import './App.css';
import {Routes, Route} from "react-router-dom";
import { GameStarter } from './GameStarter';
import { Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <ul>
              <li><Link to={`/game/Chess`}><button>Chess</button></Link></li>
          </ul>
          <ul>
              <li><Link to={`/game/Queens`}><button>8 Queens</button></Link></li>
          </ul>
          <ul>
              <li><Link to={`/game/TicTacToe`}><button>TicTacToe</button></Link></li>
          </ul>
          <ul>
              <li><Link to={`/game/Connect4`}><button>Connect4</button></Link></li>
          </ul>
          <ul>
              <li><Link to={`/game/Checkers`}><button>Checkers</button></Link></li>
          </ul>
          <ul>
              <li><Link to={`/game/Sudoku`}><button>Sudoku</button></Link></li>
          </ul>
        </>
    }>
      
    </Route>
      <Route path='/game/:id' element={<GameStarter/>}></Route>
    </Routes>
  );
}

export default App;
