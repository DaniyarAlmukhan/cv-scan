import React from 'react';
import { clsx } from 'clsx';
import './button.style.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
}

const Button: React.FC<IProps> = ({ type = 'button', children, primary, secondary, ...rest }) => {
  return (
    <button
      type={type}
      className={clsx({
        btn: true,
        btn__primary: primary,
        btn__secondary: secondary,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
