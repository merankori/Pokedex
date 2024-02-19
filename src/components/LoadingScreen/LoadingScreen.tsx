import { FC } from 'react';
import Loader from '@/assets/loader.svg';
import './LoadingScreen.scss';

const LoadingScreen: FC = () => {
  return (
    <div className="loading-screen">
      <Loader className="loading-screen__pokeball" />
      <p className="loading-screen__text">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
