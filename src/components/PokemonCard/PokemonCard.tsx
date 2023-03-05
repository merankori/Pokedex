import {FC, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import PokeballIcon from '../../img/components/PokeballIcon/PokeballIcon';
import { pokemonStore } from '../../store/PokemonStore';
import { IPokemon } from '../../types/pokemon';
import { typeColors } from '../../utils/consts';
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: IPokemon
}

const PokemonCard: FC<PokemonCardProps> = ({pokemon}) => {
  const [isTeammate, setIsTeammate] = useState<boolean>();

  useEffect(() => {
    checkTeammate(pokemon.id);
  }, [])

  const checkTeammate = (id: number) => {
    pokemonStore.teamIds.includes(id) ? setIsTeammate(true) : setIsTeammate(false);
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`} className='pokemon-card'>
      <div className="pokemon-card__content">
        <h2 className="pokemon-card__name">{pokemon?.name}</h2>
        <div className="pokemon-card__stats">
          <div className="pokemon-card__stat">
            <p className="pokemon-card__stat-value">{pokemon?.stats[1].base_stat}</p>
            <p className="pokemon-card__stat-name">{pokemon?.stats[1].stat.name}</p>
          </div>
          <div className="pokemon-card__stat">
            <p className="pokemon-card__stat-value">{pokemon?.stats[2].base_stat}</p>
            <p className="pokemon-card__stat-name">{pokemon?.stats[2].stat.name}</p>
          </div>
        </div>
        <div className="pokemon-card__types">
          {pokemon?.types.map(item => (
            <div
              className="pokemon-card__type"
              style={{backgroundColor: typeColors?.[item.type.name] || '#F6F7F9'}}
              key={item.slot}
            >
              {item.type.name}
            </div>
          ))}
        </div>
      </div>
      <div
        className="pokemon-card__img"
        style={{backgroundColor: typeColors?.[pokemon.types[0].type.name] || '#F6F7F9'}}
      >
        <PokeballIcon
          classes={`pokemon-card__teammate-icon ${isTeammate ? 'pokemon-card__teammate-icon_active' : ''}`}
        />
        <p className='pokemon-card__id'>#{pokemon.id}</p>
        <img className="pokemon-card__img-content" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </div>
    </Link>
  );
};

export default PokemonCard;