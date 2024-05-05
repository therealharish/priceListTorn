import React from 'react';
import '../styles/Logo.css'; // Import the CSS file with styles

function Logo() {
  return (
    <div className="logo-content">
      <a className = "logo-anchor" href="/home/">
        <div className="logo-text">
          <b>Unique The Trader</b>
        </div>
      </a>
    </div>
  );
}

export default Logo;
