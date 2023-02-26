import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { IPokedata, IPokemon } from '../../types/pokemon';
import { pokemonStore } from '../../store/PokemonStore';
import { observer } from 'mobx-react-lite';
import { FETCH_POKEMONS } from '../../utils/consts';

import './PokemonList.scss';

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
      const pokemons = await fetchPokemons(data.results);
      pokemonStore.addPokemons(pokemons);
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  const fetchPokemons = async (pokedata: IPokedata[]) => {
    const pokemons: IPokemon[] = [];
    for (let i = 0; i < pokedata.length; i++) {
      const {data: pokemon} = await axios.get<IPokemon>(pokedata[i].url);
      pokemons.push(pokemon);
    }
    return pokemons;
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