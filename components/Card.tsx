
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default Card;
