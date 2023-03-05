import axios from 'axios';
import {FC, useState, useEffect} from 'react';
import { IPokemon } from '../../../types/pokemon';
import { FETCH_POKEMONS } from '../../../utils/consts';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

const TeamPage: FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[] | null>(null);
  const [loading, setLoading] = useState(false);
  const teamData: string | null = localStorage.getItem('team');
  const teamIds: number[] | null = teamData ? JSON.parse(teamData) : null;

  useEffect(() => {
    if (teamIds && teamIds.length) {
      fetchPokemons(teamIds);
    }
  }, []);

  const fetchPokemons = async (ids: number[]) => {
    try {
      setLoading(true);
      const pokemons: IPokemon[] = [];
      for (let id of ids) {
        const {data: pokemon} = await axios.get<IPokemon>(`${FETCH_POKEMONS}/${id}`);
        pokemons.push(pokemon);
      }
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
  if (!teamIds) {
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

      </div>
    </div>
  );
};

export default TeamPage;