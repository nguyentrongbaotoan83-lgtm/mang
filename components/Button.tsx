
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', disabled = false, type = 'primary' }) => {
  let baseStyle = 'px-6 py-3 rounded-xl font-bold transition duration-300 transform hover:scale-105 shadow-md';
  
  switch (type) {
    case 'primary':
      baseStyle += ' bg-primary text-white hover:bg-indigo-600';
      break;
    case 'secondary':
      baseStyle += ' bg-secondary text-white hover:bg-emerald-600';
      break;
    case 'danger':
      baseStyle += ' bg-danger text-white hover:bg-red-600';
      break;
    case 'warning':
      baseStyle += ' bg-warning text-white hover:bg-amber-600';
      break;
    case 'ghost':
      baseStyle += ' bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
