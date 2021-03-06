import React from 'react';

type Props = {
  options: { [key: string]: any }[];
  dataName: string;
  dataValue: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ name, options = [], dataName, dataValue, className, ...props }: Props) => {
  return (
    <div>
      <select
        id={name}
        name={name}
        className={`inline-flex items-center justify-center rounded-md outline-none cursor-pointer px-5 py-2 border border-solid border-gray-300 hover:text-white hover:border-transparent transition duration-300 ease-in-out ${className}`}
        {...props}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {options.map((e, i) => (
          <option key={i} value={e[dataValue]}>
            {e[dataName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
