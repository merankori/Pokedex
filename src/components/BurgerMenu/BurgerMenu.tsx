import {Dispatch, FC} from 'react';
import { Link } from 'react-router-dom';
import { headerLinks } from '../../utils/consts';
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  isActive: boolean
  setActive: Dispatch<React.SetStateAction<boolean>>
}

const BurgerMenu: FC<BurgerMenuProps> = ({isActive, setActive}) => {
  
  return (
    <div
      onClick={() => setActive(false)}
      className={isActive ? 'burger-menu burger-menu_active' : 'burger-menu'}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="burger-menu__content"
      >
        <div className="burger-menu__header">
          <h2>Menu</h2>
        </div>
        <nav className="burger-menu__nav">
          {headerLinks.map(link => (
            <Link
              onClick={() => setActive(false)}
              key={link.path}
              to={link.path} className="burger-menu__link"
            >
              <p className="burger-menu__link-title">{link.name}</p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;