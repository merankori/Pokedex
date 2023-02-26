import {FC} from 'react';
import {Link} from "react-router-dom";
import { IPokemon } from '../../types/pokemon';
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: IPokemon
}

const PokemonCard: FC<PokemonCardProps> = ({pokemon}) => {
  return (
    <Link to={'pokemon/' + pokemon.id} className='pokemon-card'>
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
              key={item.slot}
            >
              {item.type.name}
            </div>
          ))}
        </div>
      </div>
      <div className="pokemon-card__img">
        <img className="pokemon-card__img-content" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </div>
      <p className='pokemon-card__id'>#{pokemon.id}</p>
    </Link>
  );
};

export default PokemonCard;