import {FC} from 'react';
import PokemonList from '../../PokemonList/PokemonList';
import "./CatalogPage.scss";

const CatalogPage: FC = () => {
  return (
    <div className='catalog-page'>
      <div className="page__container">
        <PokemonList/>
      </div>
    </div>
  );
};

export default CatalogPage;