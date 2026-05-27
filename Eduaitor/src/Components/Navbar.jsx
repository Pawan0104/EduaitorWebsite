import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <nav>
        {/* Logo */}
        <div className="logo">
          {
            <a href="/">
              <img src="/eduaitorlogo.jpeg" alt="" />
            </a>
          }
        </div>

        {/* Nav Links */}
        <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
          <li onClick={closeMenu}>
            <NavLink to="/">Home</NavLink>
          </li>

          <li onClick={closeMenu}>
            <NavLink to="/solution">Solution</NavLink>
          </li>

          {/* <li onClick={closeMenu}>
      <NavLink to="/marketplace">MarketPlace</NavLink>
    </li> */}

          <li onClick={closeMenu}>
            <NavLink to="/plans">Plans</NavLink>
          </li>

          <li onClick={closeMenu}>
            <NavLink to="/aboutus">About Us</NavLink>
          </li>

          <li onClick={closeMenu}>
            <NavLink to="/contactus">Contact us</NavLink>
          </li>
        </ul>

        {/* Right Buttons */}
        <div className="nav-btn">
          <NavLink to="/login">
            <button className="login-btn">Login</button>
          </NavLink>

          <NavLink to="/bookademo">
            <button className="demo-btn">Book a Demo</button>
          </NavLink>

          <button className="hamburger-icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
