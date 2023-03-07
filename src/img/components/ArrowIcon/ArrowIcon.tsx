import {FC} from 'react';

interface ArrowIconProps {
  classes?: string
}

const ArrowIcon: FC<ArrowIconProps> = ({classes}) => {
  return (
    <svg className={classes} width="30px" height="30px" viewBox="0 0 133 243">
      <path d="M101.1 6.35941L45.7153 61.7442L11.7249 95.5622C-2.59579 109.883 -2.59579 133.176 11.7249 147.496L101.1 236.871C112.833 248.604 132.847 240.149 132.847 223.758V126.964V19.4723C132.847 2.90865 112.833 -5.37319 101.1 6.35941Z"/>
    </svg>
  );
};

export default ArrowIcon;