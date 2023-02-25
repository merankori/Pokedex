import { FC } from 'react';
import PokemonPage from './components/pages/PokemonPage/PokemonPage';
const App: FC = () => {

  return (
    <div className='App'>
      <div className="page__container">
        <PokemonPage/>
      </div>
    </div>
  );
};

export default App;