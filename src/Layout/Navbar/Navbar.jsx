import { React } from "react";
import "./Navbar.css";
import Logo from "../../assets/images/icons/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ActionCreators } from "../../redux/actions";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );
  const cartCount = useSelector(
    (state) => state.cartReducer.cart.count
  )
  const onLogout = () => {
    localStorage.clear();
    dispatch(
      ActionCreators.getLogout({})
    )
  }
  return (
    <nav className="navbar navbar-expand-lg bg-white leaffie-navbar shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="" />
        </Link>
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
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          </ul>
        </div>
        <button className="btn btn-call">Call Us</button>
        {isAuthenticated ? (
          <div>
            <Link
              className="fa fa-user-circle-o profile"
              aria-hidden="true"
              to="/profile"
            />
            <Link className="fa fa-shopping-cart cart" to="/my-cart" aria-hidden="true"><span class="badge">{cartCount}</span></Link>
            <i class="fa fa-sign-out logout" onClick={() => onLogout()} aria-hidden="true"></i>
          </div>
        ) : (
          <button
            className="btn btn-signup"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}
