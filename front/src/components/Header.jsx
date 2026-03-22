import React, { useState } from "react"
import "./css/header.scss"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" data-aos="fade-right" data-aos-duration="1500">
      <div className="header-content">
        <h1 className="title">Nathan's Portfolio</h1>

        {/* Bouton hamburger — visible uniquement sur mobile */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="mobile-navigation"
          className={`nav ${menuOpen ? "nav--open" : ""}`}
        >
          <ul>
            <li><a href="#home"     className="nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact"  className="nav-link" onClick={() => setMenuOpen(false)}>Contact me</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
