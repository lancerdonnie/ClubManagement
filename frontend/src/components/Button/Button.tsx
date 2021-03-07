import React from 'react';

type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const btn = {
  default: 'bg-blue-400 text-white hover:bg-blue-500',
  primary: 'bg-green-400 text-white hover:bg-green-500',
  secondary: 'bg-purple-400 text-white hover:bg-purple-500',
  danger: 'bg-red-400 text-white hover:bg-red-500',
};

const Button = ({ children, className, variant = 'default', ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${btn[variant]} inline-flex items-center justify-center rounded-md cursor-pointer px-5 py-2 border border-solid border-gray-300 hover:text-white hover:border-transparent transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
