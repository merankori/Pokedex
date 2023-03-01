import axios from 'axios';
import {FC, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { IPokemon } from '../../../types/pokemon';
import { FETCH_POKEMONS, typeColors } from '../../../utils/consts';
import PokemonSearch from "../../PokemonSearch/PokemonSearch";

import "./PokemonPage.scss";

const PokemonPage: FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const pokemonPicture = pokemon?.sprites.other['official-artwork'].front_default;
  const {id} = useParams();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get<IPokemon>(`${FETCH_POKEMONS}/${id}`);
      setPokemon(data);
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  const typeColor = pokemon ? typeColors?.[pokemon?.types[0].type.name] : '#F6F7F9';

  return (
    <div className='pokemon-page page'>
        <div className="page__container">
          <PokemonSearch/>
          <div className="pokemon-info pokemon-info-top">
            <div
              className="pokemon-info__image"
              style={{backgroundColor: typeColor}}
            >
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
              <img src={pokemonPicture} alt="" />
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
        </div>
    </div>
  );
};

export default PokemonPage;