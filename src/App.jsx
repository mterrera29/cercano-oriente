import './App.css'
import './loader.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game'
import MainGame from './components/MainGame';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<MainGame />} path='/' />
        <Route exact element={<Game />} path='/game' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
