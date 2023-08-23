import './App.css'
import './loader.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game'
import MainGame from './components/MainGame';
import PointsGame from './components/PointsGame';
import PointsGameAdmin from './components/PointsGameAdmin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<MainGame />} path='/' />
        <Route exact element={<Game />} path='/game' />
        <Route exact element={<PointsGame />} path='/points' />
        <Route exact element={<PointsGameAdmin />} path='/admin' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
