import React from 'react';

import Login from '../components/Login';
import Register from '../components/Register';

class LoginRegister extends React.Component {
  state = {
    isRegistered: true,
  };

  toggle = event => {
    this.setState(previousState => ({ isRegistered: !previousState.isRegistered }));
  };

  handleLogin = ({ email, password }) => {
    const { authenticate } = this.props;
    authenticate({ email, password });
  };

  handleRegister = () => {};

  render() {
    const { isRegistered } = this.state;
    return (
      <div>
        {isRegistered ? (
          <Login onSubmit={this.handleLogin} />
        ) : (
          <div>
            <h2>Register</h2>
            <a href onClick={this.toggle}>
              Sign in here
            </a>
            <Register onSubmit={this.handleRegister} />
          </div>
        )}
      </div>
    );
  }
}

export default LoginRegister;
