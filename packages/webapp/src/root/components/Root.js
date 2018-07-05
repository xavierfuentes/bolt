import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import Profile from '../../profile/containers/Profile';
import LoginRegister from '../../user/containers/LoginRegister';

const Root = ({ isAuthenticated = false, logout }) => (
  <div>
    {isAuthenticated ? (
      <div>
        <Header onLogOut={logout} />
        <Switch>
          <Route exact path="/" component={Profile} />
          {/* <Route path="/settings" component={Settings}/>
          <Route path="/timeline" component={Timeline}/>
          <Route component={PageNotFound} /> */}
        </Switch>
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
