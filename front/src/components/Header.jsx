import React from "react"
import { Link } from "react-router-dom"
import "./css/header.scss"

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">Nathan's Portfolio</h1>
        <nav className="nav">
          <ul>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/projects" className="nav-link">Projects</Link></li>
            <li><Link to="/contact" className="nav-link">Contact me</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
