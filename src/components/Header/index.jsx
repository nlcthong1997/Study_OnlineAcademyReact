import React, { useContext } from 'react';

import NavHead from './NavHead';
import NavSearch from './NavSearch';
import './index.css';

import AppContext from '../../AppContext';

const Header = ({ isHideMenu }) => {

  const { store } = useContext(AppContext);

  return (
    <div className="nav-header">
      <NavHead categories={!isHideMenu ? store.categories : []} />
      <NavSearch />
    </div>
  );
}

export default Header;