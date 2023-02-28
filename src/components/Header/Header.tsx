import {FC} from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";

// @ts-ignore
import logo from "../../img/logo.svg";
import { headerLinks } from '../../utils/consts';

const Header: FC = () => {
  return (
    <div className='header'>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>
        <nav className="header__nav">
          {headerLinks.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="header__link"
            >{item.name}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;