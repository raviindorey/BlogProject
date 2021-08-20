import React, { Component } from 'react';
import axios from 'axios';

import LoginForm from './LoginForm';
import BlogPosts from './BlogPosts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedForm: 'login',
      loggedIn: !!localStorage.getItem('token'),
      username: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.handleLogout();
    }
  }

  handleLogin = (e, data) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/token/', data)
      .then((response) => response.data)
      .then((result) => {
        localStorage.setItem('token', result.access);
        this.setState({
          loggedIn: true,
          displayedForm: '',
          username: data.username,
        });
      })
      .catch(() => {
        this.handleLogout();
      });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, displayedForm: 'login', username: '' });
  };

  displayForm = (form) => {
    this.setState({
      displayedForm: form,
    });
  };

  render() {
    let form;
    const { displayedForm, loggedIn, username } = this.state;
    const greetings = `Hello ${username}`;

    switch (displayedForm) {
      case 'login':
        form = <LoginForm handleLogin={this.handleLogin} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <div>
          {loggedIn ? (
            <div>
              <h3>{greetings}</h3>
              <button type="button" onClick={this.handleLogout}>Logout</button>
              <BlogPosts handleLogout={this.handleLogout} loggedIn={loggedIn} />
            </div>
          ) : form}
        </div>
      </div>
    );
  }
}

export default App;
