import { Dispatch, FC } from 'react';
import { Link } from 'react-router-dom';
import { headerLinks } from '@/constants/constants';
import clsx from 'clsx';
import './BurgerMenu.scss';

interface BurgerMenuProps {
  isMenuOpened: boolean;
  onCloseMenu: () => void;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({
  isMenuOpened,
  onCloseMenu,
}) => {
  return (
    <div
      onClick={onCloseMenu}
      className={clsx('burger-menu', {
        'burger-menu_active': isMenuOpened,
      })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="burger-menu__content"
      >
        <div className="burger-menu__header">
          <h2>Menu</h2>
        </div>
        <nav className="burger-menu__nav">
          {headerLinks.map((link) => (
            <Link
              onClick={onCloseMenu}
              key={link.path}
              to={link.path}
              className="burger-menu__link"
            >
              <p className="burger-menu__link-title">{link.name}</p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
