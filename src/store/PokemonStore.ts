import { makeAutoObservable } from "mobx";
import { IPokemon } from "../types/pokemon";

class PokemonStore {
  constructor() {
    makeAutoObservable(this);
  }

  _pokemons: IPokemon[] = []

  addPokemons(pokemons: IPokemon[]) {
    this._pokemons = pokemons;
  }
  
  get pokemons(): IPokemon[] {
    return this._pokemons;
  }
}

export const pokemonStore = new PokemonStore();