import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Profile from '../../profile/containers/Profile';
import LoginRegister from '../../user/containers/LoginRegister';

const Root = ({ isAuthenticated = false, logout }) => (
  <div>
    {isAuthenticated ? (
      <div>
        <Header onLogOut={logout} />
        <Profile />
        <Footer />
      </div>
    ) : (
      <LoginRegister />
    )}
  </div>
);

Root.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

export default Root;
