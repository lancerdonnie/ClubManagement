import React from 'react';

interface Props {
  size?: 1 | 2 | 3;
  color?: string;
  className?: string;
  show: boolean;
}

const Spinner = ({ size = 1, color, className, show }: Props) => {
  return show ? (
    <div className={`fa-${size}x inline-block mx-1 ${className}`}>
      <i className={`fa fa-circle-notch fa-spin ${!color ? 'text-blue-400' : color}`}></i>
    </div>
  ) : null;
};

export default Spinner;
