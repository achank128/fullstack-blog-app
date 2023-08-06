import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?c=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?c=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?c=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?c=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?c=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?c=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          {currentUser ? (
            <span onClick={logout} className="logout">
              Logout
            </span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
