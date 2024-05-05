import React from 'react';
import Logo from './Logo';
import '../styles/NavBar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Logo />
      </div>
      <div className="navbar-right">
        {/* Add other navbar items here */}
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
