import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import LoginForm from './auth/LoginForm';
import Register from './auth/Register';
import Navbar from './Navbar';
import HomePage from './HomePage';

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

  setAuthStatus = (newStatus) => {
    this.setState({ isLoggedIn: newStatus });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  handleLogout = async (event) => {
    event.preventDefault();
    Auth.signOut();
    this.setUser(null);
    this.setAuthStatus(false);
  }

  render() {
    const { user, isLoggedIn, isLoggingIn } = this.state;
    const authProps = {
      user,
      isLoggedIn,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };

    return (
      <div>
        {isLoggingIn && (
          <p>Getting the user</p> // FIXME: useless actually., remove state or fix.
        )}
        <Navbar authProps={authProps} handleLogout={this.handleLogout} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/login" render={() => <LoginForm authProps={authProps} />} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
