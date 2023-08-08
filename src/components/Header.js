import React from "react";
import "../assets/styles/header.css";
import Logo from '../assets/images/icons/logo.png';
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated)
  return (
    <nav className="navbar navbar-expand-lg bg-white leaffie-navbar shadow">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
              >
                Products
              </a>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li> */}
          </ul>
        </div>
        <button className="btn btn-call">
          Call Us
        </button>
        {isAuthenticated 
        ? <button className="btn btn-signup" onClick={() => navigate('/register')}>
        Sign Up
      </button>
        : <Link className="fa fa-user-circle-o" aria-hidden="true" to="/profile" />
        }
        
      </div>
    </nav>
  );
}
