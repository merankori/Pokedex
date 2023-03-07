import {FC, useState} from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";

// @ts-ignore
import logo from "../../img/logo.svg";
import { headerLinks } from '../../utils/consts';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header: FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  return (
    <div className='header'>
      <BurgerMenu
        isActive={menuActive}
        setActive={setMenuActive}
      />
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
        <div
          onClick={() => setMenuActive(true)}
          className="header__burger-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;