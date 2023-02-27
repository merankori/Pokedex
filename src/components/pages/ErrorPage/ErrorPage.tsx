import {FC} from 'react';
import { Link } from 'react-router-dom';
import "./ErrorPage.scss";
// @ts-ignore
import img from "../../../img/error-pic.png";

const ErrorPage: FC = () => {
  return (
    <div className='error-page page'>
        <div className="error-page__container">
          <div className="error-page__content">
            <div className="error-page__bg">
              <h1 className='error-page__title'>404</h1>
              <img className='error-page__img' src={img} alt="" />
            </div>
            <p className='error-page__text'>The rocket team <span>has won this time.</span></p>
            <Link to="/" className="error-page__btn">Return</Link>
          </div>
        </div>
    </div>
  );
};

export default ErrorPage;