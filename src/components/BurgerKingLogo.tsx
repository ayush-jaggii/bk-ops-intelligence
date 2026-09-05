import React from 'react';
import bkLogo from '../assets/bk-logo.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  size?: number;
}

export const BurgerKingLogo: React.FC<LogoProps> = ({
  className = '',
  size = 48
}) => {
  return (
    <img
      src={bkLogo}
      alt="Burger King"
      className={`object-contain shrink-0 ${className}`}
      style={{ height: `${size}px`, width: `${size}px` }}
      loading="eager"
    />
  );
};
