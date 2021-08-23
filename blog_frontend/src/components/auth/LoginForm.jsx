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
      setAuthStatus(true);
      setUser(userObj);
      this.setState({
        username: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="row">
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
            value="Login"
          />
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
