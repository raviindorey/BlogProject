import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ authProps, handleLogout }) => {
  const { user, isLoggedIn } = authProps;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">BlogProject</a>
        {!isLoggedIn && (
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <form className="d-flex">
            <span className="input-group-text">
              {`Hello ${user && user.username}`}
            </span>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  authProps: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    setAuthStatus: PropTypes.func.isRequired,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
};
