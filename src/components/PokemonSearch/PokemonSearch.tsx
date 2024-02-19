import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IPokemon } from '@/types/pokemon';
import { FETCH_POKEMONS } from '@/constants/constants';
import SearchIcon from '@/assets/icons/search.svg';
import './PokemonSearch.scss';
import clsx from 'clsx';

const Search: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenPokemonPage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.length) return;
    try {
      const { data } = await axios.get<IPokemon>(
        `${FETCH_POKEMONS}/${query.toLowerCase()}`
      );
      navigate(`/pokemon/${data.id}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  return (
    <form onSubmit={(e) => handleOpenPokemonPage(e)} className="pokemon-search">
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="pokemon-search__input"
        placeholder="Search by name or id"
      />
      <button className="pokemon-search__button">
        <div
          className={clsx('pokemon-search__tooltip', {
            'pokemon-search__tooltip_active': errorMessage,
          })}
        >
          Pokemon not found
        </div>
        <SearchIcon className="pokemon-search__icon" />
      </button>
    </form>
  );
};

export default Search;
