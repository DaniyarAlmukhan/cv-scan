import React from 'react';
import { DefaultTFuncReturn } from 'i18next';

export interface IModalOptions {
  title?: DefaultTFuncReturn | string;
  width?: number; // pixels
  handleCancel?: VoidFunction;
  handleOk?: (data?: any) => void;
}

export interface IModalContext {
  open: (content: React.ReactNode, options?: IModalOptions) => void;
  close: VoidFunction;
}
