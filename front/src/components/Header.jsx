import React from "react"
import "./css/header.scss"

function Header() {
  return (
    <header className="header" data-aos="fade-right" data-aos-duration="1500">
      <div className="header-content">
        <h1 className="title">Nathan's Portfolio</h1>
        <nav className="nav">
          <ul>
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#contact" className="nav-link">Contact me</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
