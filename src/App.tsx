import { FC } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
const App: FC = () => {

  return (
    <div className='App'>
      <div className="page__container">
        <PokemonList/>
      </div>
    </div>
  );
};

export default App;