import React, { useId, InputHTMLAttributes } from 'react';
import './checkbox.style.scss';
import Icon from '../icon/icon.component';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({ label, ...rest }: IInputProps) => {
  const id = rest.id ?? useId();
  return (
    <div className="checkbox__wrapper">
      <input type="checkbox" id={id} className="checkbox__input" {...rest} />
      <label className="checkbox__label" htmlFor={id}>
        <span className="checkbox__icon">
          <Icon name="Check" size={18} />
        </span>
        {label && <span className="checkbox__text">{label}</span>}
      </label>
    </div>
  );
};
