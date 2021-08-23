import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(signUpResponse);
      // eslint-disable-next-line react/prop-types
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

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
    const {
      username, email, password, confirmPassword,
    } = this.state;

    return (
      <div className="row">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
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
            <label htmlFor="username" className="form-label">
              Email
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
            value="Register"
          />
        </form>
      </div>
    );
  }
}

export default Register;

Register.defaultProps = {
  history: PropTypes.object,
};
