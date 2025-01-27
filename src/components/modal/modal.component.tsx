import React, { useEffect, useRef } from 'react';
import { useModal } from 'contexts/modal.context';
import { IModalOptions } from 'interfaces/modal.interface';
import Icon from '../icon/icon.component';
import './modal.style.scss';

interface IModalProps {
  children: React.ReactNode;
  options: IModalOptions;
  type?: string;
}

export const Modal = ({ children, options, type }: IModalProps) => {
  const { title, width, handleCancel } = options;
  const { close } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    if (handleCancel) {
      handleCancel();
    }
    close();
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, options);
    }
    return child;
  });

  return (
    <div className={`modal__overlay modal__overlay--${type}`} >
      <div
        ref={modalRef}
        className="modal__content"
        style={width ? { width: `${width}px` } : undefined}
      >
        <div className="modal__header">
          <span>{title}</span>
          <button type="button" className="modal__close" onClick={handleClose}>
            <Icon name="CircleX" />
          </button>
        </div>
        <div className="modal__body">{childrenWithProps}</div>
      </div>
    </div>
  );
};
