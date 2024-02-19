import Loader from '@/assets/loader.svg';
import './LoadingScreen.scss';

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Loader className="loading-screen__pokeball" />
      <p className="loading-screen__text">Loading...</p>
    </div>
  );
};
