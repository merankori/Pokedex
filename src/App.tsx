import { FC, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { CatalogPage } from '@/pages/CatalogPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { HomePage } from '@/pages/HomePage';
import { PokemonPage } from '@/pages/PokemonPage';
import { TeamPage } from '@/pages/TeamPage';
import { pokemonStore } from '@/store/PokemonStore';

export const App = () => {
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
          <Route
            path="/"
            element={
              <Suspense fallback="Loading...">
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/catalog"
            element={
              <Suspense fallback="Loading...">
                <CatalogPage />
              </Suspense>
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <Suspense fallback="Loading...">
                <PokemonPage />
              </Suspense>
            }
          />
          <Route
            path="/team"
            element={
              <Suspense fallback="Loading...">
                <TeamPage />
              </Suspense>
            }
          />
          <Route
            path="/404"
            element={
              <Suspense fallback="Loading...">
                <ErrorPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
