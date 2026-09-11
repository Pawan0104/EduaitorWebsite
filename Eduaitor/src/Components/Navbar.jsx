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
              src="/logo1-eduaitor-v2.png"
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
          <li onClick={closeMenu}>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/plans">Pricing</NavLink>
          </li>
          <li className="nb-brain-mobile" onClick={closeMenu}>
            <Link to="/brain-league" className="nb-brain-mobile__link">
              <span aria-hidden="true">🧠</span>
              <span>
                <strong>Brain League</strong>
                <small>100-question brain quiz</small>
              </span>
            </Link>
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
          <li className="nb-ignitex-item" onClick={closeMenu}>
            <NavLink
              to="/ignitex"
              className="nb-ignitex"
              aria-label="IgniteX"
            >
              <span className="nb-ignitex__cord" aria-hidden="true" />
              <span className="nb-ignitex__board">
                <img
                  src="/ignitex/ignitex-nav-logo.png"
                  alt="IgniteX — Build Future-Ready Students"
                  className="nb-ignitex__logo"
                />
              </span>
            </NavLink>
          </li>
        </ul>

        <div className="nav-btn">
          <Link to="/brain-league" onClick={closeMenu} className="nb-brain" aria-label="Brain League quiz">
            <span className="nb-brain__cord" aria-hidden="true" />
            <span className="nb-brain__board">
              <span className="nb-brain__icon" aria-hidden="true">🧠</span>
              <span className="nb-brain__text">
                <strong>Brain League</strong>
                <small>100-Q Brain Quiz</small>
              </span>
            </span>
          </Link>
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
