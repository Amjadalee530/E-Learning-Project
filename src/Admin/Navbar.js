import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <Link
              className="navbar-brand"
              style={{ fontWeight: "bold", fontSize: "27px" }}
            >
              {props.name}
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <form className="navbar-form">
              <div className="input-group no-border">
                <input
                  type="text"
                  value=""
                  className="form-control"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  className="btn btn-white btn-round btn-just-icon"
                >
                  <i className="material-icons">search</i>
                  <div className="ripple-container"></div>
                </button>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link">
                  <i className="material-icons">dashboard</i>
                  <p className="d-lg-none d-md-block">Stats</p>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  to="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-icons">notifications</i>
                  <span className="notification">5</span>
                  <p className="d-lg-none d-md-block">Some Actions</p>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item">
                    Mike John responded to your email
                  </Link>
                  <Link className="dropdown-item">You have 5 new tasks</Link>
                  <Link className="dropdown-item">
                    You're now friend with Andrew
                  </Link>
                  <Link className="dropdown-item">Another Notification</Link>
                  <Link className="dropdown-item">Another One</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  id="navbarDropdownProfile"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-icons">person</i>
                  <p className="d-lg-none d-md-block">Account</p>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownProfile"
                >
                  <Link to="profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/changepass" className="dropdown-item">
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    onClick={() => localStorage.clear()}
                    className="dropdown-item"
                    to="/"
                  >
                    Log out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
