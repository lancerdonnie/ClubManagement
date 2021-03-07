import React from 'react';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const bgMap = {
  default: 'bg-white',
  success: 'bg-green-400',
  error: 'bg-red-500',
  warning: 'bg-yellow-400',
};

const textMap = {
  default: 'text-black',
  success: 'text-white',
  error: 'text-white',
  warning: 'text-black',
};

export const Toast = ({
  duration = 2000,
  component,
  msg = 'Default message',
  type = 'default',
}: {
  duration?: null | number;
  component?: (onClose: () => void) => JSX.Element;
  msg?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
  notify?: boolean;
}) => {
  toaster.notify(
    ({ onClose }) =>
      component ? (
        component(onClose)
      ) : (
        <div
          className={`${bgMap[type]} ${textMap[type]} p-1 px-2 rounded border border-solid border-gray-400`}
        >
          <span>{msg}</span>
          <i className="fa fa-times cursor-pointer ml-2" onClick={onClose}></i>
        </div>
      ),
    {
      duration,
    }
  );
};

export default Toast;
