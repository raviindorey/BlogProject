import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    const { username, password } = this.state;
    const { handleLogin } = this.props;
    return (
      <form onSubmit={(e) => handleLogin(e, this.state)}>
        <h4>Login</h4>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
