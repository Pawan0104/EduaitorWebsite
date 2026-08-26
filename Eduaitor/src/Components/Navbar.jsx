import React, { useState } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useContactPopup } from "./ContactPopup";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openContactPopup } = useContactPopup();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <nav>
        <Link
          to="/"
          className="nb-brand"
          onClick={closeMenu}
          aria-label="EduAItor home"
        >
          <div className="nb-logo-row">
            <img
              src="/logo1-Photoroom.png"
              alt="EduAItor"
              className="nb-logo-img"
            />
          </div>
          <span className="nb-tagline">Smarter Schools. Stronger Students.</span>
        </Link>

        <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
          <li onClick={closeMenu}>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/ecosystem">Ecosystem</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/solution">Solutions</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/why">Why EduAitor</NavLink>
          </li>
          <li className="nb-ignitex-item" onClick={closeMenu}>
            <NavLink to="/ignitex" className="nb-ignitex">
              <span className="nb-ignitex__cord" aria-hidden="true" />
              <span className="nb-ignitex__board">
                <span className="nb-ignitex__label">IgniteX</span>
              </span>
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/plans">Pricing</NavLink>
          </li>
          <li>
            <button
              type="button"
              className="nb-contact-link"
              onClick={() => {
                closeMenu();
                openContactPopup("navbar-contact");
              }}
            >
              Contact
            </button>
          </li>
        </ul>

        <div className="nav-btn">
          <NavLink to="/login" onClick={closeMenu}>
            <button type="button" className="login-btn">
              Login
            </button>
          </NavLink>
          <button
            type="button"
            className="demo-btn"
            onClick={() => {
              closeMenu();
              openContactPopup("navbar-book-demo");
            }}
          >
            Book a Demo
          </button>
          <button
            type="button"
            className="hamburger-icon"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
