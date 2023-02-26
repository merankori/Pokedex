import { FC } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header/Header';
import CatalogPage from './components/pages/CatalogPage/CatalogPage';
import PokemonPage from './components/pages/PokemonPage/PokemonPage';
const App: FC = () => {

  return (
    
    <div className='App'>
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<CatalogPage/>}/>
            <Route path='/pokemon/:id' element={<PokemonPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;