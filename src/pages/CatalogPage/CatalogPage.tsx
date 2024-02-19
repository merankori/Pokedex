import { FC } from 'react';
import PokemonList from '@/components/PokemonList/PokemonList';
import PokemonSearch from '@/components/PokemonSearch/PokemonSearch';
import './CatalogPage.scss';

const CatalogPage: FC = () => {
  return (
    <div className="catalog-page page">
      <div className="page__container">
        <PokemonSearch />
        <h1 className="catalog-page__title">Catalog</h1>
        <PokemonList />
      </div>
    </div>
  );
};

export default CatalogPage;
