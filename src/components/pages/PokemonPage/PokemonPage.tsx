import axios from 'axios';
import {FC, useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import { pokemonStore } from '../../../store/PokemonStore';
import { IPokemon } from '../../../types/pokemon';
import { FETCH_POKEMONS, typeColors } from '../../../utils/consts';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import PokemonSearch from "../../PokemonSearch/PokemonSearch";

import "./PokemonPage.scss";

interface ISpecies {
  evolution_chain: {
    url: string
  }
}

interface IEvolutionData {
  evolves_to: IEvolutionData[]
  species: {
    name: string
  }
}

export interface IEvolutionChainData {
  chain: {
    evolves_to: IEvolutionData[]
    species: {
      name: string
    }
  }
}

const PokemonPage: FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [isTeammate, setIsTeammate] = useState(false);
  const [evolutions, setEvolutions] = useState<IPokemon[] | null>(null);
  const [loading, setLoading] = useState(false);
  const pokemonPicture = pokemon?.sprites.other['official-artwork'].front_default;
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonData();
  }, [id]);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const {data: pokemon} = await axios.get<IPokemon>(`${FETCH_POKEMONS}/${id}`);
      setPokemon(pokemon);
      checkTeammate(pokemon.id);
      const {data: species} = await axios.get<ISpecies>(pokemon.species.url);
      const {data: evolutionChain} = await axios.get<IEvolutionChainData>(species.evolution_chain.url);
      const evolutions = await getEvolutions(evolutionChain, pokemon.name);
      setEvolutions(evolutions);
    } catch(err: any) {
      if (err.response?.status === 404) {
        navigate('/404');
        return
      }
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  const getEvolutions = async (evolutionChain: IEvolutionChainData, pokemonName: string) => {
    const evolutions: IPokemon[] = [];
    await checkEvolutions([evolutionChain.chain]);
    return evolutions;

    async function checkEvolutions(chain: IEvolutionData[]) {
      for (let item of chain) {
        if (item.evolves_to.length) {
          if (item.species.name === pokemonName) {
            return await fetchEvolutions(item.evolves_to);
          }
          await checkEvolutions(item.evolves_to)
        }
        continue;
      }
    }
    async function fetchEvolutions(chain: IEvolutionData[]) {
      for (let item of chain) {
        const {data: evolution} = await axios.get<IPokemon>(`${FETCH_POKEMONS}/${item.species.name}`);
        evolutions.push(evolution);
      }
    }
  }

  const checkTeammate = (id: number) => {
    pokemonStore.teamIds.includes(id) ? setIsTeammate(true) : setIsTeammate(false);
  }

  const onToggleTeammate = () => {
    const team = localStorage.getItem('team');
    if (pokemon && team) {
      let teamArr: number[] = JSON.parse(team);
      if (isTeammate) {
        teamArr = teamArr.filter((item: number) => item !== pokemon.id);
        localStorage.setItem('team', JSON.stringify(teamArr));
        setIsTeammate(false)
      } else if (teamArr.length < 6) {
        teamArr.push(pokemon.id);
        localStorage.setItem('team', JSON.stringify(teamArr));
        setIsTeammate(true)
      }
      pokemonStore.updateTeam(teamArr)
    }
  }

  if (loading) {
    return (
      <div className='pokemon-page page'>
        <LoadingScreen/>
      </div>
    )
  }

  const typeColor = pokemon ? typeColors?.[pokemon?.types[0].type.name] : '#F6F7F9';

  return (
    <div className='pokemon-page page'>
      <div className="page__container">
        <PokemonSearch/>
        <div className="pokemon-info">
          <div
            className="pokemon-info__image"
            style={{backgroundColor: typeColor}}
          >
            <div className="pokemon-info__icons">
              <div className="pokemon-info__types">
                {pokemon?.types.map(item => (
                  <div
                    key={item.slot}
                    className="pokemon-info__type"
                    style={{backgroundColor: typeColors?.[item.type.name] || '#F6F7F9'}}
                  >
                    {item.type.name}
                  </div>
                ))}
              </div>
              <svg
                onClick={onToggleTeammate}
                className={`pokemon-info__teammate-btn ${isTeammate ? 'pokemon-info__teammate-btn_active' : ''}`}
                viewBox="0 0 36 36"
              >
                <defs>
                  <mask id="mask" x="0" y="0" height="36" width="36">
                    <rect x="0" y="0" height="18" width="36" fill="white" />
                  </mask>
                </defs>
                <circle fill="white" stroke="black" strokeWidth="2" cx="18" cy="18" r="16" />
                <circle fill="red" mask="url(#mask)" stroke="black" strokeWidth="2" cx="18" cy="18" r="16" />
                <rect fill="black" height="2" width="32" x="2" y="17" />
                <circle fill="white" stroke="black" strokeWidth="2" cx="18" cy="18" r="6" />
                <circle fill="black" cx="18" cy="18" r="3" />
              </svg>
            </div>
            <img src={pokemonPicture} alt="Pokemon" />
            <h2 className='pokemon-info__name'>{pokemon?.name}</h2>
          </div>
          <div className="pokemon-info__content">
            <h2>Stats</h2>
            <div className="pokemon-info__box">
              {pokemon?.stats.map(stat => (
                <div
                  key={stat.stat.name}
                  className="pokemon-info__item"
                >
                  <p className='pokemon-info__item-value'>{stat.base_stat}</p>
                  <p className='pokemon-info__item-name'>{stat.stat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pokemon-evolution">
          <div className="pokemon-evolution__box">
            {evolutions?.map(evolution => (
              <div
                key={evolution.id}
                className="pokemon-evolution__item"
              >
                <Link
                  to={`/pokemon/${evolution.id}`}
                  style={{backgroundColor: typeColors?.[evolution?.types[0].type.name]}}
                  className="pokemon-evolution__content"
                >
                  <img src={evolution.sprites.other['official-artwork'].front_default} alt="" className="pokemon-evolution__img" />
                  <div className="pokemon-evolution__desc">
                    <div className="pokemon-evolution__name">{evolution.name}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;