import React, { ReactElement, useMemo } from 'react';
import { DefaultTFuncReturn } from 'i18next';
import { FormikProps } from 'formik';
import Icon from '../icon/icon.component';
import './input.style.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  active?: boolean;
  formik?: FormikProps<any>;
  label?: DefaultTFuncReturn | string;
  placeholder?: string;
  icon?: ReactElement;
}

const Input: React.FC<IProps> = ({ formik, name, label, placeholder, value, onChange, icon, active, ...rest }) => {
  const getError: string | null = useMemo(() => {
    if (!formik?.errors) {
      return null;
    }

    return formik?.errors[name] as string;
  }, [formik, name]);

  return (
    <div
      className={`input ${!!getError && formik?.touched[name]
        ? 'input--error'
        : !getError && formik?.touched[name]
          ? 'input--success'
          : ''
        } ${active ? 'input--active' : ''}`}
    >
      <input
        {...rest}
        value={value}
        name={name}
        placeholder={placeholder}
        onBlur={() => formik?.setFieldTouched(name, true, true)}
        onFocus={() => formik?.setFieldTouched(name, false, true)}
        onChange={onChange}
      />
      {label ? <label>{label}</label> : null}
      {formik?.touched[name] && !!getError && (
        <span className="input--error__message" aria-label={getError}>
          <Icon name={'CircleAlert'} size={16} />
        </span>
      )}

      {
        icon && <div className='input__icon'>
          {icon}
        </div>
      }
    </div>
  );
};

export default Input;
