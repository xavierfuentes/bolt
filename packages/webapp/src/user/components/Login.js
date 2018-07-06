import React from 'react';

class Login extends React.Component {
  state = {
    email: 'me@xavierfuentes.com',
    password: 'password',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(_ => ({ [name]: value }));
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { email, password } = this.state;

    onSubmit({ email, password });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <article>
          <label htmlFor="email">
            User<input name="email" type="email" value={email} onChange={this.handleChange} />
          </label>
        </article>
        <article>
          <label htmlFor="password">
            Password<input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
        </article>
        <button onClick={this.handleSubmit}>Sign in</button>
      </div>
    );
  }
}

export default Login;
