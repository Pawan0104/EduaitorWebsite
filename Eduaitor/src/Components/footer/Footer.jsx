import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-column footer-brand">
          <img className="logo" src="/eduaitor.png" alt="" />
          <p className="brand-description">
            An all-in-one SaaS platform that simplifies educational institute
            management and enriches the experiences of all stakeholders.
          </p>
          
          {/* Social Icons */}
          <div className="social-icons">
            <a href="#" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>

          {/* App Download Section */}
          <div className="app-download">
            <h3 className="download-title">Download EduAitor apps</h3>
            <div className="download-buttons">
              <a href="#" className="app-button">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play"
                />
              </a>
              <a href="#" className="app-button">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on the App Store"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="footer-column">
          <h3 className="column-title">Solutions</h3>
          <ul className="footer-links">
            <li><NavLink to="/solution">Admission Management</NavLink></li>
            <li><NavLink to="/solution">Fee & Payroll Management</NavLink></li>
            <li><NavLink to="/solution">Faculty Administration</NavLink></li>
            <li><NavLink to="/solution">Student Information & Tracking</NavLink></li>
            <li><NavLink to="/solution">Assessments & Results</NavLink></li>
            {/* <li><NavLink to="/solution">Transport Tracking System</NavLink></li>
            <li><NavLink to="/solution">Inventory Management</NavLink></li>
            <li><NavLink to="/solution">Classroom Management</NavLink></li>
            <li><NavLink to="/solution">Curriculum Planning</NavLink></li>
            <li><NavLink to="/solution">Online Learning</NavLink></li>
            <li><NavLink to="/solution">Real-Time Communication System</NavLink></li>
            <li><NavLink to="/solution">Documents & Data Management System</NavLink></li>
            <li><NavLink to="/solution">Custom Reports & Analytics</NavLink></li>
            <li><NavLink to="/solution">Teacher Training Programs</NavLink></li>
            <li><NavLink to="/solution">Skill Development Courses</NavLink></li>
            <li><NavLink to="/solution">Learning Marketplace</NavLink></li>
            <li><NavLink to="/solution">Online Library</NavLink></li> */}
          </ul>
        </div>

        {/* Pages Section */}
        <div className="footer-column">
          <h3 className="column-title">Pages</h3>
          <ul className="footer-links">
            <li><NavLink to="/">  Home</NavLink></li>
            <li><NavLink to="/aboutus">  About Us</NavLink></li>
            <li><NavLink to="/contactus">  Contact Us</NavLink></li>
            <li><NavLink to="/plans">  Plans</NavLink></li> 
            <li><NavLink to="/solution">Solution</NavLink></li> 
          </ul>
        </div>

        {/* Policies Section */}
        <div className="footer-column">
          <h3 className="column-title">Policies</h3>
          <ul className="footer-links">
            <li><NavLink to="/legal">Terms of Use</NavLink></li>
            <li><NavLink to="/legal">Privacy Policy</NavLink></li>
            <li><NavLink to="/legal">Help & Support</NavLink></li>
            <li><NavLink to="/legal">FAQs</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-top-btn" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
};

export default Footer;