import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { IPokedata, IPokemon } from '../../types/pokemon';
import { pokemonStore } from '../../store/PokemonStore';
import { observer } from 'mobx-react-lite';
import { FETCH_POKEMONS } from '../../utils/consts';

const PokemonList: FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(FETCH_POKEMONS);

  useEffect(() => {
    fetchPokedata();
  }, []);

  const fetchPokedata = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(currentUrl);
      fetchPokemon(data.results);
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  const fetchPokemon = (data: IPokedata[]) => {
    data.map(async item => {
      const {data} = await axios.get<IPokemon>(item.url);
      pokemonStore.addPokemonData(data);
    })
  }

  if (loading) {
    return <p>Загрузка...</p>
  }

  return (
    <div className='pokemon-list'>
        {pokemonStore.pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
    </div>
  );
});

export default PokemonList;