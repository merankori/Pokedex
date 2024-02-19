import { FC } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '@/assets/bg.png';
import './HomePage.scss';

const HomePage: FC = () => {
  return (
    <div className="home-page page">
      <div className="home-page__container">
        <div className="home-page__content">
          <h1 className="home-page__title">
            <span>Find</span> all your
            <br />
            favorite
            <br />
            <span>Pokemon</span>
          </h1>
          <p className="home-page__text">
            You can know the type of Pokemon,
            <br />
            its strengths, disadvantages and
            <br />
            abilities
          </p>
          <Link to="/catalog" className="home-page__button">
            See pokemons
          </Link>
        </div>
      </div>
      <img src={bgImage} alt="" className="home-page__bg" />
    </div>
  );
};

export default HomePage;
