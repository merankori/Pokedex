import axios from 'axios';
import {FC, useState, useEffect} from 'react';
import { pokemonStore } from '../../../store/PokemonStore';
import { IPokemon } from '../../../types/pokemon';
import { FETCH_POKEMONS } from '../../../utils/consts';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import PokemonCard from '../../PokemonCard/PokemonCard';
import Search from '../../PokemonSearch/PokemonSearch';

import "./TeamPage.scss";

const TeamPage: FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[] | null>(null);
  const [pokemonsCount, setPokemonsCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const teamIds = pokemonStore.teamIds;

  useEffect(() => {
    fetchPokemons(teamIds);
  }, [teamIds]);

  const fetchPokemons = async (ids: number[]) => {
    try {
      setLoading(true);
      const pokemons: IPokemon[] = [];
      for (let id of ids) {
        const {data: pokemon} = await axios.get<IPokemon>(`${FETCH_POKEMONS}/${id}`);
        pokemons.push(pokemon);
      }
      setPokemonsCount(pokemons.length)
      setPokemons(pokemons);
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className='team-page page'>
        <div className="team-page__container">
          <LoadingScreen/>
        </div>
      </div>
    );
  }
  if (!teamIds.length) {
    return (
      <div className='team-page page'>
        <div className="team-page__container">
          <p>There are no Pokemon in your team.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='team-page page'>
      <div className="team-page__container">
        <Search/>
        <h1 className="team-page__title">Your team</h1>
        <p className="team-page__text">
          There are <span>{pokemonsCount}</span> Pokemon in your team.
        </p>
        <div className="team-page__team-list">
          {pokemons?.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;