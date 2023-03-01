import {FC} from 'react';
import PokemonList from '../../PokemonList/PokemonList';
import PokemonSearch from '../../PokemonSearch/PokemonSearch';
import "./CatalogPage.scss";

const CatalogPage: FC = () => {
  return (
    <div className='catalog-page page'>
      <div className="page__container">
        <PokemonSearch/>
        <PokemonList/>
      </div>
    </div>
  );
};

export default CatalogPage;