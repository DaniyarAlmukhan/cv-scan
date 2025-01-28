import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './basic.style.scss';
import { ChervonRightDouble } from 'assets';
import { routes, routeToIcon } from 'constants/shared.constant';
import { Text } from 'components/text.component';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const isActiveRoute = (route: string) => location.pathname.split('/').pop() === route || location.pathname === '/app' && route === 'home';

  return (
    <div className={`basicLayout__sidebar ${isOpen ? 'open' : ''}`}>
      <div className="basicLayout__sidebar__top">
        <div className="basicLayout__logo">
          E
        </div>
        <nav className="basicLayout__menu">
          <ul>
            {routes.map((route) => (
              <li key={route} className={isActiveRoute(route) ? 'active' : ''}>
                <Link to={`${route}`} className='basicLayout__route'>
                  {isActiveRoute(route) ? routeToIcon[route]?.active : routeToIcon[route]?.inactive}
                  <Text className='basicLayout__route-name' fontSize='1.125rem' color={isActiveRoute(route) ? '#000000' : '#3E3E3E80'} fontWeight={isActiveRoute(route) ? 700 : 400}>
                    {t(`navigation.${route}`)}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="basicLayout__sidebar__button" onClick={() => setIsOpen(!isOpen)}>
        <ChervonRightDouble />
        <Text className='basicLayout__sidebar__button-text' color={'#000000'} fontWeight={400}>
          {t(`navigation.collapse`)}
        </Text>
      </div>
    </div>
  );
};

export default Sidebar;
