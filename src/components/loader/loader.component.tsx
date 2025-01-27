import React from 'react';
import { clsx } from 'clsx';
import './loader.style.scss';

interface IProps {
  loading: boolean;
  children?: React.ReactNode;
}

const Loader: React.FC<IProps> = ({ loading, children }) => {
  return (
    <div className="loader__wrapper">
      {loading && (
        <div className="loader__nested">
          <div className="loader__spinner"></div>
          <div className="loader__text">Загрузка...</div>
        </div>
      )}
      <div
        className={clsx({
          loader__container: true,
          'loader__container--blur': loading,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Loader;
