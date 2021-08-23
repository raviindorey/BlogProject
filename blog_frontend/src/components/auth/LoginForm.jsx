import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
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

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const { authProps } = this.props;
    const { setUser, setAuthStatus } = authProps;
    try {
      const userObj = await Auth.signIn(username, password);
      // console.log(userObj);
      setAuthStatus(true);
      setUser(userObj);
      // history.push("/");
      this.setState({
        username: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleLogout = async (event) => {
    event.preventDefault();
    Auth.signOut();
    const { authProps } = this.props;
    const { setUser, setAuthStatus } = authProps;
    setUser(null);
    setAuthStatus(false);
  }

  render() {
    const { username, password } = this.state;
    const { authProps } = this.props;
    const { isLoggedIn, user } = authProps;
    return (
      <div>
        { isLoggedIn && (
          <div>
            <h3>
              { user && `Hello ${user.username}` }
            </h3>
            <button type="button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}
        <form>
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
          <input type="submit" onClick={this.handleSubmit} value="Login" />
        </form>

      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  authProps: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    setAuthStatus: PropTypes.func.isRequired,
  }).isRequired,
};
