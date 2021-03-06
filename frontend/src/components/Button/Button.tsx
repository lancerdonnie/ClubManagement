import Spinner from 'components/Spinner';
import React from 'react';

type Props = {
  children: React.ReactNode;
  hoverColor?: string;
  icon?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, loading, hoverColor = 'red', ...props }: Props) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md outline-none cursor-pointer px-5 py-2 border border-solid border-gray-300 hover:bg-${hoverColor}-300 hover:text-white hover:border-transparent transition duration-300 ease-in-out ${className}`}
    >
      {loading ? <Spinner speed={1} color="text-white" /> : children}
    </button>
  );
};

export default Button;
