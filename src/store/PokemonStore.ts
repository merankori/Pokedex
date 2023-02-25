import { makeAutoObservable } from "mobx";
import { IPokemon } from "../types/pokemon";

class PokemonStore {
  constructor() {
    makeAutoObservable(this);
  }

  _pokemons: IPokemon[] = []

  addPokemonData(data: IPokemon) {
    this._pokemons.push(data);
  }
  
  get pokemons(): IPokemon[] {
    return this._pokemons;
  }
}

export const pokemonStore = new PokemonStore();