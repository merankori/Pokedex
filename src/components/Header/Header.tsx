import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.svg';
import { headerLinks } from '@/constants/constants';
import { BurgerMenu } from '@/components/BurgerMenu/BurgerMenu';
import './Header.scss';

export const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsMenuOpened(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpened(false);
  };

  return (
    <div className="header">
      <BurgerMenu isMenuOpened={isMenuOpened} onCloseMenu={handleMenuClose} />
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
        <div onClick={handleMenuOpen} className="header__burger-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
