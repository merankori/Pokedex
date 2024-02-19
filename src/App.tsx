import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import CatalogPage from '@/pages/CatalogPage/CatalogPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import HomePage from '@/pages/HomePage/HomePage';
import PokemonPage from '@/pages/PokemonPage/PokemonPage';
import TeamPage from '@/pages/TeamPage/TeamPage';
import { pokemonStore } from '@/store/PokemonStore';

const App: FC = () => {
  useEffect(() => {
    const team = localStorage.getItem('team');
    if (!team) {
      localStorage.setItem('team', JSON.stringify([]));
    } else {
      pokemonStore.setPokemonsTeam(JSON.parse(team));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
