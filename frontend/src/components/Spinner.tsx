import React from 'react';

interface Props {
  speed?: 1 | 2 | 3;
  color?: string;
}

const Spinner = ({ speed = 3, color }: Props) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className={`fa-${speed}x`}>
        <i className={`fas fa-atom fa-spin ${!color ? 'text-blue-400' : color}`}></i>
      </div>
    </div>
  );
};

export default Spinner;
