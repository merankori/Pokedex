import { makeAutoObservable } from 'mobx';
import { IPokemon } from '@/types/pokemon';

class PokemonStore {
  constructor() {
    makeAutoObservable(this);
  }

  _pokemons: IPokemon[] = [];
  _teamIds: number[] = [];

  addPokemons(pokemons: IPokemon[]) {
    this._pokemons = pokemons;
  }

  setPokemonsTeam(ids: number[]) {
    this._teamIds = ids;
  }

  updateTeam(teamArr: number[]) {
    this._teamIds = teamArr;
  }

  get pokemons(): IPokemon[] {
    return this._pokemons;
  }
  get teamIds(): number[] {
    return this._teamIds;
  }
}

export const pokemonStore = new PokemonStore();
