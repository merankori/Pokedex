import axios from 'axios';
import {FC, useState, FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import { IPokemon } from '../../types/pokemon';
import { FETCH_POKEMONS } from '../../utils/consts';

import "./PokemonSearch.scss";

const Search: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const openPokemonPage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.length) return;
    try {
      const {data} = await axios.get<IPokemon>(`${FETCH_POKEMONS}/${query.toLowerCase()}`);
      navigate(`/pokemon/${data.id}`);
    } catch(err) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
  }

  return (
    <form
      onSubmit={e => openPokemonPage(e)}
      className='pokemon-search'>
      <input
        type="text"
        onChange={e => setQuery(e.target.value)}
        className="pokemon-search__input"
        placeholder='Search by name or id'
      />
      <button className="pokemon-search__button">
        <div
          className={`pokemon-search__tooltip ${errorMessage ? 'pokemon-search__tooltip_active' : ''}`}
        >
          Pokemon not found
        </div>
        <svg className='pokemon-search__icon' enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32">
          <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
        </svg>
      </button>
    </form>
  );
};

export default Search;