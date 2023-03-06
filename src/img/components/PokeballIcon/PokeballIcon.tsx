import {FC} from 'react';

interface PokeballIconProps {
  classes: string;
  onClick?: () => void;
}

const PokeballIcon: FC<PokeballIconProps> = ({classes, onClick}) => {
  return (
    <div
      className={classes}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Слой_1" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
        <g>
          <circle fill="#FF3D00" cx="24" cy="24" r="18"/>
        </g>
        <path fill="#DD2C00" d="M24,6c-0.003,0-0.006,0-0.009,0C31.543,8.51,37,15.605,37,24s-5.457,15.49-13.01,18c0.004,0,0.007,0,0.01,0  c9.941,0,18-8.059,18-18S33.941,6,24,6z"/>
        <path fill="#FFFFFF" d="M29,24c0-2.762-2.238-5-5-5c-2.761,0-5,2.238-5,5H6c0,9.941,8.059,18,18,18s18-8.059,18-18H29z"/>
        <g>
          <path fill="#CFD8DC" d="M37,24c0,8.395-5.457,15.49-13.01,18c0.004,0,0.007,0,0.01,0c9.941,0,18-8.059,18-18H37z"/>
        </g>
        <g>
          <path fill="#37474F" d="M24,7c9.374,0,17,7.626,17,17s-7.626,17-17,17S7,33.374,7,24S14.626,7,24,7 M24,5C13.508,5,5,13.508,5,24   s8.508,19,19,19s19-8.508,19-19S34.492,5,24,5L24,5z"/>
          <rect x="6" y="23" fill="#37474F" width="13" height="2"/>
          <rect x="29" y="23" fill="#37474F" width="13" height="2"/>
          <path fill="#37474F" d="M24,20c2.206,0,4,1.794,4,4c0,2.206-1.794,4-4,4c-2.206,0-4-1.794-4-4C20,21.794,21.794,20,24,20 M24,18   c-3.313,0-6,2.686-6,6c0,3.313,2.687,6,6,6c3.314,0,6-2.687,6-6C30,20.686,27.314,18,24,18L24,18z"/>
          <circle fill="#37474F" cx="24" cy="24" r="2"/>
        </g>
      </svg>
    </div>
  );
};

export default PokeballIcon;