import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import PageNotFound from './PageNotFound';
import Dashboard from '../../dashboard/components/Dashboard';
import LoginRegister from '../../user/containers/LoginRegister';

const Root = ({ isAuthenticated = false, unauthenticate }) => (
  <div>
    {isAuthenticated ? (
      <div>
        <Header onLogOut={unauthenticate} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route component={PageNotFound} />
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
  unauthenticate: PropTypes.func,
};

export default Root;
