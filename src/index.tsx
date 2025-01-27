import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'contexts/auth.context';
import { ModalProvider } from 'contexts/modal.context';
import Routes from 'pages';
import 'i18n';
import 'assets/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter >
    <AuthProvider>
      <ModalProvider>
        <Routes />
        <ToastContainer theme={'dark'} />
      </ModalProvider>
    </AuthProvider>
  </BrowserRouter>,
);
