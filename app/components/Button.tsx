import React from 'react';

import { ButtonProps } from '@/types/Button.types';

const Button: React.FC<ButtonProps> = ({
  color,
  size,
  onClick,
  responsiveWidth,
  children,
  type = 'button',
}) => {
  const colorClass = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded';
      case 'red':
        return 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
      case 'white':
        return 'bg-white hover:bg-gray-100 text-black font-bold rounded';
      default:
        return 'bg-gray-500 hover:bg-gray-700 text-white';
    }
  };

  const sizeClasses = (): string => {
    switch (size) {
      case 'extra-small':
        return 'py-1 px-2 text-sm';
      case 'small':
        return 'py-1 px-2 text-md';
      case 'medium':
        return 'py-2 px-2 text-xl';
      case 'large':
        return 'py-3 px-4 text-2xl';
      default:
        return 'py-2 px-4 text-base';
    }
  };

  const widthClass = (): string => {
    if (responsiveWidth) {
      return 'w-full';
    }

    return '';
  };

  const buttonClasses = ` ${colorClass()} ${sizeClasses()} ${widthClass()} `;

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
