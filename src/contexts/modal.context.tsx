import React, { createContext, useState, useContext } from 'react';
import { IModalContext, IModalOptions } from 'interfaces/modal.interface';
import { Modal } from 'components/modal/modal.component';

interface IProps {
  children: React.ReactNode;
}

const ModalContext = createContext<IModalContext>({
  open: () => null,
  close: () => null,
});

export const ModalProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalOptions, setModalOptions] = useState<IModalOptions>({});

  const open = (content: React.ReactNode, options: IModalOptions = {}) => {
    setModalContent(content);
    setModalOptions(options);
  };

  const close = () => {
    setModalContent(null);
    setModalOptions({});
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {modalContent && <Modal options={modalOptions}>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalContext => useContext(ModalContext);
