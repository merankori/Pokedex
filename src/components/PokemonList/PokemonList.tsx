import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { IPokedata, IPokemon } from '../../types/pokemon';
import { pokemonStore } from '../../store/PokemonStore';
import { observer } from 'mobx-react-lite';

import './PokemonList.scss';
import { FETCH_POKEMONS } from '../../utils/consts';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

interface FetchPokemonsResult {
  count: number
  next: string | null
  previous: string | null
  results: IPokedata[]
}

const PokemonList: FC = observer(() => {
  const limit = 9;
  const [page, setPage] = useState<number>(1);
  const offset = limit * page - limit;
  const [pokemonsCount, setPokemonsCount] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>(`${FETCH_POKEMONS}?limit=${limit}&offset=${offset}`);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokedata();
  }, [currentUrl]);

  const fetchPokedata = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get<FetchPokemonsResult>(currentUrl);
      setPokemonsCount(data.count);
      setPrevUrl(data.previous);
      setNextUrl(data.next);
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

  const changePage = (value: 'prev' | 'next') => {
    if (value === 'prev' && prevUrl !== null) {
      setCurrentUrl(prevUrl);
    }
    if (value === 'next' && nextUrl !== null) {
      setCurrentUrl(nextUrl);
    }
  }

  if (loading) {
    return (
      <div className='pokemon-list'>
        <LoadingScreen/>
      </div>
    )
  }

  return (
    <div className="pokemon-list">
      <p
        className='pokemon-list__text'
      >
        There are <span>{pokemonsCount}</span> Pokemon for you!
      </p>
      <div className='pokemon-list__box'>
          {pokemonStore.pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))}
      </div>
      <div className="pokemon-list__buttons">
        <button
          onClick={() => changePage('prev')}
          disabled={prevUrl === null}
          className='pokemon-list__btn'
        >
          Prev
        </button>
        <button
          onClick={() => changePage('next')}
          disabled={nextUrl === null}
          className='pokemon-list__btn'
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default PokemonList;