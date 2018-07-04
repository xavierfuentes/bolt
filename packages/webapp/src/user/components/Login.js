import React from 'react';

class Login extends React.Component {
  state = {
    businessId: 11076174,
    password: 11076174,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(_ => ({ [name]: value }));
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { businessId, password } = this.state;

    onSubmit({ businessId, password });
  };

  render() {
    const { businessId, password } = this.state;
    return (
      <div>
        <article>
          <label htmlFor="businessId">
            User<input name="businessId" value={businessId} onChange={this.handleChange} />
          </label>
        </article>
        <article>
          <label htmlFor="password">
            Password<input name="password" value={password} onChange={this.handleChange} />
          </label>
        </article>
        <button onClick={this.handleSubmit}>Sign in</button>
      </div>
    );
  }
}

export default Login;
