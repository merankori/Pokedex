import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.svg';
import { headerLinks } from '@/constants/constants';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';
import './Header.scss';

const Header: FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  return (
    <div className="header">
      <BurgerMenu isActive={menuActive} setActive={setMenuActive} />
      <div className="header__container">
        <Link to="/">
          <Logo className="header__logo" />
        </Link>
        <nav className="header__nav">
          {headerLinks.map((item) => (
            <Link key={item.name} to={item.path} className="header__link">
              {item.name}
            </Link>
          ))}
        </nav>
        <div onClick={() => setMenuActive(true)} className="header__burger-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
