import axios from 'axios';
import {FC, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { IPokemon } from '../../../types/pokemon';
import { FETCH_POKEMON } from '../../../utils/consts';

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
      const {data} = await axios.get<IPokemon>(`${FETCH_POKEMON}/${id}`);
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

  return (
    <div className='pokemon-page page'>
        <div className="page__container">
          <div className="pokemon-info pokemon-info-top">
            <div className="pokemon-info__image">
              <div className="pokemon-info__types">
                {pokemon?.types.map(item => (
                  <div className="pokemon-info__type">{item.type.name}</div>
                ))}
              </div>
              <img src={pokemonPicture} alt="" />
            </div>
            <div className="pokemon-info__content">
              <h2>Stats</h2>
              <div className="pokemon-info__box">
                {pokemon?.stats.map(stat => (
                  <div className="pokemon-info__item">
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