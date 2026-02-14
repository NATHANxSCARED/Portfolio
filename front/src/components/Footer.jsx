import React from "react";
import "./css/footer.scss";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">
        © {year} Nathan. Tous droits reserves.
      </p>
    </footer>
  );
}

export default Footer;
