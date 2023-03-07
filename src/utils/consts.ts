export const FETCH_POKEMONS = 'https://pokeapi.co/api/v2/pokemon';
export const headerLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Catalog',
    path: '/catalog'
  },
  {
    name: 'My team',
    path: '/team'
  }
];

export const typeColors: {
  [name: string]: string
} = {
  normal: "#95afc0",
  fighting: "#30336b",
  flying: "#81ecec",
  poison: "#6c5ce7",
  ground: "#EFB549",
  rock: "#2d3436",
  bug: "#26de81",
  ghost: "#a55eea",
  steel: "#bbb",
  fire: "#D93E30",
  water: "#35BAFF",
  grass: "#64D368",
  electric: "#F5DB13",
  psychic: "#a29bfe",
  ice: "#74b9ff",
  dragon: "#e4cf89",
  fairy: "#F4B5C1",
  unknown: "#999",
  shadow: "#333",
  dark: "#666"
}

export const statColors: {
  [name: string]: string
} = {
  hp: "#14CC60",
  attack: "#EF3E33",
  defense: "#004E98",
  "special-attack": "#C589E8",
  "special-defense": "#2589BD",
  speed: "#E4C811",
  default: "#999"
}