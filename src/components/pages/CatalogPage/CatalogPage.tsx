import {FC} from 'react';
import PokemonList from '../../PokemonList/PokemonList';

const CatalogPage: FC = () => {
  return (
    <div className='catalog-page page'>
      <div className="page__container">
        <PokemonList/>
      </div>
    </div>
  );
};

export default CatalogPage;