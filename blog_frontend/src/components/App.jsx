import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import LoginForm from './auth/LoginForm';
import Register from './auth/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
      isLoggingIn: true, // if an ongoing process.
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setState({ isLoggedIn: true });
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
    this.setState({ isLoggingIn: false });
  }

  setAuthStatus = (authenticated) => {
    this.setState({ isLoggedIn: authenticated });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    const { user, isLoggedIn, isLoggingIn } = this.state;
    const authProps = {
      user,
      isLoggedIn,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };

    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <div className="App">
        {isLoggingIn && (
          <p>Getting the user</p>
        )}
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/login" render={() => <LoginForm history={history} authProps={authProps} />} />
              <Route exact path="/register" render={() => <Register history={history} authProps={authProps} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
