import {FC} from 'react';
import PokemonList from '../../PokemonList/PokemonList';

const PokemonPage: FC = () => {
  return (
    <div className='pokemon-page page'>
      <PokemonList/>
    </div>
  );
};

export default PokemonPage;