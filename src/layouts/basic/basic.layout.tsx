import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'pages/auth-guard';
import Header from './components/header.component';
import Sidebar from './sidebar.component';

const BasicLayout = () => {
  return (
    <AuthGuard>
      <>
        <div className="basicLayout__wrapper">
          <div className="basicLayout__left">
            <Sidebar />
          </div>
          <div className="basicLayout__right">
            <Header />
            <div className="basicLayout__content">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
};

export default BasicLayout;
