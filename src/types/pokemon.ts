export interface IPokedata {
  name: string
  url: string
}

export interface IPokemon {
  id: number
  name: string
  abilities: IAbilityItem[]
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  types: IPokeTypeItem[]
  height: number
  weight: number
  stats: IStatItem[]
  species: {
    name: string,
    url: string
  }
}

interface IStatItem {
  base_stat: number,
  stat: {
    name: string
    url: string
  }
}

interface IPokeTypeItem {
  slot: 1,
  type: {
    name: string
    url: string
  }
}

interface IAbilityItem {
  name: string
  url: string
}