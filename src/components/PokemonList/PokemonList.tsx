import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { IPokedata } from '../../types/pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonList: FC = () => {
  const [pokedataItems, setPokedataItems] = useState<IPokedata[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokedata();
  }, []);

  const fetchPokedata = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9')
      setPokedataItems(data.results);
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  console.log(pokedataItems)

  if (loading) {
    return <p>Загрузка...</p>
  }

  return (
    <div className='pokemon-list'>
        {pokedataItems.map(item => (
          <PokemonCard pokedata={item}/>
        ))}
    </div>
  );
};

export default PokemonList;